import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import home from "./main";
import Editor from "./home";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "Home",
        component: home,
        children: [],
    },
    {
        path: "/editor",
        name: "editor",
        component: Editor,
        children: [],
    }
];
const router = createRouter({
    history: createWebHashHistory(),
    routes,
});
export default router;
