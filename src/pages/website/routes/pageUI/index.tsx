import { IconWait } from "@/queenjs/icons";
import { Input } from "ant-design-vue";
import {
  Button,
  Form,
  Image,
  List,
  Loadmore,
  Modal,
  Splitline,
} from "@/queenjs/ui";
import { defineComponent } from "vue";

export default defineComponent(() => {
  function showModal() {
    Modal.form({
      title: "danger",
      formData: {},
      content: (
        <>
          <Form.Item path="name" child={() => <Input />} />
        </>
      ),
    });
  }

  return () => (
    <div class="page">
      <Button type="primary" onClick={showModal}>
        123
      </Button>
      <Splitline height="20px" width="1px" />
      <Image src="xxx" />
      <List data={["xxx", "ccc", "bbb"]}>
        {{
          item(data: any) {
            return <div style="font-size: 14px;">{data}</div>;
          },
          loadmore(props: any) {
            return <Loadmore {...props} />;
          },
        }}
      </List>
      <IconWait class="xxxx" />
    </div>
  );
});

const ModalContent = defineComponent(() => {
  const modal = Modal.use();
  return () => (
    <div style="width: 300px; height: 300px;">
      <Button onClick={modal.close}>关闭</Button>
    </div>
  );
});
