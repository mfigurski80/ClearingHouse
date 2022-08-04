<template>
  <a id="panel" :style="style" :href="`./bond/${props.bond.id}`">
    #{{ props.bond.id }}:
    {{ props.bond.couponSize * props.bond.periodsTotal + props.bond.faceValue }}
  </a>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import type { Bond } from "@/types";

const props = defineProps<{ bond: Bond }>();
const style = computed(
  () =>
    `--completed: ${Math.round(
      (100 * props.bond.periodsCompleted) / props.bond.periodsTotal
    )}%`
);
</script>

<style lang="scss" scoped>
#panel {
  $shading: #ffffff1c;
  --completed: 40%;
  border-radius: 13px;
  padding: 10px;
  margin: 3px;
  display: inline-block;
  font-weight: normal;
  text-decoration: none;
  color: var(--color-text);
  background: linear-gradient(
      90deg,
      $shading 0%,
      $shading var(--completed),
      transparent var(--completed),
      transparent 100%
    ),
    var(--color-background);
}
</style>
