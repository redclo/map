import { onMounted, onUnmounted, Ref } from "vue";

export function useVisibleToggle(options: {
  target: Ref<HTMLElement | undefined>;
  container?: HTMLElement | undefined;
  onChange: (isVisible: boolean) => void;
}) {
  const {target, container, onChange} = options;
  let observer: any;

  onMounted(() => {
    observer = new IntersectionObserver(handleChange, {
      root: container || target.value?.parentElement,
    });
    observer.observe(target.value);
  });

  onUnmounted(() => {
    observer.disconnect();
  });

  function handleChange(entries: any) {
    entries.forEach((entry: any) => {
      onChange(!entry.isVisible && entry.isIntersecting);
    });
  }
}
