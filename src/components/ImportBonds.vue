<template>
  <label for="bondId"><p>By Bond ID:</p></label>
  <form class="p-inputgroup" @submit.prevent="submitBondId">
    <span class="p-inputgroup-addon">#</span>
    <InputNumber
      v-model="bondSearchInput"
      :min="0"
      :useGrouping="false"
      id="bondId"
    />
    <Button icon="pi pi-search" type="submit" />
  </form>
  <WithBondCurrencyRequest :bondId="bondSearchSearch.value" v-slot="props">
    <p>{{ props }}</p>
  </WithBondCurrencyRequest>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import InputNumber from "primevue/inputnumber";
import Button from "primevue/button";

import WithBondCurrencyRequest from "@/components/withBondCurrencyRequest.vue";

const bondSearchInput = ref<number | undefined>(undefined);
const bondSearchSearch = ref<number | undefined>(undefined);

const submitBondId = () => {
  bondSearchSearch.value = bondSearchInput.value ?? undefined;
};
</script>
