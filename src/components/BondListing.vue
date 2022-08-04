<template>
  <p>BOND LISTING</p>
  <DataTable :value="props.bondList" class="p-datatable">
    <Column>
      <template #body="{ data }">
        <div class="warning-bar" :class="{ active: data.id % 2 === 1 }" />
      </template>
    </Column>
    <Column header="ID">
      <template #body="{ data }">#{{ data.id }}</template>
    </Column>
    <Column header="Status">
      <template #body>
        <span class="status-chip">ACTIVE</span>
      </template>
    </Column>
    <Column header="Service Payments">
      <template #body="{ data }">
        {{ data.couponSize }}
        <small>{{ data.currency?.symbol || "???" }}</small> per 4 days
      </template>
    </Column>
    <Column header="Face Value">
      <template #body="{ data }">
        {{ data.faceValue }} <small>{{ data.currency?.symbol || "???" }}</small>
      </template>
    </Column>
    <Column header="Progress">
      <template #body="{ data }">
        <ProgressBar
          :progress="data.periodsCompleted / data.periodsTotal"
          :label="`${data.periodsCompleted} / ${data.periodsTotal}`"
        />
      </template>
    </Column>
    <Column header="Actions">
      <template #body>
        <div class="actions">
          <Button
            icon="pi pi-percentage"
            class="p-button-rounded p-button-outlined p-button-sm p-button-plain"
          />
          <Button
            icon="pi pi-arrow-up-right"
            class="p-button-rounded p-button-outlined p-button-sm p-button-plain"
          />
          <Button
            icon="pi pi-trash"
            class="p-button-rounded p-button-outlined p-button-sm p-button-plain"
          />
        </div>
      </template>
    </Column>
  </DataTable>
</template>

<script lang="ts" setup>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";

import { RawBond } from "@/types";
import ProgressBar from "@/components/ProgressBar.vue";

const props = defineProps<{ bondList: [RawBond] }>();
console.log(props.bondList);
</script>

<style lang="scss" scoped>
.warning-bar {
  background-color: transparent;
  height: 60px;
  width: 6px;
  margin-right: 1px;
  border-radius: 4px 0 0 4px;
  &.active {
    background-color: var(--color-failure);
  }
}
.status-chip {
  border-radius: 10px;
  padding: 8px 7px 6px;
  display: inline-block;
  font-weight: bold;
  background: var(--color-success);
  color: var(--color-background);
  font-size: 12px;
  line-height: 1.2;
}
.actions {
  & > * {
    margin-right: 3px;
  }
}
</style>
