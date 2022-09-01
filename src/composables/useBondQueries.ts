import { computed, Ref } from "vue";
import { useQuery, useQueries } from "vue-query";
import type { QueryFunctionContext } from "vue-query/types";

import { computeCacheKey, pullQueryCache, persistQueryResult } from "@/utils";
import { useWeb3, ConnectionStatus } from "@/composables/web3";
import { useContracts } from "@/composables/contracts";
import { fetchBond, FetchBondResult } from "@/queries/chainQueries";
export type {
  FetchBondResult,
  FetchCurrencyResult,
} from "@/queries/chainQueries";
import {
  useCurrencyQuery,
  useCurrencyListQuery,
} from "@/composables/useCurrencyQueries";

// USE BOND QUERIES HOOKS

const queryOptions = {
  refetchOnWindowFocus: false,
  cacheTime: 1000 * 60 * 60 * 24 * 365, // keep for 1 year
  staleTime: 1000 * 60 * 15, // refetch every 15 minutes
  retry: false, // don't retry
};

/**
 * Use this hook to fetch a single bond from core contract
 * @param bondId Ref to bondid to fetch
 * @returns Fetched Bond Result
 */
export const useBondQuery = (bondId: Ref<number | undefined>) => {
  const { status } = useWeb3();
  const { contracts } = useContracts();

  const enabled = computed(() => {
    return (
      bondId.value !== undefined &&
      bondId.value >= 0 &&
      // !!cacheKey.value &&
      !!contracts.value.Core &&
      status.value === ConnectionStatus.CONNECTED
    );
  });

  const initialData = computed(
    () =>
      pullQueryCache<FetchBondResult>(computeCacheKey(["bond", bondId.value]))
        ?.data
  );
  const initialDataUpdatedAt = computed(
    () =>
      pullQueryCache<FetchBondResult>(computeCacheKey(["bond", bondId.value]))
        ?.updated
  );

  return useQuery({
    queryKey: ["bond", bondId],
    queryFn: (ctx) =>
      persistQueryResult(
        fetchBond(contracts.value.Core, bondId.value as number),
        computeCacheKey(ctx.queryKey)
      ),
    ...queryOptions,
    enabled: enabled,
    initialData,
    initialDataUpdatedAt,
  });
};

/**
 * Use this hook to fetch a list of bonds
 * @param bondIds List of bond ids to fetch
 * @returns QueryObserverResult
 */
export const useBondListQuery = (bondIds: Ref<(number | undefined)[]>) => {
  const { status } = useWeb3();
  const { contracts } = useContracts();

  const queryKeys = computed(() =>
    bondIds.value.map((bondId) => {
      const cacheKey = computeCacheKey(["bond", bondId]);
      return {
        queryKey: ["bond", bondId],
        queryFn: (ctx: QueryFunctionContext) =>
          persistQueryResult(
            fetchBond(contracts.value.Core, bondId as number),
            computeCacheKey(ctx.queryKey)
          ),
        ...queryOptions,
        enabled:
          bondId !== undefined &&
          status.value === ConnectionStatus.CONNECTED &&
          contracts.value.Core !== undefined,
        initialData: pullQueryCache<FetchBondResult>(cacheKey)?.data,
        initialDataUpdatedAt:
          pullQueryCache<FetchBondResult>(cacheKey)?.updated,
      };
    })
  );

  return useQueries(queryKeys);
};

/**
 * Use this hook to fetch single bond with related currency
 * @param bondId Id of bond to fetch
 * @returns Fetched Bond Result
 */
export const useBondQueryWithCurrency = (bondId: Ref<number | undefined>) => {
  // get bond
  const bondResp = useBondQuery(bondId);
  // get currency
  const currencyRef = computed(() => bondResp.data.value?.currencyRef);
  const currencyResp = useCurrencyQuery(currencyRef);

  return { bond: bondResp, currency: currencyResp };
};

/**
 * Use this hook to fetch a list of bonds with corresponding currency data
 * @param bondIds Ids of bonds to maintain state on
 * @returns UseQuery Results for each bondId
 */
export const useBondListQueryWithCurrency = (bondIds: Ref<number[]>) => {
  const bondQueries = useBondListQuery(bondIds);
  const currencyIds = computed(() =>
    bondQueries.map((q) => q.data?.currencyRef)
  );
  const currencyQueries = useCurrencyListQuery(currencyIds);

  return { bonds: bondQueries, currencies: currencyQueries };
};
