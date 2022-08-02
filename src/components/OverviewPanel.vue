<template>
  <div class="panel"></div>
  <columns-layout class="section">
    <div class="column">
      <h3>Column 1</h3>
      <bond-listing :bondList="[]" />
    </div>
    <div class="column">
      <h3>Column 2</h3>
    </div>
  </columns-layout>
</template>

<script lang="ts" setup>
import TabPanel from "primevue/tabpanel";

import ColumnsLayout from "@/layouts/ColumnsLayout.vue";
import BondListing from "@/components/BondListing.vue";
</script>

<style lang="scss" scoped>
.column {
}
.panel {
  width: 100%;
  padding: 30px;
  border-radius: 30px;
  background: url(@/assets/grain-texture-2-.06.png) center center repeat,
    var(--gradient-primary-secondary);
}
</style>
