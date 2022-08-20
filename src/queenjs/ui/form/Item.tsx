/**
 * form item
 *
 * <FormItem group="defalut" path="material.scale.0" value={(formData, value)=>data.material.scale.0} required={true} error={"x缩放不能为空" (formData, value)=>"x缩放不能为负"}>
 *  {{
 *     default: (props)=><input />
 *  }}'
 * </FormItem>
 *
 * <FormSubmit group="default">上传/提交/确定</FormSubmit>
 * <FormCancel group="default">取消/关闭</FormSubmit>
 * <Form group="default" data={{name:"xx"}} onChange={(path, oldVal, newVal)={}} onSubmit={()=>{}} onCancel={()=>{
 *
 * }}>
 *
 */

import _ from "lodash";
import {
  defineComponent,
  inject,
  onMounted,
  onUnmounted,
  reactive,
  watch
} from "vue";
import { bool, func, oneOfType, string } from "vue-types";

export default defineComponent({
  props: {
    group: string().def("default"),
    path: string().isRequired,
    dep: string(),
    label: string(),
    value: func<(formdata: any, fieldPathValue: any) => any>(),
    child:
      func<
        (
          value: any,
          emitChange: (value: any) => void,
          error: string,
          formData: any,
          focusChange: (value: boolean) => void | undefined
        ) => any
      >().isRequired,
    required: bool().def(true),
    error: oneOfType([
      string(),
      func<(formData: any, value: any, submitFlag: boolean) => string>(),
    ]),
    border: bool().def(true),
    labelInline: bool().def(true),
  },

  setup(props, { slots }) {
    const itemCtx = reactive({
      group: props.group,
      path: props.path,
      required: props.required,
      value: props.value,
      error: props.error,
      errorMsg: "",
    });
    const formCtx = inject("formContext") as any;
    formCtx.items.push(itemCtx);
    const v = _.get(formCtx.state, itemCtx.path);
    const state = reactive({
      data: v,
      focusFlag: false,
      dirty: 1,
    });
    if (itemCtx.value) {
      state.data = itemCtx.value(formCtx.state, v);
    }
    const itemValidate = async (v: any) => {
      if (typeof itemCtx.error == "function") {
        const ret = await itemCtx.error(formCtx.state, v, false);

        if (ret) {
          itemCtx.errorMsg = ret;
        } else {
          itemCtx.errorMsg = "";
        }
      } else {
        if (itemCtx.required && !v) {
          itemCtx.errorMsg = itemCtx.error as string;
        } else {
          itemCtx.errorMsg = "";
        }
      }
    };

    onUnmounted(() => {
      const index = formCtx.items.indexOf(itemCtx);
      if (index > -1) {
        formCtx.items.splice(index, 1);
      }
    });

    onMounted(() => {
      console.log("on mounted", itemCtx.path);
    });

    if (props.dep) {
      watch(
        () => {
          const deps = props.dep?.split(",") || []
          return deps.map((item) => _.get(formCtx.state, item));
        },
        () => {
          state.dirty += 1;
        }
      );
    }

    watch(
      () => {
        return _.get(formCtx.state, itemCtx.path);
      },
      () => {
        state.data = _.get(formCtx.state, itemCtx.path);
      }
    );

    return () => {
      return (
        <div
          class={[
            "form_item",
            state.focusFlag ? "focus" : null,
            itemCtx.errorMsg != "" ? "error" : null,
          ]}
        >
          <div
            class={[
              "form_item_view",
              props.border ? "border" : null,
              props.labelInline ? null : "warp",
            ]}
          >
            {props.label && <div class="form_item_label">{props.label}</div>}
            <div class="form_item_child">
              {state.dirty &&
                props.child(
                  state.data,
                  (v: any) => {
                    let newData = v;
                    itemValidate(v);
                    if (itemCtx.value) {
                      newData = itemCtx.value(formCtx.state, v);
                    }
                    _.set(formCtx.state, itemCtx.path, newData);
                    formCtx.onChange &&
                      formCtx.onChange(
                        itemCtx.path,
                        newData,
                        state.data,
                        formCtx.state
                      );
                    state.data = newData;
                  },
                  "",
                  formCtx.state,
                  (flag: boolean) => {
                    state.focusFlag = flag;
                  }
                )}
            </div>
          </div>
          {itemCtx.errorMsg && <div class="error_Msg">{itemCtx.errorMsg}</div>}
        </div>
      );
    };
  },
});
