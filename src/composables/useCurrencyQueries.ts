import { computed, Ref } from "vue";
import { useQuery, useQueries } from "vue-query";

import { computeCacheKey, pullQueryCache, persistQueryResult } from "@/utils";
import { useWeb3, ConnectionStatus } from "@/composables/web3";
import { useContracts } from "@/composables/contracts";
import { fetchCurrency, FetchCurrencyResult } from "@/queries/chainQueries";
import { QueryFunctionContext } from "vue-query/types";
export { FetchCurrencyResult } from "@/queries/chainQueries";

// USEQUERY EXPORTS
const queryOptions = {
  cacheTime: Infinity, // keep forever
  staleTime: Infinity, // never refetch
  refetchOnWindowFocus: false, // no
  keepPreviousData: true, // keeeep
};

export const useCurrencyQuery = (currencyId: Ref<number | undefined>) => {
  const { status } = useWeb3();
  const { contracts } = useContracts();

  const enabled = computed(
    () =>
      currencyId.value !== undefined &&
      currencyId.value >= 0 &&
      !!contracts.value.Core &&
      status.value === ConnectionStatus.CONNECTED
  );
  const initialData = computed(
    () =>
      pullQueryCache<FetchCurrencyResult>(
        computeCacheKey(["currency", currencyId.value])
      )?.data
  );
  const initialDataUpdatedAt = computed(
    () =>
      pullQueryCache<FetchCurrencyResult>(
        computeCacheKey(["currency", currencyId.value])
      )?.updated
  );

  return useQuery(
    ["currency", currencyId],
    (ctx) =>
      persistQueryResult(
        fetchCurrency(contracts.value.Core, currencyId.value as number),
        computeCacheKey(ctx.queryKey)
      ),
    {
      ...queryOptions,
      enabled,
      initialData,
      initialDataUpdatedAt,
    }
  );
};

export const useCurrencyListQuery = (
  currencyIds: Ref<(number | undefined)[]>
) => {
  const { status } = useWeb3();
  const { contracts } = useContracts();

  const p = computed(() =>
    currencyIds.value.map((currencyId) => {
      const cacheKey = computeCacheKey(["currency", currencyId]);
      return {
        queryKey: ["currency", currencyId],
        queryFn: (ctx: QueryFunctionContext) =>
          persistQueryResult(
            fetchCurrency(contracts.value.Core, currencyId as number),
            computeCacheKey(ctx.queryKey)
          ),
        ...queryOptions,
        enabled:
          currencyId !== undefined &&
          !!contracts.value.Core &&
          status.value === ConnectionStatus.CONNECTED,
        initialData: pullQueryCache<FetchCurrencyResult>(cacheKey)?.data,
        initialDataUpdatedAt:
          pullQueryCache<FetchCurrencyResult>(cacheKey)?.updated,
      };
    })
  );

  return useQueries(p);
};
