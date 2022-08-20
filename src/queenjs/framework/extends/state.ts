import { computed, reactive } from 'vue';

export class StateRoot {
  protected computed<F extends (state: Omit<this, 'reactive'>) => any>(fn: F) {
    return fn as ReturnType<F>;
  }
  reactive = () => {
    const out: any = {};
    for (const name in this) {
      if (name === 'reactive' || name === 'computed') continue;
      const objItem: any = this[name];
      if (objItem instanceof Function) {
        out[name] = computed(() => objItem(state));
      } else {
        out[name] = objItem;
      }
    }
    const state = reactive(out) as Omit<this, 'reactive'>;
    return state;
  };
}
