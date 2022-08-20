import { drager, isPc } from "@/queenjs/framework/utils";
import { defineComponent, onMounted } from "vue";
import { any, string } from "vue-types";

export default defineComponent({
  props: {
    type: string().isRequired,
    data: any(),
  },
  setup(props, { slots, emit }) {
    let dragRef: any = null;

    onMounted(() => {
      if (isPc()) {
        dragRef.el.setAttribute("draggable", "true");
        dragRef.el.addEventListener("dragstart", dragStart);
        dragRef.el.addEventListener("dragend", dragEnd);
      }
    });

    const dragStart = () => {
      const data = JSON.parse(JSON.stringify(props));
      emit("dragStart", data);
      drager.dragStart(data);
    };
    const dragEnd = () => {
      emit("dragEnd");
      drager.dragEnd();
    };

    return () => {
      const content = slots.default?.() || [];
      dragRef = content[0];
      return content;
    };
  },
});
