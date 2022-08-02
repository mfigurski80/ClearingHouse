<template>
  <container-layout id="dashboard">
    <h3>Overview</h3>
    <section class="overview">
      <div class="panel"></div>
      <columns-layout class="section">
        <div class="column">
          <h3>Column 1</h3>
          <bond-listing :bondList="bonds" />
        </div>
        <div class="column">
          <h3>Column 2</h3>
        </div>
      </columns-layout>
    </section>
  </container-layout>
</template>

<script lang="ts" setup>
import { ref } from "vue";

// import CoreJSON from "@mfigurski80/bond-token/contracts/Core.json";
import ContainerLayout from "@/layouts/ContainerLayout.vue";
import ColumnsLayout from "@/layouts/ColumnsLayout.vue";
import BondListing from "@/components/BondListing.vue";

import { RawBond } from "@/contracts.d.ts";

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
  .overview {
    .panel {
      width: 100%;
      padding: 30px;
      border-radius: 30px;
      background: url(@/assets/grain-texture-2-.06.png) center center repeat,
        var(--gradient-primary-secondary);
    }
  }
}
</style>
