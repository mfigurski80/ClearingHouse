import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import mixpanel from "mixpanel-browser";

import TrackEvent from "@/types/trackEvent";
import HomeView from "@/views/HomeView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: () => import("@/views/DashboardView.vue"),
  },
  {
    path: "/mint",
    name: "mint",
    component: () => import("@/views/MintView.vue"),
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
  {
    path: "/not-implemented",
    name: "not-implemented",
    component: () => import("@/views/UnimplementedView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.afterEach((to, from, failture) => {
  mixpanel.track(TrackEvent.NAVIGATE, {
    to: to.name,
    from: from.name,
    path: to.fullPath,
  });
  if (failture) {
    console.error("Router error:", failture);
    mixpanel.track(TrackEvent.NAVIGATION_ERROR, { error: failture });
  }
});

export default router;
