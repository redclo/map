import _ from 'lodash';
import { reactive } from 'vue';

export default class Observer<T extends Object> {
  origin: T;
  value: T;
  server: any;
  history: any;
  needSubmit: boolean;
  constructor(options: { target: T; server?: any; withHistory?: boolean }) {
    this.server = options?.server;
    this.needSubmit = !!this.server;

    this.origin = options.target;

    if (options.server || options.withHistory) {
      this.value = reactive(this.createProxy(options.target, (key) => key));
    } else {
      this.value = reactive(options.target) as any;
    }

    if (this.server) {
      this.server.on('op', (ops, local) => {
        if (local) return;
        ops.forEach((op) => {
          console.log('server -> client', op);
          this.writeSync(op);
        });
      });
    }
  }
  createProxy = (target: any, getPath: any) => {
    if (typeof target === 'object' && target !== null) {
      for (const key in target) {
        const proxy = this.createProxy(
          target[key],
          (subKey) =>
            `${getPath(
              target instanceof Array ? target.indexOf(proxy) : key
            )}.${subKey}`
        );
        target[key] = proxy;
      }
      return new Proxy(target as any, {
        get: (target, key, receiver) => {
          if (key == 'isProxy') {
            return true;
          }
          return Reflect.get(target, key, receiver);
        },
        ...(target instanceof Array
          ? this.arrayHandler(getPath)
          : this.objectHandler(getPath)),
      });
    } else {
      return target;
    }
  };

  arrayHandler = (path) => {
    let removeIndex = null;
    let removeOld = null;
    return {
      set: (target, key, value, receiver) => {
        if (key === 'length') {
          removeIndex = null;
          removeOld = null;
        } else if (!removeIndex) {
          if (!value.isProxy) {
            if (key == target.length) {
              this.emit(`insert:${path(key)}`, value);
            } else {
              this.emit(`set:${path(key)}`, value, target[key]);
            }
            value = this.createProxy(
              value,
              (subKey) => `${path(key)}.${subKey}`
            );
          } else {
            removeIndex = key;
            removeOld = target[key];
          }
        }

        return Reflect.set(target, key, value, receiver);
      },
      deleteProperty: (target, key) => {
        if (!removeIndex) {
          removeIndex = key;
          removeOld = target[key];
        }
        this.emit(`remove:${path(removeIndex)}`, null, removeOld);
        return Reflect.deleteProperty(target, key);
      },
    };
  };
  objectHandler = (path) => {
    return {
      set: (target, key, value, receiver) => {
        const actionType = target.hasOwnProperty(key) ? 'set' : 'insert';
        this.emit(`${actionType}:${path(key)}`, value, target[key]);
        return Reflect.set(
          target,
          key,
          this.createProxy(value, (subKey) => `${path(key)}.${subKey}`),
          receiver
        );
      },
      deleteProperty: (target, key) => {
        this.emit(`remove:${path(key)}`, null, target[key]);
        return Reflect.deleteProperty(target, key);
      },
    };
  };
  emit = (path: string, val: any, old?: any) => {
    if (this.server && this.needSubmit) {
      this.submitSync(path, val, old);
    }
  };

  submitSync = (path: string, val: any, old?: any) => {
    console.log('client -> server', path, val, old);
    const [type, p] = path.split(':');
    const isArray = /^\d+$/.test(path.split('.').pop());
    const op: any = { p: p.split('.') };
    if (type === 'set') {
      if (isArray) {
        op.li = val;
        op.ld = old;
      } else {
        op.oi = val;
        if (old !== undefined) {
          op.od = old;
        }
      }
    } else if (type === 'unset') {
      op.od = null;
    } else if (type === 'insert') {
      op.li = val;
    } else if (type === 'remove') {
      op.ld = old;
    }
    this.server.submitOp(op);
  };

  writeSync = (op: any) => {
    this.needSubmit = false;
    const key = op.p.pop();
    const handler = _.get(this.value, op.p);
    if (op.hasOwnProperty('oi')) {
      // set key value
      handler[key] = op.oi;
    } else if (op.hasOwnProperty('ld') && op.hasOwnProperty('li')) {
      // set array value
      handler[key] = op.li;
    } else if (op.hasOwnProperty('ld')) {
      // delete item
      handler.splice(key, 1);
    } else if (op.hasOwnProperty('li')) {
      // add item
      handler.push(op.li);
    } else if (op.hasOwnProperty('od')) {
      // unset key value
      delete handler[key];
    } else {
      console.log('unknown operation', op);
    }
    this.needSubmit = true;
  };
}
