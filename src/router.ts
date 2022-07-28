import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "@/views/HomeView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/connect",
    name: "connect",
    component: () =>
      import(/* webpackChunkName: "about" */ "@/views/ConnectView.vue"),
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: () => import("@/views/DashboardView.vue"),
  },
  {
    path: "/checkout",
    name: "state-checkout",
    component: () => import("@/views/StateCheckoutView.vue"),
  },
  {
    path: "/bond",
    name: "bond-details",
    component: () => import("@/views/BondDetailsView.vue"),
  },
  {
    path: "/settings",
    name: "settings",
    component: () => import("@/views/SettingsView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;