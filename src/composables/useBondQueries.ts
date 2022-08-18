import { computed, Ref } from "vue";
import { useQuery, useQueries, UseQueryOptions } from "vue-query";
import type { QueryObserverResult } from "vue-query/types";

import { fetchBond, FetchBondResult } from "@/queries/testChainQueries";
import { useCurrencyListQuery } from "@/composables/currencyQueries";

export { FetchBondResult };

const queryOptions = {
  refetchOnWindowFocus: false,
  cacheTime: 1000 * 60 * 5,
  staleTime: 1000 * 60 * 5,
};

export const useBondQuery = (
  bondId: number | Ref<number>,
  options?: Omit<
    UseQueryOptions<unknown, unknown, unknown, (string | number)[]>,
    "queryFn" | "queryKey"
  >
) => {
  return useQuery(
    ["bond", (bondId as Ref<number>).value || (bondId as number)],
    fetchBond,
    {
      ...queryOptions,
      ...options,
    }
  );
};

export const useBondListQuery = (
  bondIds: number[] | Ref<number[]>,
  options?: Omit<
    UseQueryOptions<unknown, unknown, unknown, (string | number)[]>,
    "queryFn" | "queryKey"
  >
) => {
  return useQueries(
    ((bondIds as Ref<number[]>).value || bondIds).map((bondId) => ({
      queryKey: ["bond", bondId],
      queryFn: fetchBond,
      ...queryOptions,
      enabled: !!bondId,
      ...options,
    }))
  ) as readonly QueryObserverResult<FetchBondResult, unknown>[];
};

export const useBondListQueryWithCurrency = (
  bondIds: number[] | Ref<number[]>,
  options?: Omit<
    UseQueryOptions<unknown, unknown, unknown, (string | number)[]>,
    "queryFn" | "queryKey"
  >
) => {
  const bondQueries = useBondListQuery(bondIds, options);
  const currencyIds = computed(() =>
    bondQueries.map((q) => q.data?.currencyRef)
  );
  const currencyQueries = useCurrencyListQuery(currencyIds, options);

  return { bonds: bondQueries, currencies: currencyQueries };
};
