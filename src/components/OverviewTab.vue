<template>
  <events-panel :ownedBondList="bonds.owned" :mintedBondList="bonds.minted" />
  <columns-layout class="section">
    <div class="column">
      <h3>ASSETS</h3>
      <bond-listing :bondList="bonds.owned" />
      <div class="p-buttonset action-buttons">
        <Button
          icon="pi pi-external-link"
          class="p-button-rounded p-button-outlined"
          label="Buy"
        />
        <Button
          icon="pi pi-upload"
          class="p-button-text p-button-rounded p-button-secondary upload-button"
        />
      </div>
    </div>
    <div class="column">
      <h3>LIABILITIES</h3>
      <bond-listing :bondList="bonds.minted" />
      <div class="p-buttonset action-buttons">
        <Button
          icon="pi pi-plus"
          class="p-button-rounded p-button-outlined"
          label="Mint"
        />
        <Button
          icon="pi pi-upload"
          class="p-button-text p-button-rounded p-button-secondary upload-button"
        />
      </div>
    </div>
  </columns-layout>
</template>

<script lang="ts" setup>
import Button from "primevue/button";

import ColumnsLayout from "@/layouts/ColumnsLayout.vue";
import EventsPanel from "@/components/EventsPanel.vue";
import BondListing from "@/components/SmallBondListing.vue";

import useBondListCache from "@/composables/useBondListCache";
// import { Core } from "@mfigurski80/bond-token";
// console.log("BOND TOKEN", { ...Core });

const bonds = useBondListCache();
</script>

<style lang="scss" scoped>
.column {
  flex: 1 1;
  h3 {
    margin: 5px 0 15px;
  }
  .action-buttons {
    padding-top: 30px;
    justify-content: center;
    .upload-button {
      opacity: 0.8;
      color: var(--color-text-alt);
    }
  }
}
</style>
