<template>
  <container-layout id="dashboard">
    <missing-content
      v-if="width < 1100"
      title="Screen Size is Too Small"
      subtitle="Please view the dashboard page on a large screen size"
    />
    <missing-content
      v-else-if="status !== ConnectionStatus.CONNECTED"
      title="Not Connected"
      subtitle="Please connect a wallet to view the dashboard"
    >
      <ConnectWalletButton />
    </missing-content>
    <tab-view v-else>
      <tab-panel header="Overview">
        <overview-tab />
      </tab-panel>
      <tab-panel header="Portfolio">
        <missing-content title="Not implemented. Please check back later!" />
      </tab-panel>
      <tab-panel header="Events">
        <missing-content title="Not implemented. Please check back later!" />
      </tab-panel>
      <tab-panel header="Mint">
        <mint-tab />
      </tab-panel>
    </tab-view>
  </container-layout>
</template>

<script lang="ts" setup>
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";
import { useWindowSize } from "@vueuse/core";

import ContainerLayout from "@/layouts/ContainerLayout.vue";
import OverviewTab from "@/components/OverviewTab.vue";
import MintTab from "@/components/MintTab.vue";
import MissingContent from "@/components/MissingContent.vue";
import ConnectWalletButton from "@/components/ConnectWalletButton.vue";

import { status, ConnectionStatus } from "@/composables/web3";
// import CoreJSON from "@mfigurski80/bond-token/contracts/Core.json";

const { width } = useWindowSize();
</script>

<style lang="scss" scoped>
#dashboard {
  max-width: 100%;
  padding-top: 10px;
  padding-bottom: 10px;
}
</style>
