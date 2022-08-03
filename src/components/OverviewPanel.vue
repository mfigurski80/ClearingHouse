<template>
  <div class="panel">
    <timeline :value="[4, 6, 8, 1, 2]" layout="horizontal">
      <template #content="slotProps">
        <p>{{ slotProps.item }}</p>
      </template>
    </timeline>
  </div>
  <columns-layout class="section">
    <div class="column">
      <h3>Column 1</h3>
      <bond-listing :bondList="chainData.bonds" />
    </div>
    <div class="column">
      <h3>Column 2</h3>
    </div>
  </columns-layout>
</template>

<script lang="ts" setup>
import Timeline from "primevue/timeline";

import { useChainData } from "@/composables/chainData";
import ColumnsLayout from "@/layouts/ColumnsLayout.vue";
import BondListing from "@/components/BondListing.vue";
const { chainData } = useChainData();
</script>

<style lang="scss" scoped>
.column {
  flex: 1 1;
}
.panel {
  width: 100%;
  padding: 30px 20px;
  border-radius: 30px;
  background: url(@/assets/grain-texture-2-.06.png) center center repeat,
    var(--gradient-primary-secondary);
  color: var(--color-background-alt);
  box-shadow: var(--shadow-1);
}
::v-deep(.p-timeline.p-timeline-horizontal) {
  .p-timeline-event-opposite {
    flex: 0;
  }
  .p-timeline-event-separator {
    opacity: 0.4;
  }
}
</style>
