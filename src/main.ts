import { createApp } from "vue";
import App from "@/App.vue";
import router from "@/router";
import VueCookies from "vue-cookies";
import { VueQueryPlugin } from "vue-query";

import PrimeVue from "primevue/config";
import "primevue/resources/themes/lara-dark-indigo/theme.css";
import "primeicons/primeicons.css";

import "@/theme-reset.css";
import "@/styles.css";

createApp(App)
  .use(router)
  .use(VueQueryPlugin)
  .use(VueCookies)
  .use(PrimeVue)
  .mount("#app");

import mixpanel from "mixpanel-browser";

mixpanel.init("474d64726279eb58b293df0cd59b67a8", {
  debug: false,
  ignore_dnt: true,
});
mixpanel.track("Setup");
