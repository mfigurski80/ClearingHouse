<template>
  <div class="panel">
    <timeline :value="eventsData" layout="horizontal" class="panel-timeline">
      <template #opposite="props">
        <small>{{ props.item.relativeTime }}</small>
      </template>
      <template #marker="props">
        <i
          class="p-timeline-event-market marker pi"
          :class="props.item.failed ? 'pi-times failed' : props.item.icon"
        />
      </template>
      <template #content="props">
        <div class="event-card">
          <p class="header">
            <span v-if="props.item.incoming" class="label incoming">
              Incoming
            </span>
            <span v-else class="label outgoing">Outgoing</span>
            {{ props.item.typeLabel }}
          </p>
          <h6>RELATED TO BOND:</h6>
          <bond-chip :bond="props.item.bond" />
        </div>
      </template>
    </timeline>
  </div>
  <columns-layout class="section">
    <div class="column">
      <h3>ASSETS</h3>
      <bond-listing :bondList="bonds.owned" />
    </div>
    <div class="column">
      <h3>LIABILITIES</h3>
      <bond-listing :bondList="bonds.minted" />
    </div>
  </columns-layout>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import Timeline from "primevue/timeline";

import { toRelativeDate } from "@/utils";
import ColumnsLayout from "@/layouts/ColumnsLayout.vue";
import BondChip from "@/components/BondChip.vue";
import BondListing from "@/components/BondListing.vue";

import { useChainData } from "@/composables/chainData";
const { chainData } = useChainData();
import useBondListCache from "@/composables/useBondListCache";
const bonds = useBondListCache();

import { EventType, Direction } from "@/types/enums";

const eventsData = computed(() =>
  chainData.events
    .filter((ev) => !ev.completed)
    .sort((a, b) => a.timestamp - b.timestamp)
    .slice(0, 3)
    .map((ev) => {
      let bond = { ...chainData.bonds.find((b) => b.id === ev.bondId) };
      bond.currency = {
        ...chainData.currencies.find((c) => c.id === bond.currencyRef),
      };
      return {
        relativeTime: toRelativeDate(ev.timestamp),
        failed: ev.timestamp < Date.now(),
        direction: ev.direction,
        typeLabel:
          ev.eventType === EventType.SERVICE_PAYMENT
            ? "Service Payment"
            : "Completion Payment",
        icon:
          ev.direction === Direction.INCOMING
            ? "pi-arrow-down-right"
            : "pi-arrow-up-right",
        type: ev.eventType,
        incoming: ev.direction === Direction.INCOMING,
        bond,
      };
    })
);
</script>

<style lang="scss" scoped>
.column {
  flex: 1 1;
}
.panel {
  width: 100%;
  padding: 20px 30px;
  border-radius: 30px;
  background: url(@/assets/grain-texture-2-.06.png) center center repeat,
    var(--gradient-primary-secondary);
  color: var(--color-background-alt);
  box-shadow: var(--shadow-1);
  .marker {
    padding: 0px 5px;
    border-radius: 50%;
    border: 2px solid red;
    border-color: inherit;
    background: none;
    font-size: 12px;
    text-align: center;
    line-height: 20px;
    display: inline-block;
    &.failed {
      background: var(--color-background-alt);
      color: var(--color-primary);
      border-color: var(--color-background-alt);
    }
  }
  .event-card {
    width: 270px;
    margin: 12px 0;
    padding: 16px;
    border-radius: 18px;
    color: var(--color-text);
    background: var(--color-background-alt);
    box-shadow: var(--shadow-1);
    .label {
      background: gray;
      padding: 3px 6px 0px 6px;
      display: inline-block;
      border-radius: 12px;
      font-weight: bold;
      margin: 0px 3px 8px 0px;
      &.incoming {
        background: var(--color-success);
        color: var(--color-background);
      }
      &.outgoing {
        background: var(--color-primary);
        color: var(--color-background);
      }
    }
  }
}
::v-deep(.panel-timeline.p-timeline.p-timeline-horizontal) {
  $p-timeline-item-gap: 30px;
  $p-dim-text: #fffa;
  $p-dim-line: #fff6;

  .p-timeline-event {
    flex: 0;
    .p-timeline-event-opposite {
      flex: 0;
      color: $p-dim-text;
      font-weight: bold;
      font-size: 14px;
      text-align: center;
      padding-right: $p-timeline-item-gap;
      & > * {
        display: inline-block;
        padding: 4px;
      }
    }
    .p-timeline-event-separator {
      position: relative;
      left: calc(50% - 30px);
      color: $p-dim-line;
    }
    &:first-of-type .p-timeline-event-separator::before {
      content: "";
      position: absolute;
      height: 2px;
      width: 40%;
      left: -40%;
      // border: 1px solid blue;
      background: linear-gradient(90deg, #fff0 10%, $p-dim-line 100%);
    }
    .p-timeline-event-content {
      padding-right: $p-timeline-item-gap;
    }
  }
}
</style>
