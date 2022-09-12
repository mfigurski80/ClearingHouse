<template>
  <label for="beneficiary">{{ props.label ?? "Wallet Address" }}</label>
  <div class="p-inputgroup">
    <InputText
      id="beneficiary"
      :modelValue="props.modelValue"
      @update:modelValue="(event) => $emit('update:modelValue', event)"
      :placeholder="'0x0123456789abcdef...'"
    />
    <Button icon="pi pi-credit-card" @click="fillMine" class="fill-button" />
  </div>
</template>

<script lang="ts" setup>
import InputText from "primevue/inputtext";
import Button from "primevue/button";

import { wallet } from "@/composables/web3";

const props = defineProps<{
  modelValue?: string;
  label?: string;
}>();
const emit = defineEmits(["update:modelValue"]);

const fillMine = () => {
  emit("update:modelValue", wallet.value ?? "");
};
</script>

<style scoped lang="scss">
::v-deep(.fill-button) {
  background: var(--color-background);
  border-color: var(--color-background-alt);
  color: var(--color-text);
  &:hover {
    background: var(--color-background);
    border-color: var(--color-primary);
    color: var(--color-text);
  }
}
</style>
