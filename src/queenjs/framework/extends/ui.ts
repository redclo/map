import { ModuleRoot } from "./module";

export class UIRoot extends ModuleRoot {
  showLoading(tip: string) {
    this.ctx.bus.call("ui:showLoading", tip);
  }

  hideLoading() {
    this.ctx.bus.call("ui:hideLoading");
  }
  messageSuccess(msg: string) {
    this.ctx.bus.call("ui:message:success", msg);
  }
  messageInfo(msg: string) {
    this.ctx.bus.call("ui:message:info", msg);
  }

  messageWarn(msg: string) {
    this.ctx.bus.call("ui:message:warn", msg);
    return msg;
  }

  messageError(msg: string) {
    this.ctx.bus.call("ui:message:error", msg);
    return msg;
  }

  showDialogInput(params: {
    defaultValue?: string;
    placeholder?: string;
    title?: string;
    onValid?: (value: string) => Promise<boolean>;
    maxLength?: number;
  }) {
    return this.ctx.bus.call("ui:dialog:input", params);
  }

  showDialogConfirm(params: {
    type?: "default" | "danger";
    title?: string;
    content: string;
    okText?: string;
    refuseText?: string;
  }) {
    return this.ctx.bus.call("ui:dialog:confirm", params);
  }
}
