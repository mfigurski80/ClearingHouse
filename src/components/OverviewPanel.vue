<template>
  <div class="panel">
    <timeline :value="eventsData" layout="horizontal" class="panel-timeline">
      <template #opposite="props">
        <small>{{ props.item.relativeTime }}</small>
      </template>
      <template #content="props">
        <div class="event-card">
          <p>
            <span v-if="props.item.incoming" class="label incoming">
              Incoming
            </span>
            <span v-else class="label outgoing">Outgoing</span>
            {{ props.item.typeLabel }}
          </p>
          <bond-panel :bond="props.item.bond" />
        </div>
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
import { computed } from "vue";
import Timeline from "primevue/timeline";
import moment from "moment";

import BondPanel from "@/components/BondPanel.vue";
import ColumnsLayout from "@/layouts/ColumnsLayout.vue";
import BondListing from "@/components/BondListing.vue";
import { useChainData, ChainData } from "@/composables/chainData";
const { chainData } = useChainData();

import { EventType, Direction } from "@/types/enums";

const eventsData = computed(() =>
  (chainData as ChainData).events
    .filter((ev) => !ev.completed)
    .sort((a, b) => a.timestamp - b.timestamp)
    .slice(0, 3)
    .map((ev) => ({
      relativeTime: moment(ev.timestamp).fromNow(),
      direction: ev.direction,
      typeLabel:
        ev.eventType === EventType.SERVICE_PAYMENT
          ? "Service Payment"
          : "Completion Payment",
      type: ev.eventType,
      incoming: ev.direction === Direction.INCOMING,
      bond: chainData.bonds.find((b) => b.id === ev.bondId),
    }))
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
  .event-card {
    width: 290px;
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
      margin-right: 4px;
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
      left: calc(50% - 20px);
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
