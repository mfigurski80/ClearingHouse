<template>
  <p>BOND LISTING</p>
  <div class="table">
    <div class="row" v-for="bond in props.bondList" :key="bond.id">
      <p>{{ bond }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import ColumnGroup from "primevue/columngroup"; //optional for column grouping
import Row from "primevue/row";

import { RawBond } from "@/contracts.d.ts";

const props = defineProps<{ bondList: [RawBond] }>();
console.log(props);
</script>
