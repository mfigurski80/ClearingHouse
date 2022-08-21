import { computed, Ref } from "vue";
import { useQuery, useQueries, UseQueryOptions } from "vue-query";
import type {
  QueryFunctionContext,
  QueryObserverResult,
} from "vue-query/types";
import type { ethers } from "ethers";

import { useWeb3, ConnectionStatus } from "@/composables/web3";
import { useContracts } from "@/composables/contracts";
import { useCurrencyListQuery } from "@/composables/currencyQueries";
import type { RawBond, address } from "@/types";
import { counter } from "@/utils";

// import { fetchBond as fetchTestBond } from "@/queries/testChainQueries";

export type FetchBondResult = RawBond & { owner: address };

export const fetchBond = async (
  core: ethers.Contract,
  ctx: QueryFunctionContext
): Promise<FetchBondResult> => {
  counter("bond");
  console.log("Fetching bond", ctx.queryKey);
  const id = ctx.queryKey.slice(-1)[0] as number;
  const bond = (await core.getBond(id)) as FetchBondResult;
  console.log("BOND", bond);
  const owner = (await core.ownerOf.call(id)) as address;
  console.log("OWNER", owner);
  bond.owner = owner;
  return bond;
};

// USE BOND QUERIES HOOKS

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
  const { status } = useWeb3();
  const { contracts } = useContracts();

  return useQuery(
    ["bond", (bondId as Ref<number>).value || (bondId as number)],
    (ctx) => fetchBond(contracts.value.Core, ctx),
    {
      ...queryOptions,
      enabled:
        !!bondId &&
        status.value === ConnectionStatus.CONNECTED &&
        (options?.enabled ?? true),
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
  const { status } = useWeb3();
  const { contracts } = useContracts();
  console.log(
    "Use bond list query. Enabled:",
    true
    // status.value === ConnectionStatus.CONNECTED
  );
  return useQueries(
    ((bondIds as Ref<number[]>).value || bondIds).map((bondId) => ({
      queryKey: ["bond", bondId],
      queryFn: (ctx: QueryFunctionContext) =>
        fetchBond(contracts.value.Core, ctx),
      ...queryOptions,
      ...options,
      enabled:
        bondId !== undefined &&
        // status.value === ConnectionStatus.CONNECTED &&
        (options?.enabled ?? true),
    }))
  ) as readonly QueryObserverResult<FetchBondResult, unknown>[];
};

/**
 * Use this hook to fetch a list of bonds with corresponding currency data
 * @param bondIds Ids of bonds to maintain state on
 * @param options Additional options to pass to useQueries
 * @returns UseQuery Results for each bondId
 */
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
