import Vue from "vue";
import VueRouter from "vue-router";
const index = () =>
  import(/* webpackChunkName: "index" */ "@/views/index/index.view");
const about = () =>
  import(/* webpackChunkName: "about" */ "@views/about/about.view");
const my = () => import(/* webpackChunkName: "my" */ "@views/my/my.view");
const UserInfo = () =>
  import(/* webpackChunkName: "UserInfo" */ "@views/userInfo/UserInfo.view");
const EditArticle = () =>
  import(/* webpackChunkName: "Article" */ "@views/article/EditArticle.view");
const Article = () =>
  import(/* webpackChunkName: "Article" */ "@views/article/Article.view");

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/index"
  },
  {
    path: "/index",
    name: "index",
    component: index
  },
  {
    path: "/about",
    nae: "about",
    component: about
  },
  {
    path: "/my",
    name: "my",
    component: my
  },
  {
    path: "/user_info",
    name: "UserInfo",
    component: UserInfo
  },
  {
    path: "/article/edit",
    name: "EditArticle",
    component: EditArticle
  },
  {
    path: "/article/:id",
    name: "Article",
    component: Article
  }
];

const router = new VueRouter({
  routes
});

export default router;
