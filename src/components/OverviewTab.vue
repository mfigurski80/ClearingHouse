<template>
  <events-panel :ownedBondList="bonds.owned" :mintedBondList="bonds.minted" />
  <columns-layout class="section">
    <div class="column">
      <h3>ASSETS</h3>
      <bond-listing :bondList="bonds.owned" />
    </div>
    <div class="column">
      <h3>LIABILITIES</h3>
      <bond-listing :bondList="bonds.minted" />
    </div>
  </columns-layout>
</template>

<script lang="ts" setup>
import ColumnsLayout from "@/layouts/ColumnsLayout.vue";
import EventsPanel from "@/components/EventsPanel.vue";
import BondListing from "@/components/SmallBondListing.vue";

import useBondListCache from "@/composables/useBondListCache";
const bonds = useBondListCache();
</script>

<style lang="scss" scoped>
.column {
  flex: 1 1;
}
</style>
