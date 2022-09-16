<template>
  <p class="description">
    Do you have bonds minted elsewhere that you'd like to include in this
    dashboard? Import its id and confirm the preview to add it!
  </p>
  <hr />
  <p><label for="bondId">By Bond ID:</label></p>
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

  <div class="preview" v-if="bond.isSuccess.value && !!bond.data.value">
    <h5 class="title">
      PREVIEW -
      <span
        class="relationship"
        :class="relationship === Relationship.NONE ? 'warning' : ''"
        >you are the {{ relationship }} of</span
      >:
    </h5>
    <div class="accept">
      <bond-chip :bond="bond.data.value" :currency="currency.data.value" />
      <Button
        class="complete-button p-button-outlined p-button-success"
        icon="pi pi-check"
        :disabled="!!error"
        @click="importBond"
      />
    </div>
    <h5 class="warning">{{ error }}</h5>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import InputNumber from "primevue/inputnumber";
import Button from "primevue/button";

import BondChip from "@/components/BondChip.vue";
import { Relationship } from "@/types/enums";
import { wallet } from "@/composables/web3";
import { useBondQueryWithCurrency } from "@/composables/useBondQueries";
import useBondListCache from "@/composables/useBondListCache";

const bondListCache = useBondListCache();
const bondSearchInput = ref<number | undefined>(undefined);
const bondSearchSearch = ref<number | undefined>(undefined);
const { bond, currency } = useBondQueryWithCurrency(bondSearchSearch);

const submitBondId = () => {
  bondSearchSearch.value = bondSearchInput.value ?? undefined;
};

const relationship = computed(() => {
  let b = bond.data.value;
  if (b.minter === wallet.value) return Relationship.MINTER;
  if (b.owner === wallet.value) return Relationship.OWNER;
  if (b.beneficiary === wallet.value) return Relationship.BENEFICIARY;
  return Relationship.NONE;
});

const error = computed(() => {
  if (relationship.value === Relationship.NONE)
    return "Your wallet is not related to this bond";
  if (
    bondListCache.owned.includes(bondSearchSearch.value) ||
    bondListCache.minted.includes(bondSearchSearch.value)
  )
    return "You already have this bond registered";
  return "";
});

const importBond = () => {
  if (
    relationship.value === Relationship.MINTER ||
    relationship.value === Relationship.OPERATOR
  )
    bondListCache.minted.push(bondSearchSearch.value);
  else if (
    relationship.value === Relationship.OWNER ||
    relationship.value === Relationship.BENEFICIARY
  )
    bondListCache.owned.push(bondSearchSearch.value);
  bondSearchSearch.value = undefined;
  bondSearchInput.value = undefined;
  return;
};
</script>

<style lang="scss" scoped>
.description {
  max-width: 330px;
  margin-bottom: 20px;
}
hr {
  margin: 20px 0;
  opacity: 0.6;
  // border-width: 1px;
}
label {
  color: var(--color-text-alt);
}
.preview {
  // border: 1px solid var(--color-text-alt);
  border-radius: 12px;
  margin: 25px 0 0;
  // max-width: 330px;
  .title {
    text-transform: uppercase;
  }
  .accept {
    padding: 4px 0;
    padding-right: 4px;
    display: flex;
    align-items: stretch;
    justify-content: space-between;
    gap: 10px;
  }
}
</style>
