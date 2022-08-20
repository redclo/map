import { Tooltip as AntdTooltip } from "ant-design-vue";
import { defineComponent } from "vue";
import { any, string } from "vue-types";
import "./index.less";

type PlacementTypes =
  | "top"
  | "left"
  | "right"
  | "bottom"
  | "topLeft"
  | "topRight"
  | "bottomLeft"
  | "bottomRight"
  | "leftTop"
  | "leftBottom"
  | "rightTop"
  | "rightBottom";

export default defineComponent({
  props: {
    title: any().isRequired,
    placement: string<PlacementTypes>().def("bottom"),
    overlayClassName: string().def(""),
    trigger: string<"hover" | "focus" | "click" | "contextmenu">().def("hover"),
    visible: any(),
    onVisibleChange: any(),
  },
  setup(props, { slots }) {
    return () => {
      const { visible, ...otherProps } = props;
      return (
        <AntdTooltip
          {...(visible !== undefined ? { visible } : null)}
          {...otherProps}
        >
          {slots.default?.()}
        </AntdTooltip>
      );
    };
  },
});

export function tooltipHoc(Component: any) {
  return defineComponent((props, { attrs }) => {
    return () => {
      const { tooltip, ...otherProps }: any = attrs;
      const tooltipProps: any = tooltip?.title ? tooltip : { title: tooltip };
      return (
        <AntdTooltip placement="bottom" {...tooltipProps}>
          <Component {...otherProps} />
        </AntdTooltip>
      );
    };
  });
}
