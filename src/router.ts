import { createRouter, createWebHistory } from "vue-router";
import Home from "./view/Home.vue";
import Login from "./view/Login.vue";
import ColumnDetail from "./view/ColumnDetail.vue";
import CreatePost from "./view/CreatePost.vue";
import store from "./store";
const routerHistory = createWebHistory();
const router = createRouter({
  history: routerHistory,
  routes: [
    { path: "/", component: Home },
    { path: "/home", component: Home, name: "home" },
    {
      path: "/login",
      component: Login,
      name: "login",
      meta: { redirectAlreadyLogin: true }
    },
    { path: "/column/:id", component: ColumnDetail, name: "column" },
    { path: "/create", component: CreatePost, meta: { requiredLogin: true } }
  ]
});

//  路由守卫
router.beforeEach((to, from, next) => {
  //  ${//to and from are Route Object,next() must be called to resolve the hook}
  if (to.meta.requiredLogin && !store.state.user.isLogin) {
    next({ name: "login" });
  } else if (to.meta.redirectAlreadyLogin && store.state.user.isLogin) {
    next('/');
  } else {
    next();
  }
});
export default router;
