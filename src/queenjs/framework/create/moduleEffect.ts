import { clone } from "lodash";
import { ICtx } from "queenjs/framework";
import { watch, WatchStopHandle } from "vue";

export function createModuleEffect(
  useEffect: (ctx: ICtx, effect: typeof moduleEffect) => void
): Function {
  return (ctx: any) => {
    useEffect(ctx, moduleEffect);
  };
}

export function moduleEffect<T>(observer: () => T) {
  type Item = T extends Array<infer R> ? R : T;
  type ItemObserver = (item: Item) => any;
  type ItemHandler = (item: Item, oldVal: any) => void;

  const watchs: [
    ItemObserver,
    ItemHandler,
    Map<T, WatchStopHandle> | WatchStopHandle | null
  ][] = [];

  let listHandlers: {
    add?: ItemHandler;
    remove?: ItemHandler;
    stop?: Function;
  } = {};

  let pauseStatus = false;

  const control = {
    list(handlers: Omit<typeof listHandlers, "stop">) {
      if (!(observer() instanceof Array)) {
        console.error("observer is not an array");
      }
      if (handlers) listHandlers = handlers;
      return this as Pick<typeof control, "item" | "run">;
    },
    item(itemObserver: ItemObserver, handler: ItemHandler) {
      watchs.push([itemObserver, handler, null]);
      return this as Pick<typeof control, "item" | "run">;
    },
    run() {
      this.stop();
      pauseStatus = false;
      if (observer() instanceof Array) {
        if (!watchs.length) watchs.push([() => null, () => {}, null]);
        listHandlers.stop = watchList(observer, listHandlers, watchs);
      } else {
        watchObject(observer, watchs);
      }
      return this as Pick<typeof control, "run" | "stop" | "pause" | "play">;
    },
    stop() {
      for (const [, , watchStop] of watchs) {
        if (watchStop instanceof Function) {
          watchStop();
        } else if (watchStop instanceof Map) {
          for (const stop of watchStop.values()) {
            stop();
          }
        }
      }
      listHandlers.stop?.();
      return this as Pick<typeof control, "run">;
    },
    pause() {
      pauseStatus = true;
    },
    async play() {
      pauseStatus = await Promise.resolve(false);
    },
  };

  function watchList(list: any, listHandlers: any, watchs: any[]) {
    // list每一项item对象改变
    const listObserver = [() => [...list()]];
    // 初始化每个item的缓存Map
    watchs.forEach((w) => (w[2] = new Map()));
    watchItemHandler();
    return watch(listObserver, () => {
      if (pauseStatus) return;
      const updateMap: Map<any, any> = clone(watchs[0][2]);
      watchItemHandler(updateMap);
      for (const [item, stop] of updateMap.entries()) {
        if (stop) {
          watchs.forEach(([, , itemMap]) => {
            itemMap.get(item)?.();
            itemMap.delete(item);
          });
        }
        listHandlers[stop ? "remove" : "add"]?.(item);
      }
    });

    function watchItemHandler(updateMap?: Map<any, any>) {
      list().forEach((item: any) => {
        watchs.forEach(([observer, handler, itemMap], i) => {
          if (i === 0 && updateMap) {
            if (!itemMap.has(item)) {
              updateMap.set(item, null);
            } else {
              updateMap.delete(item);
            }
          }
          if (!itemMap.has(item)) {
            itemMap.set(
              item,
              watch(
                () => observer(item),
                (newVal, oldVal) => {
                  if (pauseStatus) return;
                  handler(item, oldVal);
                }
              )
            );
          }
        });
      });
    }
  }

  function watchObject(observer: any, watchs: any[]) {
    watchs.forEach((watchItem) => {
      const [itemObserver, itemHandler] = watchItem;
      watchItem[2] = watch(
        () => itemObserver(observer()),
        (newVal, oldVal) => {
          if (pauseStatus) return;
          itemHandler(observer(), oldVal);
        }
      );
    });
  }

  return control as Pick<
    typeof control,
    T extends any[] ? "list" | "item" : "item"
  >;
}

function proxyModuleEffect(cb: Function) {
  return (observer: any) => {
    const effect = moduleEffect(observer);
    cb(effect);
    return effect;
  };
}
