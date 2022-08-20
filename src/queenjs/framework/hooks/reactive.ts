import { computed, effect, reactive } from "vue";

export function useReactive<T extends { [name: string]: any }>(fn: () => T) {
  const data: any = fn();
  for (const name in data) {
    const val = data[name];
    if (val instanceof Function) {
      data[name] = computed(val);
    }
  }
  return reactive(data) as {
    [name in keyof T]: T[name] extends Function ? ReturnType<T[name]> : T[name];
  };
}

export function useEffect(fn: () => any, tracker: () => void) {
  let timerId: any = undefined;

  const e = effect(() => {
    tracker();
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
      fn();
      timerId = undefined;
    }, 0);
  });

  return function () {
    e.effect.stop();
  };
}

export function useArrayEffect(fn: () => any, array: any[]) {
  const e = useEffect(
    () => {
      fn();
    },
    () => {
      array.length;
    }
  );
  return e;
}

export function useArrayItemEffect(
  fn: (item: any, removed: boolean, added?: boolean) => any,
  array: any[],
  tracker: (item: any) => void
) {
  const n = array.length;
  const sessions: any[] = [];

  //监听单个变化
  function trackItem(item: any, added: boolean = false) {
    const e = useEffect(
      () => {
        fn(item, false, added);
      },
      () => {
        tracker(item);
      }
    );
    sessions.push({ item, unbind: e });
  }

  for (let i = 0; i < n; i++) {
    const item = array[i];
    trackItem(item);
  }

  //监听长度变化
  let preArray = array.slice(0);
  const unbind = useEffect(
    () => {
      let preLen = preArray.length;
      const currArray = array.slice(0);
      while (preLen--) {
        const item = preArray[preLen];
        const index = array.indexOf(item);
        if (index == -1) {
          //已删除
          const ss = sessions.filter((s) => s.item == item);
          if (ss && ss.length > 0) {
            const i = sessions.indexOf(ss[0]);
            sessions.splice(i, 1);
            ss[0].unbind();
            fn(ss[0].item, true);
          }
        } else {
          //没有变化的, 排除出去, 剩余的则是新加的
          currArray.splice(index, 1);
        }
      }
      let curLen = currArray.length;
      while (curLen--) {
        //都是新加的
        trackItem(currArray[curLen], true);
      }
      preArray = array.slice(0);
    },
    () => {
      let n = array.length;
      while (n--) array[n];
    }
  );

  return function () {
    sessions.forEach((item) => {
      item.unbind();
    });
    unbind();
  };
}
