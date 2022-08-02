<template>
  <container-layout id="dashboard">
    <tab-view>
      <tab-panel header="Overview" id="overview-panel">
        <overview-panel />
      </tab-panel>
      <tab-panel header="Alerts" id="alerts-panel"> </tab-panel>
    </tab-view>
  </container-layout>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";

import ContainerLayout from "@/layouts/ContainerLayout.vue";
import OverviewPanel from "@/components/OverviewPanel.vue";
// import CoreJSON from "@mfigurski80/bond-token/contracts/Core.json";

import { RawBond } from "@/contracts.d.ts";

// <h3>Overview</h3>

const bonds = ref<[RawBond]>([
  {
    id: 1,
  },
]);
</script>

<style lang="scss" scoped>
#dashboard {
  max-width: 100%;
  .column {
    flex: 1 1 auto;
  }
}
</style>
