<template>
  <events-panel :ownedBondList="bonds.owned" :mintedBondList="bonds.minted" />
  <columns-layout class="section">
    <div class="column">
      <h3>ASSETS</h3>
      <bond-listing :bondList="bonds.owned" />
      <div class="p-buttonset action-buttons">
        <a
          href="https://goerli.pixxiti.com/collections/0xb72864dd103cba1ccbc11c27342baaf8f5a2bbea"
        >
          <Button
            icon="pi pi-external-link"
            class="p-button-rounded p-button-outlined"
            label="Buy"
          />
        </a>
        <Button
          icon="pi pi-upload"
          class="p-button-text p-button-rounded p-button-secondary upload-button"
          @click="showImportBondDialog"
        />
      </div>
    </div>
    <div class="column">
      <h3>LIABILITIES</h3>
      <bond-listing :bondList="bonds.minted" />
      <div class="p-buttonset action-buttons">
        <a href="https://mfigurski80.github.io/karmaToken/interaction.html">
          <Button
            icon="pi pi-plus"
            class="p-button-rounded p-button-outlined"
            label="Mint"
          />
        </a>
        <Button
          icon="pi pi-upload"
          class="p-button-text p-button-rounded p-button-secondary upload-button"
          @click="showImportBondDialog"
        />
      </div>
    </div>
  </columns-layout>
  <Dialog header="Import Bonds" v-model:visible="display">
    <import-bonds />
  </Dialog>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import Button from "primevue/button";
import Dialog from "primevue/dialog";

import ColumnsLayout from "@/layouts/ColumnsLayout.vue";
import EventsPanel from "@/components/EventsPanel.vue";
import BondListing from "@/components/SmallBondListing.vue";
import ImportBonds from "@/components/ImportBonds.vue";

import useBondListCache from "@/composables/useBondListCache";

const bonds = useBondListCache();

const showImportBondDialog = () => (display.value = true);
const display = ref(false);
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
