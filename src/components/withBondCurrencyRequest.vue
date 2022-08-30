<template>
  <p>With Bond Currency Request ({{ props.bondId ?? "--" }})::</p>
  <slot :bondId="props.bondId" :bondQueryResult="bondQueryResult" />
</template>

<script setup lang="ts">
import { ref, computed, Ref } from "vue";

import { useBondQueryWithCurrency } from "@/composables/useBondQueries";

const props = defineProps<{ bondId: number | undefined }>();

const bondId = computed(() => props.bondId);
console.log("props", bondId);

const bondQueryResult = useBondQueryWithCurrency(bondId);
</script>
