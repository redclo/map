import "./inficon.less";

export function createIcon(Svg: any) {
  return (props: any) => {
    let className = "inficon";
    if (props.class) {
      className += " " + props.class;
      delete props.class;
    }
    return (
      <span class={className} {...props}>
        {Svg}
      </span>
    );
  };
}
