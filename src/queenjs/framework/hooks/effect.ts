import { onUnmounted } from "vue";
import { moduleEffect } from "../create/moduleEffect";

export function useModuleEffect() {
  const effects: any[] = [];
  onUnmounted(() => {
    effects.forEach((e) => e.stop());
  });
  return ((observer: any) => {
    const effect = moduleEffect(observer);
    effects.push(effect);
    return effect;
  }) as typeof moduleEffect;
}
