import { defineComponent, onMounted, ref } from "vue";
import { object } from "vue-types";
import _Swiper, { EffectFade, Autoplay } from "swiper";
import "swiper/swiper.less";
_Swiper.use([EffectFade, Autoplay]);
const Slider = defineComponent({
  emits: ["click"],
  setup(props, { slots, emit }) {
    return () => (
      <div class="swiper-slide" onClick={() => emit("click")}>
        {slots.default?.()}
      </div>
    );
  },
});

const mySwiper = defineComponent({
  Slider: Slider,
  props: {
    options: object().def({}),
  },
  emits: ["init"],
  setup(props, { emit, slots }) {
    const swiperRef = ref();
    onMounted(() => {
      const s = new _Swiper(swiperRef.value, props.options);
      emit("init", s);
    });

    return () => (
      <div ref={swiperRef} class="swiper">
        <div class="swiper-wrapper">{slots.default?.()}</div>
      </div>
    );
  },
});

export default mySwiper as typeof mySwiper & {
  readonly Slider: typeof Slider;
};
