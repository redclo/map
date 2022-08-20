import { defineComponent } from "vue";
import { number, string } from "vue-types";
import "./index.less";

const AnimateView = defineComponent({
  props: {
    animate: string().isRequired,
    delay: number(),
  },
  setup(props, { slots }) {
    return () => {
      const { delay, animate } = props;
      return (
        <div
          class="scroll__animate"
          data-animate={animate}
          style={
            delay
              ? {
                  animationDelay: delay + "s",
                  WebkitAnimationDelay: delay + "s",
                }
              : undefined
          }
        >
          {slots.default?.()}
        </div>
      );
    };
  },
});

const animateStart = function () {
  let throttleTimer = false;
  const scrollElements = document.querySelectorAll(".scroll__animate");
  const elementInView = (el: any, percentageScroll = 100) => {
    const elementTop = el.getBoundingClientRect().top;
    return (
      elementTop <=
      (window.innerHeight || document.documentElement.clientHeight) *
        (percentageScroll / 100)
    );
  };
  const displayScrollElement = (el: any) => {
    if (el.classList.contains("animate__animated")) {
      return false;
    }
    el.classList.add("animate__animated");
    const animate_name = el.getAttribute("data-animate");
    el.classList.add(animate_name);
  };

  const hideScrollElement = (el: any) => {
    el.classList.remove("animate__animated");
  };

  const handleScrollAnimation = () => {
    scrollElements.forEach((el: any) => {
      if (elementInView(el, 90)) {
        displayScrollElement(el);
      }
    });
  };

  const throttle = (callback: any, time: number) => {
    return () => {
      if (throttleTimer) return;
      throttleTimer = true;
      setTimeout(() => {
        callback();
        throttleTimer = false;
      }, time);
    };
  };

  const throttleAnimation = throttle(handleScrollAnimation, 250);
  handleScrollAnimation();
  window.addEventListener("scroll", throttleAnimation);
  return {
    destory() {
      window.removeEventListener("scroll", throttleAnimation);
    },
  };
};

export default {
  View: AnimateView,
  start: animateStart,
};
