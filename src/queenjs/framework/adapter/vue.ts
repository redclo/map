import { message } from "ant-design-vue";
import { createAdapter } from "@/queenjs/framework";
import { Loading, Modal } from "@/queenjs/ui";

export const vue_adapter = createAdapter((bus) => {
  bus.method("ui:showLoading", function (tip: string) {
    Loading.show(tip);
  });
  bus.method("ui:hideLoading", function () {
    Loading.hidden();
  });
  bus.method("ui:dialog:input", function (params: any) {
    return Modal.input(params);
  });
  bus.method("ui:dialog:confirm", function (params: any) {
    return Modal.confirm(params);
  });
  bus.method("ui:dialog:form", function (params: any) {
    return Modal.form(params);
  });
  bus.method("ui:message:warn", function (msg: string) {
    message.warn(msg);
  });
  bus.method("ui:message:error", function (msg: string) {
    message.error(msg);
  });
  bus.method("ui:message:info", function (msg: string) {
    message.info(msg);
  });
  bus.method("ui:message:success", function (msg: string) {
    message.success(msg);
  });
});
