<template>
  <div
    v-for="i in toRender"
    :key="props.questionIds[i - 1]"
    :class="innerClass"
  >
    <slot
      :name="props.questionIds[i - 1]"
      :position="i"
      :nSteps="props.questionIds.length - 1"
    >
      <p>[{{ props.questionIds[i - 1] }}] slot is missing content</p>
    </slot>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
// <slot v-if="props.questionIds.length === 0" name="form-missing" />
const props = defineProps<{
  questionIds: unknown[];
  completedCheck: { [String]: () => boolean };
  showAll?: boolean;
  innerClass?: string;
}>();

const toRender = computed(() => {
  if (props.showAll) return props.questionIds.length;
  let toRender = 0;
  for (const id of props.questionIds) {
    toRender++;
    if (id in props.completedCheck && !props.completedCheck[id]()) break;
  }
  // console.log("toRender", toRender);
  return toRender;
});
</script>
