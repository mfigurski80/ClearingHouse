import { computed, Ref } from "vue";
import { useQuery, useQueries } from "vue-query";

import { useWeb3, ConnectionStatus } from "@/composables/web3";
import { useContracts } from "@/composables/contracts";
import { fetchCurrency } from "@/queries/chainQueries";
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

  return useQuery(
    ["currency", currencyId],
    () => fetchCurrency(contracts.value.Core, currencyId.value as number),
    {
      ...queryOptions,
      enabled,
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
      return {
        queryKey: ["currency", currencyId],
        queryFn: () =>
          fetchCurrency(contracts.value.Core, currencyId as number),
        enabled:
          currencyId !== undefined &&
          !!contracts.value.Core &&
          status.value === ConnectionStatus.CONNECTED,
        ...queryOptions,
      };
    })
  );

  return useQueries(p);
};
