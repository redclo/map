import { defineComponent } from "vue";
import { array, bool, number, object, string } from "vue-types";
import "./index.less";

export default defineComponent({
  props: {
    data: array<any>().isRequired,
    columns: number().def(1),
    gap: string(),
    loading: bool(),
    query: object<{ [name: string]: any }>(),
    extendData: object<any>(),
    actions: object(),
  },
  setup(props, { slots }) {
    return () => {
      const { data, gap, columns, loading, query, actions } = props;
      const showEmptyState = !loading && data.length === 0;
      return (
        <div class="ant-list">
          <div
            class="ant-list-wrapper"
            style={{
              gridTemplateColumns: `repeat(${columns}, 1fr)`,
              gridGap: gap,
            }}
          >
            {slots.beforeChild?.()}
            {data.map((d, i) => {
              return slots.item?.(d, i, props.extendData);
            })}
            {slots.afterChild?.()}
          </div>
          {showEmptyState
            ? slots.empty?.()
            : slots.loadmore?.({
                loading,
                canLoad: data.length < query?.total,
                onChange: actions?.loadmore,
              })}
        </div>
      );
    };
  },
});
