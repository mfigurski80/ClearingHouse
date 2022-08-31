import { computed, Ref } from "vue";
import { useQuery, useQueries } from "vue-query";
import type { QueryObserverResult } from "vue-query/types";

import { useWeb3, ConnectionStatus } from "@/composables/web3";
import { useContracts } from "@/composables/contracts";
import { fetchBond, FetchBondResult } from "@/queries/chainQueries";
export { FetchBondResult, FetchCurrencyResult } from "@/queries/chainQueries";
import {
  useCurrencyQuery,
  useCurrencyListQuery,
} from "@/composables/useCurrencyQueries";

// USE BOND QUERIES HOOKS

const queryOptions = {
  refetchOnWindowFocus: false,
  cacheTime: 1000 * 60 * 60 * 24 * 365, // keep for 1 year
  staleTime: 1000 * 60 * 30, // refetch every 30 minutes
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
      !!contracts.value.Core &&
      status.value === ConnectionStatus.CONNECTED
    );
  });

  return useQuery(
    ["bond", bondId],
    () => fetchBond(contracts.value.Core, bondId.value as number),
    {
      ...queryOptions,
      enabled,
    }
  );
};

/**
 * Use this hook to fetch a list of bonds
 * @param bondIds List of bond ids to fetch
 * @returns QueryObserverResult
 */
export const useBondListQuery = (
  bondIds: (number | undefined)[] | Ref<(number | undefined)[]>
) => {
  const { status } = useWeb3();
  const { contracts } = useContracts();

  const queryKeys = computed(() =>
    ((bondIds as Ref<number[]>).value || bondIds).map((bondId) => ({
      queryKey: ["bond", bondId],
      queryFn: () => fetchBond(contracts.value.Core, bondId as number),
      ...queryOptions,
      enabled:
        bondId !== undefined &&
        status.value === ConnectionStatus.CONNECTED &&
        contracts.value.Core !== undefined,
    }))
  );

  return useQueries(queryKeys) as readonly QueryObserverResult<
    FetchBondResult,
    unknown
  >[];
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
export const useBondListQueryWithCurrency = (
  bondIds: number[] | Ref<number[]>
) => {
  const bondQueries = useBondListQuery(bondIds);
  const currencyIds = computed(() =>
    bondQueries.map((q) => q.data?.currencyRef)
  );
  const currencyQueries = useCurrencyListQuery(currencyIds);

  return { bonds: bondQueries, currencies: currencyQueries };
};
