import { css } from "@linaria/core";
import { PageListController } from "@/queenjs/framework/utils";
import { defineComponent } from "vue";
import { useCtx } from "../../context";

export default defineComponent({
  setup() {
    const ctx = useCtx();
    const { user, websiteUI } = ctx;
    const list = new PageListController(ctx);
    return () => (
      <div class={rootStyle}>
        首页{user.state.userInfo.username}
        <button onClick={user.actions.create}>getUserInfo</button>
        <button onClick={() => websiteUI.uploadImage()}>上传图片</button>
      </div>
    );
  },
});

const rootStyle = css`
  padding: 30px;
  background-color: red;
`;
