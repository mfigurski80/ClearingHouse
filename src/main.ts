import { createApp } from "vue";
import App from "@/App.vue";
import router from "@/router";
import VueCookies from "vue-cookies";

import PrimeVue from "primevue/config";
import "primevue/resources/themes/lara-dark-indigo/theme.css";
import "@/theme-reset.css";
import "@/styles.css";
import "primeicons/primeicons.css";

createApp(App).use(router).use(VueCookies).use(PrimeVue).mount("#app");
