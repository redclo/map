import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import home from "./home";

import pageUI from "./pageUI";
import TestEffect from "./test/TestEffect";
import viewer from "./bess3dviewer";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    redirect: "/viewer",
    component: home,
    children:[],
  },
  {
    path: "/test",
    name: "Test",
    component: TestEffect,
    children:[],
  },
  {
    path: "/ui",
    name: "UI",
    component: pageUI,
    children:[],
  },
  {
    path:"/viewer",
    name: "viewer",
    component: viewer,
    children:[],
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
