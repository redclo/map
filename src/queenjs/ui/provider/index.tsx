import { ConfigProvider } from "ant-design-vue";
import { defineComponent } from "vue";
import { ModalProvider } from "../modal";
import { LoadingProvider } from "../loading";

export default defineComponent((props, { slots }) => () => (
  <ConfigProvider>
    {slots.default?.()}
    <ModalProvider />
    <LoadingProvider />
  </ConfigProvider>
));
