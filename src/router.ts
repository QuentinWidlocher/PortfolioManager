import Vue from "vue";
import Router from "vue-router";
import Login from "@/views/Login/Login";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    { path: "/", name: "login", component: Login },
    // { path: "/about", name: "about", component: () => import(/* webpackChunkName: "about" */ "./views/About.vue") }
  ]
});

router.beforeEach((to, from, next) => {
});

export default router;
