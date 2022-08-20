import { defineComponent } from "vue";
import { string } from "vue-types";
import './index.less';

export default defineComponent({
  props: {
      width: string().def('1px'),
      height: string().def('100%'),
  },
  setup(props) {
    return () => <div class="ant-splitline" style={{
      '--split-width': props.width,
      '--split-height': props.height,
    } as any}></div>;
  },
});