import { defineComponent } from 'vue';
import { number, string } from 'vue-types';
import './index.less';

export default defineComponent({
  props: {
    title: string(),
    ratio: number(),
    bgSrc: string(),
  },
  emits: ['click'],
  setup(props, { slots, emit }) {
    function createStyle() {
      const style: any = {};
      if (props.ratio) {
        style.paddingBottom = `${100 / props.ratio}%`;
      }
      if (props.bgSrc) {
        style.backgroundImage = `url(${props.bgSrc})`;
      }
      return style;
    }

    return () => {
      const children = slots.default?.();
      const { ratio, title } = props;
      return (
        <div
          class="ant-view"
          title={title}
          style={createStyle()}
          onClick={(e) => emit('click', e)}
        >
          {ratio ? <div class="ant-view-wrapper">{children}</div> : children}
        </div>
      );
    };
  },
});
