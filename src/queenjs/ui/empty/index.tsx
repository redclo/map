import { defineComponent } from "vue";
import { string } from "vue-types";
import "./index.less";

const IconTypes = ["default", "search"];

export default defineComponent({
  props: {
    description: string().def("暂无内容"),
    type: string<"default" | "search">().def("default"),
  },
  setup(props) {
    return () => {
      const { description, type } = props;
      return (
        <div class="inf_empty">
          {type == "search" ? (
            <img
              class="img img_search"
              src={require("../assets/img_empty_search.png")}
              alt=""
            />
          ) : (
            <img
              class="img img_default"
              src={require("../assets/img_empty.png")}
              alt=""
            />
          )}

          <div class="desc">{description}</div>
        </div>
      );
    };
  },
});
