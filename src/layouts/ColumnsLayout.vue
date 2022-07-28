<template>
  <div class="layout">
    <slot>Column 1</slot>
  </div>
</template>

<style lang="scss" component>
.layout {
  width: 100%;
  display: flex;
  flex-direction: row;
}
</style>
