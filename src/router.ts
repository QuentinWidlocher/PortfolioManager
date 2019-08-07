import Vue from "vue";
import Router from "vue-router";
import Login from "@/views/Login/Login";
import Home from "@/views/Home/Home";
import { firebaseService } from './services/firebase';

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    { path: '/', redirect: { name: 'home' } },
    { path: "/login", name: "login", component: Login },
    { path: "/home", name: "home", component: () => import(/* webpackChunkName: "home" */ "./views/Home/Home.vue") },
    // { path: "/about", name: "about", component: () => import(/* webpackChunkName: "about" */ "./views/About.vue") }
  ]
});

router.beforeEach((to, from, next) => {  
  
  firebaseService.getCurrentUser().then((user: any) => {

    if (to.name !== 'login' && !user) {
      next({name: 'login'});
    } else if (to.name === 'login' && user) {
      next({name: 'home'});
    }
  
    next();

  });

});

export default router;
