import { defineComponent } from "vue";
import { Provider } from "@/queenjs/ui";
import { websiteCtx } from "./context";
import { CtxContainer } from "@/queenjs/ui"

export default defineComponent({
    setup() {
        return () => (<CtxContainer ctx={websiteCtx}>
            <Provider>
                <router-view />
            </Provider>
        </CtxContainer>)
    },
});
