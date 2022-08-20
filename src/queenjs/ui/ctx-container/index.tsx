import { defineComponent, onMounted, reactive } from "vue";
import { any, func } from "vue-types";
import { createCtxCreator } from "../../framework";
import { Spin } from "ant-design-vue";

export default defineComponent({
    props: {
        ctx: any<ReturnType<typeof createCtxCreator>>().isRequired,
        fail: func<(err:string)=>any>(),
        loading: func<()=>any>(),
    },

    setup(props, { slots }) {
        const state = reactive({
            ready: false,
            error:"",
            loading: true,
        });

        props.ctx.create().then((ctx:any) => {
            state.ready = !!ctx;
            state.error = state.ready ? "" :"上下文创建失败!";
            state.loading = false;
        });

        return () => {  
            if (state.ready) return slots.default?.();

            if (state.loading) {
                if (props.loading ) return props.loading();
                return (<Spin />)
            }

            if ( props.fail ) return props.fail(state.error);

            return (<div>上下文创建失败!</div>)
        }
    },
});