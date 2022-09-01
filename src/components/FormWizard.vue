<template>
  <div
    v-for="i in props.questionIds.length"
    :key="props.questionIds[i - 1]"
    v-bind="$attrs"
  >
    <slot :name="props.questionIds[i - 1]">
      <p>[{{ props.questionIds[i - 1] }}] slot is missing content</p>
    </slot>
  </div>
</template>

<script setup lang="ts">
// <slot v-if="props.questionIds.length === 0" name="form-missing" />
const props = defineProps<{
  questionIds: unknown[];
}>();
</script>
