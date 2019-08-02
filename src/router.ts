import Vue from "vue";
import Router from "vue-router";
import Login from "@/views/Login/Login";
import Home from "@/views/Home/Home";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    { path: "/", name: "home", component: Home },
    // { path: "/about", name: "about", component: () => import(/* webpackChunkName: "about" */ "./views/About.vue") }
  ]
});

// router.beforeEach((to, from, next) => {
// });

export default router;
