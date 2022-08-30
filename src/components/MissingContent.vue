<template>
  <div class="holder">
    <h3>{{ props.title || "No Content Here" }}</h3>
    <p v-if="props.subtitle">{{ props.subtitle }}</p>
    <slot />
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{ title: string; subtitle: string }>();
</script>

<style lang="scss" scoped>
.holder {
  text-align: center;
  padding: 30px;
  max-width: 60%;
  min-width: 250px;
  margin-left: auto;
  margin-right: auto;
  color: var(--color-text-alt);
  h3 {
    margin: 10px 0;
  }
  p {
    margin: 10px 0;
  }
}
</style>
