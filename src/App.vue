<template>
  <NavBar>
    <div id="view">
      <router-view />
    </div>
  </NavBar>
</template>

<script lang="ts" setup>
import NavBar from "@/components/NavBar.vue";
</script>

<style lang="scss">
:root {
  background: var(--color-background);
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--color-text);
  &:before {
    content: "";
    pointer-events: none;
    background: url(@/assets/grain-texture-2.png) left top;
    background-size: repeat;
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100%;
    opacity: 0.04;
    z-index: -1;
  }
}
#view {
  overflow: hidden;
  flex-grow: 1;
}
</style>
