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

type HexNumber = { _hex: string; _isBigNumber: boolean };
type FetchBondResponse = {
  flag: boolean;
  currencyRef: number;
  nPeriods: number;
  curPeriod: number;
  couponSize: HexNumber;
  faceValue: HexNumber;
  startTime: HexNumber;
  periodDuration: HexNumber;
  minter: address;
  beneficiary: address;
};
export type FetchBondResult = RawBond & { owner: address };

export const fetchBond = async (
  core: ethers.Contract,
  ctx: QueryFunctionContext
): Promise<FetchBondResult> => {
  counter("bond");
  console.log("Fetching bond", ctx.queryKey);
  const id = ctx.queryKey.slice(-1)[0] as number;
  const bondResp = (await core.getBond(id)) as FetchBondResponse;
  console.log("BOND", bondResp);
  const owner = (await core.ownerOf(id)) as address;
  console.log("OWNER", owner);
  return {
    id,
    flag: bondResp.flag,
    currencyRef: bondResp.currencyRef,
    nPeriods: bondResp.nPeriods,
    curPeriod: bondResp.curPeriod,
    couponSize: parseInt(bondResp.couponSize._hex, 16),
    faceValue: parseInt(bondResp.faceValue._hex, 16),
    startTime: parseInt(bondResp.startTime._hex, 16),
    periodDuration: parseInt(bondResp.periodDuration._hex, 16),
    minter: bondResp.minter,
    beneficiary: bondResp.beneficiary,
    owner: owner,
  };
};

// USE BOND QUERIES HOOKS

const queryOptions = {
  refetchOnWindowFocus: false,
  cacheTime: 1000 * 60 * 5,
  staleTime: 1000 * 60 * 5,
  retry: false,
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
        bondId !== undefined &&
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

  const queryKeys = computed(() =>
    ((bondIds as Ref<number[]>).value || bondIds).map((bondId) => ({
      queryKey: ["bond", bondId],
      queryFn: (ctx: QueryFunctionContext) =>
        fetchBond(contracts.value.Core, ctx),
      ...queryOptions,
      ...options,
      enabled:
        bondId !== undefined &&
        status.value === ConnectionStatus.CONNECTED &&
        (options?.enabled ?? true),
    }))
  );

  return useQueries(queryKeys) as readonly QueryObserverResult<
    FetchBondResult,
    unknown
  >[];
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
