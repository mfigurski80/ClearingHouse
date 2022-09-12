<template>
  <ScreenAndWalletFilter>
    <container-layout id="dashboard">
      <tab-view>
        <tab-panel header="Overview">
          <overview-tab />
        </tab-panel>
        <tab-panel header="Portfolio">
          <missing-content title="Not implemented. Please check back later!" />
        </tab-panel>
        <tab-panel header="Events">
          <missing-content title="Not implemented. Please check back later!" />
        </tab-panel>
      </tab-view>
    </container-layout>
  </ScreenAndWalletFilter>
</template>

<script lang="ts" setup>
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";

import ContainerLayout from "@/layouts/ContainerLayout.vue";
import OverviewTab from "@/components/OverviewTab.vue";
import MissingContent from "@/components/MissingContent.vue";
import ScreenAndWalletFilter from "@/layouts/ScreenAndWalletFilter.vue";
</script>

<style lang="scss" scoped>
#dashboard {
  max-width: 100%;
  padding-top: 10px;
  padding-bottom: 10px;
}
</style>
