<template>
  <div class="layout">
    <slot></slot>
  </div>
</template>

<style lang="scss" component>
.layout {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 20px;
}
</style>
