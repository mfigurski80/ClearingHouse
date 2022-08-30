<template>
  <a id="chip" :style="style" :href="`./bond/${props.bond.id}`">
    <span class="piece">#{{ label[0] }}</span>
    <span class="piece">
      {{ label[1] }} <small>{{ label[2] }}</small>
    </span>
    <span class="piece">
      {{ label[3] }}
    </span>
  </a>
</template>

<script lang="ts" setup>
import { computed } from "vue";

import { toReadableInterval, toCurrencyFormat } from "@/utils";
import type { FetchBondResult } from "@/composables/bondQueries";
import type { FetchCurrencyResult } from "@/composables/currencyQueries";

type BondPanelProps = {
  bond: FetchBondResult;
  currency: FetchCurrencyResult | undefined;
};
const props = defineProps<BondPanelProps>();

const style = computed(
  () =>
    `--completed: ${Math.round(
      (100 * props.bond.curPeriod) / props.bond.nPeriods
    )}%`
);

const label = computed(() => [
  props.bond.id,
  toCurrencyFormat(
    props.bond.couponSize * props.bond.nPeriods + props.bond.faceValue,
    props.currency
  ),
  props.currency?.symbol || "(??)",
  toReadableInterval(props.bond.nPeriods * props.bond.periodDuration * 1000),
]);
</script>

<style lang="scss" scoped>
#chip {
  $shading: #ffffff29;
  --completed: 40%;
  border-radius: 13px;
  padding: 0 2px;
  margin-left: 0;
  border: 2px solid var(--color-background-alt);
  display: inline-block;
  font-weight: normal;
  text-decoration: none;
  color: var(--color-text);
  background: linear-gradient(
      90deg,
      $shading 0%,
      $shading var(--completed),
      transparent var(--completed),
      transparent 100%
    ),
    var(--color-background);
  .piece {
    padding: 10px 5px;
    display: inline-block;
    border-right: 2px solid var(--color-background-alt);
    &:last-of-type {
      border-right: none;
    }
  }
}
</style>
