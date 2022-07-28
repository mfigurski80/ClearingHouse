<template>
  <NavBar>
    <router-view id="view" />
  </NavBar>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import NavBar from "@/components/NavBar.vue";

export default defineComponent({
  components: { NavBar },
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
  &:before {
    content: "";
    pointer-events: none;
    background: url(@/assets/grain-texture-2.png) left top;
    background-size: cover;
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    opacity: 0.05;
    z-index: 0;
  }
}

#view {
  overflow: hidden;
  flex-grow: 1;
  position: relative;
  z-index: 1;
}
</style>
