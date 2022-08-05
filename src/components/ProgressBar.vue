<template>
  <div class="container">
    <h6 v-if="props.label">{{ props.label }}</h6>
    <div
      class="bar"
      :style="`--completed: ${props.progress * 100}%; --color: ${
        props.color || 'var(--color-primary)'
      }`"
    ></div>
  </div>
</template>

<script lang="ts" setup>
interface ProgressBar {
  label?: string;
  progress?: number;
  color?: string;
}
const props = defineProps<ProgressBar>();
</script>

<style lang="scss" scoped>
.container {
  display: inline-block;
  width: 100%;
  margin-top: 6px;
  padding: 20px 8px 16px 0px;
  position: relative;
  h6 {
    position: absolute;
    top: 0px;
  }
  .bar {
    --completed: 30%;
    min-width: 30px;
    width: 60px;
    height: 8px;
    background: linear-gradient(
        90deg,
        var(--color) 0%,
        var(--color) var(--completed),
        transparent var(--completed),
        transparent 100%
      ),
      var(--color-background-alt);
    border-radius: 6px;
  }
}
</style>
