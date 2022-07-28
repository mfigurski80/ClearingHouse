<template>
  <NavbarLayout>
    <template v-slot:navigation>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </template>
    <router-view id="view" />
  </NavbarLayout>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import NavbarLayout from "@/layouts/NavbarLayout.vue";

export default defineComponent({
  components: { NavbarLayout },
  data: () => ({
    visibleLeft: true,
  }),
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--color-text);
  background: var(--color-background);
}

h1 {
  font-size: 80px;
  color: var(--color-primary);
  margin-top: 12px;
  margin-bottom: 10px;
}
h2 {
  color: var(--color-primary);
}
a {
  font-weight: bold;
  color: inherit;
  &.router-link-exact-active {
    color: var(--color-primary);
  }
}
#view {
  flex-grow: 1;
  overflow: auto;
}
</style>
