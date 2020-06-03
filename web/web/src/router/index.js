import Vue from "vue";
import VueRouter from "vue-router";
const index = () =>
  import(/* webpackChunkName: "index" */ "@/views/index/index.view");
const about = () =>
  import(/* webpackChunkName: "about" */ "@views/about/about.view");
const my = () => import(/* webpackChunkName: "my" */ "@views/my/my.view");

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/index",
  },
  {
    path: "/index",
    name: "index",
    component: index,
  },
  {
    path: "/about",
    name: "about",
    component: about,
  },
  {
    path: "/my",
    name: "my",
    component: my,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
