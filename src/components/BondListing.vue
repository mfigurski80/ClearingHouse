<template>
  <DataTable :value="bonds" class="p-datatable">
    <Column bodyClass="warning-bar-col" headerClass="warning-bar-col">
      <template #body="{ data }">
        <div class="warning-bar" :class="{ active: data.warning }" />
      </template>
    </Column>
    <Column header="ID" field="id" />
    <Column header="Status" bodyClass="status-col" headerClass="status-col">
      <template #body="{ data }">
        <span class="status-chip" :class="data.status.toLowerCase()">{{
          data.status
        }}</span>
      </template>
    </Column>
    <Column header="Payments">
      <template #body="{ data }">
        <div>
          {{ data.couponSize }} <small>{{ data.currencySymbol }}</small> /
          {{ data.periodInterval }}
        </div>
      </template>
    </Column>
    <Column header="Face">
      <template #body="{ data }">
        <div>
          {{ data.faceValue }} <small>{{ data.currencySymbol }}</small>
        </div>
      </template>
    </Column>
    <Column header="Progress">
      <template #body="{ data }">
        <ProgressBar :progress="data.progress" :label="data.progressLabel" />
      </template>
    </Column>
    <Column header="Next">
      <template #body="{ data }">
        <span class="nextAction" :class="{ overdue: data.nextOverdue }">{{
          data.nextDate
        }}</span>
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
</template>

<script lang="ts" setup>
import { computed } from "vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";

import { Bond } from "@/types";
import { toReadableInterval, toRelativeDate } from "@/utils";
import ProgressBar from "@/components/ProgressBar.vue";

interface BondListingProps {
  bondList: Bond[];
}
enum BondStatus {
  PENDING = "PENDING",
  ACTIVE = "ACTIVE",
  FAILING = "FAILING",
  DEFAULT = "DEFAULT",
  COMPLETE = "COMPLETE",
}
interface BondListingTableEntry {
  warning: boolean;
  id: string;
  status: BondStatus;
  currencySymbol: string;
  couponSize: number;
  faceValue: number;
  periodInterval: string;
  progress: number;
  progressLabel: string;
  nextDate: string;
  nextOverdue: boolean;
}
const props = defineProps<BondListingProps>();
const bonds: BondListingTableEntry[] = computed(() =>
  props.bondList.map((bond) => {
    const nextDate = new Date(
      +bond.startTime + 1000 * bond.periodDuration * bond.periodsCompleted
    );
    const nextOverdue = nextDate < new Date();
    let status = BondStatus.PENDING;
    if (bond.startTime < new Date()) {
      if (!bond.active) status = BondStatus.DEFAULT;
      else if (bond.periodsCompleted > bond.periodsTotal)
        status = BondStatus.COMPLETE;
      else if (nextOverdue) status = BondStatus.FAILING;
      else status = BondStatus.ACTIVE;
    }
    return {
      warning: status === BondStatus.DEFAULT || status === BondStatus.FAILING,
      id: `#${bond.id}`,
      status: status,
      currencySymbol: bond.currency?.symbol || "???",
      couponSize: bond.couponSize, // TODO: format
      faceValue: bond.faceValue, // TODO: format
      periodInterval: toReadableInterval(bond.periodDuration * 1000),
      progress: bond.periodsCompleted / bond.periodsTotal,
      progressLabel: `${bond.periodsCompleted} / ${bond.periodsTotal}`,
      nextDate:
        status === BondStatus.COMPLETE ? "---" : toRelativeDate(nextDate),
      nextOverdue: nextOverdue,
    };
  })
);
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
  &.complete {
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
  width: 65px;
  max-width: 65px;
  // padding: 0 4px !important;
}
</style>
