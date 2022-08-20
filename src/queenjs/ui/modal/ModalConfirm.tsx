import { defineComponent } from "vue";
import { any, string } from "vue-types";
import Modal from ".";
import { Button } from "..";

export default defineComponent({
  props: {
    type: string().def("default"),
    content: any().isRequired,
    okText: string().def("确定"),
    refuseText: string(),
  },
  setup(props) {
    const modal = Modal.use();

    return () => (
      <div class="ant-modal-confirm">
        <div class="confirm-content">{props.content}</div>
        <div class="confirm-btns">
          <Button onClick={modal.cancel}>取消</Button>

          {props.refuseText && (
            <>
              <div class="btns-space"></div>
              <Button onClick={() => modal.submit(false)}>
                {props.refuseText}
              </Button>
            </>
          )}
          <Button
            type="primary"
            onClick={() => modal.submit(true)}
            danger={props.type === "danger"}
          >
            {props.okText}
          </Button>
        </div>
      </div>
    );
  },
});