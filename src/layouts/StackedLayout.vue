<template>
  <div class="layout">
    <slot></slot>
  </div>
</template>

<style lang="scss" component>
.layout {
  width: 100%;
  height: 100%;
  // position: relative;
  & > * {
    // position: absolute;
    // width: 100%;
    // height: 100%;
  }
}
</style>
