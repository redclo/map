import { Button } from "ant-design-vue";
import { defineComponent } from "vue";
import { any, string } from "vue-types";
import Form from "../form";

export default defineComponent({
  props: {
    title: string(),
    formData: any(),
  },
  emits: ["submit", "cancel"],

  setup(props, { slots, emit }) {
    return () => (
      <div class="ant-modal-form">
        <div class="modal-form-header">{props.title}</div>
        <div class="modal-form-content">
          <Form
            onCancel={() => {
              console.log("onCancel");
              emit("cancel");
            }}
            onChange={(path: string, oldval: any, newVal: any, values: any) => {
              console.log(path, oldval, newVal, values);
            }}
            onSubmit={(values: any) => {
              console.log("onSubmit", values);
              emit("submit", values);
            }}
            data={props.formData}
          >
            <>
              {slots.default?.()}

              <div class="modal-form-footer">
                <Form.Cancel>
                  <Button shape="round" style={{ minWidth: "0.6rem" }}>
                    取消
                  </Button>
                </Form.Cancel>
                <Form.Submit>
                  <Button
                    type="primary"
                    shape="round"
                    style={{ width: ".88rem", marginLeft: ".1rem" }}
                  >
                    确定
                  </Button>
                </Form.Submit>
              </div>
            </>
          </Form>
        </div>
      </div>
    );
  },
});
