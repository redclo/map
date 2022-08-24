import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import home from "./home";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "Home",
        component: home,
        children: [],
    }
];
const router = createRouter({
    history: createWebHashHistory(),
    routes,
});
export default router;
