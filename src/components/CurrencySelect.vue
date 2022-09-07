<template>
  <label for="currency">{{ props.label }}</label>
  <div class="p-inputgroup">
    <span class="p-inputgroup-addon">#</span>
    <span class="p-input-icon-right">
      <InputNumber
        id="currency"
        :min="0"
        :useGrouping="false"
        v-bind="$attrs"
        :modelValue="props.modelValue"
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
import { computed } from "vue";
import InputNumber from "primevue/inputnumber";

import CurrencyChip from "@/components/CurrencyChip";
import MissingContent from "@/components/MissingContent";
import { useCurrencyQuery } from "@/composables/useCurrencyQueries";

const props = defineProps<{
  label?: string;
  modelValue?: number;
}>();

const currencyId = computed(() => props.modelValue);
const currencyResponse = useCurrencyQuery(currencyId);
</script>
