<template>
  <a class="chip" href="/currency/0">
    <h5>#{{ props.currency?.id ?? "??" }}</h5>
    <h5>
      {{ props.currency?.name || "???" }}
      <small
        ><code>{{ props.currency?.symbol || "??" }}</code></small
      >
    </h5>
    <h5 v-if="props.price">{{ props.price }} $</h5>
  </a>
</template>

<script setup lang="ts">
import { FetchCurrencyResult } from "@/queries/chainQueries.ts";
const props = defineProps<{
  currency?: FetchCurrencyResult;
  price?: number;
}>();
</script>

<style scoped lang="scss">
.chip {
  display: inline-block;
  border-radius: 10px;
  background: var(--color-secondary);
  border: 1px solid var(--color-background-alt);
  transition: background 0.15s ease-in-out;
  margin: 0 6px;
  h5 {
    margin: 0;
    display: inline-block;
    line-height: 16px;
    font-size: 14px;
    padding: 10px 6px 6px;
    color: var(--color-background-alt);
    border-right: 1px solid var(--color-background-alt);
    &:last-child {
      border-right: none;
    }
  }
  &:hover {
    background: var(--color-secondary-alt);
  }
}
</style>
