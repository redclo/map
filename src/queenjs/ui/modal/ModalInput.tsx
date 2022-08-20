import { Input } from "ant-design-vue";
import { defineComponent, ref } from "vue";
import { number, string } from "vue-types";
import Modal from ".";
import { Button } from "..";

export default defineComponent({
  props: {
    title: string().def("请填写"),
    defaultValue: string().def(""),
    placeholder: string().def(""),
    maxLength: number(),
  },
  setup(props) {
    const modal = Modal.use();
    const inputValue = ref(props.defaultValue);
    return () => (
      <div class="ant-modal-input">
        <div class="input-title">{props.title}</div>
        <Input
          maxlength={props.maxLength}
          value={inputValue.value as string}
          placeholder={props.placeholder as string}
          onChange={(e: any) => (inputValue.value = e.target.value)}
        />
        <div class="input-btns">
          <Button onClick={modal.cancel} size="small">
            取消
          </Button>
          <Button
            onClick={() => {
              if (!inputValue.value) return;
              modal.submit(inputValue.value);
            }}
            type="primary"
            size="small"
          >
            确定
          </Button>
        </div>
      </div>
    );
  },
});