<template>
  <label for="duration">{{ props.label ?? "Duration" }}</label>
  <div class="p-inputgroup">
    <InputNumber
      id="duration"
      class="duration"
      :modelValue="props.modelValue?.duration"
      @update:modelValue="updateDuration"
      :useGrouping="false"
      :min="0"
      :placeholder="props.placeholder ?? 10"
    />
    <Dropdown
      :options="multiplierOptions"
      optionLabel="label"
      :modelValue="multiplierValue"
      @update:modelValue="updateMultiplier"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import InputNumber from "primevue/inputnumber";
import Dropdown from "primevue/dropdown";

enum DurationMultiplier {
  MINUTE = 60,
  DAY = 60 * 60 * 24,
  WEEK = 60 * 60 * 24 * 7,
  MONTH = 60 * 60 * 24 * 30,
  YEAR = 60 * 60 * 24 * 365,
}
const props = defineProps<{
  label?: string;
  modelValue?: {
    duration: number;
    multiplier: DurationMultiplier;
  };
  placeholder?: number;
}>();
const emit = defineEmits(["update:modelValue"]);

const multiplierOptions = [
  { label: "Minutes", value: DurationMultiplier.MINUTE },
  { label: "Days", value: DurationMultiplier.DAY },
  { label: "Weeks", value: DurationMultiplier.WEEK },
  { label: "Months", value: DurationMultiplier.MONTH },
  { label: "Years", value: DurationMultiplier.YEAR },
];
const multiplierValue = computed(() => {
  let value = props.modelValue?.multiplier ?? DurationMultiplier.DAY;
  return {
    label: multiplierOptions.find((o) => o.value === value)?.label,
    value,
  };
});

const updateDuration = (duration: number) => {
  emit("update:modelValue", {
    duration,
    multiplier: props.modelValue?.multiplier ?? DurationMultiplier.DAY,
  });
};

const updateMultiplier = (multiplier: { label: string; value: number }) => {
  emit("update:modelValue", {
    duration: props.modelValue?.duration,
    multiplier: multiplier.value,
  });
};
</script>

<style scoped lang="scss">
.duration {
  ::v-deep(#duration) {
    max-width: 150px;
  }
}
</style>
