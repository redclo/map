import { Spin } from "ant-design-vue";
import { defineComponent, reactive } from "vue";
import "./index.less";

const state = reactive({
  visible: false,
  tip: "",
});

export default {
  show(tip: string) {
    state.tip = tip;
    state.visible = true;
  },
  hidden() {
    state.visible = false;
    state.tip = "";
  },
};

export const LoadingProvider = defineComponent(() => {
  return () =>
    state.visible ? (
      <div class="ant-loading">
        <div class="ant-loading-box">
          <Spin />
          <div>{state.tip || "加载中"}</div>
        </div>
      </div>
    ) : null;
});
