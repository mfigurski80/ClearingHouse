<template>
  <label for="currency">{{ props.label }}</label>
  <div class="p-inputgroup">
    <span class="p-inputgroup-addon">#</span>
    <span class="p-input-icon-right">
      <InputNumber
        id="currency"
        :min="0"
        :useGrouping="false"
        v-model="currencyIdInput"
        :placeholder="0"
      />
      <i
        class="pi pi-spin pi-spinner"
        v-if="currencyResponse.isLoading.value"
      />
    </span>
  </div>

  <h4 v-if="currencyResponse.isSuccess.value">
    PREVIEW:
    <currency-chip :currency="currencyResponse.data.value" />
  </h4>
  <h4 v-if="currencyResponse.isError.value" class="p-error">
    This currency not yet registered
  </h4>
</template>

<script lang="ts" setup>
import { watch, ref } from "vue";
import InputNumber from "primevue/inputnumber";

import CurrencyChip from "@/components/CurrencyChip";
import {
  FetchCurrencyResponse,
  useCurrencyQuery,
} from "@/composables/useCurrencyQueries";

const props = defineProps<{
  label?: string;
  modelValue?: FetchCurrencyResponse;
}>();
const emit = defineEmits(["update:modelValue"]);

const currencyIdInput = ref<undefined | number>(props.modelValue?.id);
const currencyResponse = useCurrencyQuery(currencyIdInput);

watch(currencyResponse.data, (n) => {
  emit("update:modelValue", n);
});

watch(currencyIdInput, (n) => {
  if (n === undefined) {
    emit("update:modelValue", undefined);
  }
});
</script>
