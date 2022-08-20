/**
 * <FormCancel group="default">取消/关闭</FormSubmit>
 * <FormSubmit group="default">上传/提交/确定</FormSubmit>
 * <Form group="default" data={{name:"xx"}} onChange={(path, oldVal, newVal)={}} onSubmit={()=>{}} onCancel={()=>{
 *
 * }}>
 */
import _ from "lodash";
import { defineComponent, inject, provide, reactive } from "vue";
import { func, object, string } from "vue-types";
import "./index.less";
import Item from "./Item";

const Submit = defineComponent({
  setup(props, { slots }) {
    const formCtx = inject("formContext") as any;
    console.log("formContext", formCtx);
    return () => (
      <div
        onClick={async () => {
          const valid = await formCtx.validata();
          if (valid.length != 0) return;
          formCtx.onSubmit && formCtx.onSubmit(formCtx.state);
        }}
      >
        {slots.default?.()}
      </div>
    );
  },
});

const Cancel = defineComponent({
  setup(props, { slots }) {
    const formCtx = inject("formContext") as any;
    return () => (
      <div
        onClick={() => {
          formCtx.onCancel && formCtx.onCancel();
        }}
      >
        {slots.default?.()}
      </div>
    );
  },
});

const Form = defineComponent({
  Item,
  Submit,
  Cancel,
  props: {
    group: string().def("default"),
    data: object<any>(),
    onChange:
      func<
        (path: string, oldVal: string, newVal: string, values: any) => void
      >(),
    onSubmit: func<(values: any) => void>(),
    onCancel: func<() => void>(),
    prefix: string(),
  },
  setup(props, { slots }) {
    const ctx = {
      group: props.group,
      state: reactive(props.data),
      items: [],
      onChange: props.onChange,
      onSubmit: props.onSubmit,
      onCancel: props.onCancel,
      validata: async () => {
        const valid: any[] = [];
        ctx.items.map(async (e: any, i) => {
          e.validateFlag = false;
          const v = _.get(ctx.state, e.path);
          if (typeof e.error == "function") {
            const ret = await e.error(ctx.state, v, true);
            if (ret) {
              e.errorMsg = ret;
              valid.push(ret);
            } else {
              e.errorMsg = "";
            }
          } else {
            if (e.required && !v) {
              e.errorMsg = e.error;
              valid.push(e.error);
            } else {
              e.errorMsg = "";
            }
          }
        });
        return valid;
      },
      prefix: props.prefix,
    };

    provide("formContext", ctx);

    return () => <>{slots.default?.()}</>;
  },
});

export default Form as typeof Form & {
  readonly Item: typeof Item;
  readonly Submit: typeof Submit;
  readonly Cancel: typeof Cancel;
};
