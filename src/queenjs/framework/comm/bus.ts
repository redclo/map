import { Events } from './event';

class Bus extends Events {
  _hooks: any = {};
  constructor() {
    super();
  }

  method(name: string, fn: Function) {
    if (this._hooks[name] !== undefined) {
      throw new Error("can't override hook: " + name);
    }
    this._hooks[name] = fn;
  }

  methodRemove(name: string) {
    delete this._hooks[name];
  }

  call(name: string, ...args: any[]) {
    if (this._hooks[name]) {
      // var args = Array.prototype.slice.call(arguments, 1);
      try {
        return this._hooks[name].apply(null, args);
      } catch (ex) {
        console.info(
          '%c%s %c(editor.method error)',
          'color: #06f',
          name,
          'color: #f00'
        );
        console.error(ex);
      }
    } else {
      // console.info('%c%s %c - editor.method does not exist yet', 'color: #06f', name, 'color: #f00');
    }
    return null;
  }
}

export { Bus };
