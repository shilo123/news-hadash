import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import categoryView from "@/views/categoryView.vue";
import favoriteView from "@/views/favoriteView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/category/:name",
    name: "category",
    component: categoryView,
  },
  {
    path: "/favorite/:id",
    name: "favorite",
    component: favoriteView,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
