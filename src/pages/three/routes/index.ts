import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import book from "./book";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    // redirect: "/viewer",
    component: book,
    children:[],
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
