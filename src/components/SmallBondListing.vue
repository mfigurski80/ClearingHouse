<template>
  <DataTable v-if="bonds.length > 0" :value="bonds" class="p-datatable">
    <Column bodyClass="warning-bar-col" headerClass="warning-bar-col">
      <template #body="{ data }">
        <div class="warning-bar" :class="{ active: data.warning }" />
      </template>
    </Column>
    <Column header="ID" field="id" />
    <Column header="Status" bodyClass="status-col" headerClass="status-col">
      <template #body="{ data }">
        <span
          class="status-chip"
          v-if="data.isSuccess"
          :class="data.status.toLowerCase()"
          >{{ data.status }}</span
        >
      </template>
    </Column>
    <Column header="Payments">
      <template #body="{ data }">
        <div v-if="data.isSuccess">
          {{ data.couponSize }} <small>{{ data.currencySymbol }}</small> /
          {{ data.periodInterval }}
        </div>
      </template>
    </Column>
    <Column header="Face">
      <template #body="{ data }">
        <div v-if="data.isSuccess">
          {{ data.faceValue }} <small>{{ data.currencySymbol }}</small>
        </div>
      </template>
    </Column>
    <Column header="Progress">
      <template #body="{ data }">
        <ProgressBar
          :progress="data.progress"
          :label="data.progressLabel || 'loading'"
        />
      </template>
    </Column>
    <Column header="Next">
      <template #body="{ data }">
        <span
          class="nextAction"
          :class="{ overdue: data.nextOverdue }"
          v-if="data.isSuccess"
        >
          {{ data.nextDate }}
        </span>
      </template>
    </Column>
    <Column header="Actions">
      <template #body>
        <div class="actions">
          <Button
            icon="pi pi-shield"
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
  <missing-content
    v-else
    title="No Bonds to Show"
    subtitle="When you mint, buy or import bonds, they will show up here."
  />
</template>

<script lang="ts" setup>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";

import ProgressBar from "@/components/ProgressBar.vue";
import MissingContent from "@/components/MissingContent.vue";
import useSmallBondListing from "@/composables/useSmallBondListing";

interface BondListingProps {
  bondList: number[];
}
const props = defineProps<BondListingProps>();

const bonds = useSmallBondListing(props.bondList);
</script>

<style lang="scss" scoped>
.warning-bar {
  display: inline-block;
  background-color: transparent;
  min-height: 70px;
  height: 100%;
  width: 6px;
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
  background: orange;
  color: var(--color-background);
  font-size: 12px;
  line-height: 1.2;
  &.loading {
  }
  &.pending {
    background: var(--color-secondary);
  }
  &.active {
    background: var(--color-success);
  }
  &.failing {
    background: var(--color-primary-alt);
  }
  &.default {
    background: var(--color-primary);
  }
  &.done {
    background: var(--color-background-alt);
    color: var(--color-text);
  }
}
.actions {
  & > * {
    margin-right: 4px;
    margin-bottom: 2px;
    margin-top: 2px;
  }
}
</style>
<style lang="scss">
.warning-bar-col {
  // display: block;
  width: 8px;
  max-width: 8px;
  padding-bottom: 0 !important;
}
.status-col {
  $w: 50px;
  width: $w;
  max-width: $w;
  // padding: 0 4px !important;
}
</style>
