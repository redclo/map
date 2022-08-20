import { drager } from '@/queenjs/framework/utils';
import { defineComponent, onBeforeUnmount, onMounted, ref } from 'vue';
import { any, oneOfType, string } from 'vue-types';
import "./index.less";

export default defineComponent({
  props: {
    name: string().isRequired,
    type: oneOfType([String, Array]).isRequired,
    target: any()
  },

  setup(props, { attrs, slots }) {
    const dropRef = ref();

    onMounted(() => {
      drager.regDrop(dropRef.value, props.name, props.type, props.target);
    });
    onBeforeUnmount(() => {
      drager.unRegDrop(dropRef.value);
    });

    return () => (
      <div class="inf-drop" ref={dropRef} {...attrs}>
        {slots.default?.()}
      </div>
    );
  },
});
