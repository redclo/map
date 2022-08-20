import { Spin } from "ant-design-vue";
import { defineComponent, ref, watchEffect } from "vue";
import { any, bool } from "vue-types";
import { useVisibleToggle } from "../../use/useVisibleToggle";

export default defineComponent({
  props: {
    container: any<HTMLElement>(),
    loading: bool(),
    canLoad: bool(),
  },
  emits: ["change"],
  setup(props, { emit }) {
    const rootRef = ref();
    const visible = ref(true);

    useVisibleToggle({
      target: rootRef,
      container: props.container,
      onChange(isVisible) {
        visible.value = isVisible;
      },
    });

    watchEffect(() => {
      const { loading, canLoad } = props;
      if (visible.value && canLoad && !loading) {
        emit("change");
      }
    });

    return () => (
      <div style="text-align: center;" ref={rootRef}>
        {props.loading ? (
          <Spin />
        ) : (
          <span class="f-12">{props.canLoad ? "加载更多" : "没有更多"}</span>
        )}
      </div>
    );
  },
});
