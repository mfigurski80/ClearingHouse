<template>
  <container-layout id="dashboard">
    <tab-view>
      <tab-panel header="Overview">
        <overview-panel />
      </tab-panel>
      <tab-panel header="Alerts"> </tab-panel>
      <tab-panel header="Events"> </tab-panel>
      <tab-panel header="Build"> </tab-panel>
    </tab-view>
  </container-layout>
</template>

<script lang="ts" setup>
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";

import ContainerLayout from "@/layouts/ContainerLayout.vue";
import OverviewPanel from "@/components/OverviewPanel.vue";
// import CoreJSON from "@mfigurski80/bond-token/contracts/Core.json";
</script>

<style lang="scss" scoped>
#dashboard {
  max-width: 100%;
  padding-top: 10px;
  padding-bottom: 10px;
}
</style>
