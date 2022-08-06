import { useQuery, useQueries, UseQueryOptions } from "vue-query";
import type { QueryFunctionContext } from "vue-query/types";

import type { RawBond, address } from "@/types";
import { counter } from "@/utils";

// FAKE DATA STORE

const TEST_RAW_BOND_DATA: { [key: number]: RawBond } = {
  13: {
    id: 13,
    flag: false,
    currencyRef: 1,
    nPeriods: 100,
    curPeriod: 101,
    periodDuration: 60 * 60 * 24,
    couponSize: 4 * 100,
    startTime: +new Date("2022-01-01T00:00:00.000Z") / 1000,
    faceValue: 230,
    beneficiary: "0x0000000000000000000000000000000000000000",
    minter: "0x2e7098b8eA74ed30dDF3d239f794385002dd3Ffe",
  },
  18: {
    id: 18,
    flag: false,
    currencyRef: 0,
    nPeriods: 100,
    curPeriod: 14,
    periodDuration: 60 * 60 * 24 * 7,
    couponSize: 10 * 10 ** 18,
    startTime: +new Date("2022-01-01T00:00:00.000Z") / 1000,
    faceValue: 100 * 10 ** 18,
    beneficiary: "0x0000000000000000000000000000000000000000",
    minter: "0x0000000000000000000000000000000000000000",
  },
  24: {
    id: 24,
    flag: false,
    currencyRef: 1,
    nPeriods: 200,
    curPeriod: 133,
    periodDuration: 60 * 60 * 24 * 10,
    couponSize: 4 * 100,
    startTime: +new Date("2022-01-01T00:00:00.000Z") / 1000,
    faceValue: 0,
    beneficiary: "0x0000000000000000000000000000000000000000",
    minter: "0x2e7098b8eA74ed30dDF3d239f794385002dd3Ffe",
  },
};

const TEST_RAW_OWNERSHIP_DATA: { [key: number]: address } = {
  13: "0x2e7098b8eA74ed30dDF3d239f794385002dd3Ffe",
  18: "0x2e7098b8eA74ed30dDF3d239f794385002dd3Ffe",
  24: "0x2e7098b8eA74ed30dDF3d239f794385002dd3Ffe",
};

// FETCH INDIVIDUAL RAW BOND

export type FetchBondResult = RawBond & { owner: address };
const fetchBond = async (
  ctx: QueryFunctionContext
): Promise<FetchBondResult> => {
  counter("bondFetches");
  const id: number = ctx.queryKey.slice(-1)[0] as number;
  await new Promise((resolve) => setTimeout(resolve, Math.random() * 1000 * 5));
  if (!(id in TEST_RAW_BOND_DATA)) console.error("Bond not found:", id);
  const bond = TEST_RAW_BOND_DATA[id];
  if (!(id in TEST_RAW_OWNERSHIP_DATA)) console.error("Owner not found:", id);
  // ensure source is immutable
  return { ...bond, owner: TEST_RAW_OWNERSHIP_DATA[id] };
};

// USEQUERY EXPORTS

export const useBondQuery = (
  bondId: number,
  options?: Omit<
    UseQueryOptions<unknown, unknown, unknown, (string | number)[]>,
    "queryFn" | "queryKey"
  >
) => {
  return useQuery(["bond", bondId], fetchBond, {
    refetchOnWindowFocus: false,
    ...options,
  });
};

export const useBondListQuery = (
  bondIds: number[],
  options?: Omit<
    UseQueryOptions<unknown, unknown, unknown, (string | number)[]>,
    "queryFn" | "queryKey"
  >
) => {
  return useQueries(
    bondIds.map((bondId) => ({
      queryKey: ["bond", bondId],
      queryFn: fetchBond,
      refetchOnWindowFocus: false,
      enabled: !!bondId,
      ...options,
    }))
  );
};

// FETCH RAW BOND WITH ASSOCIATED CURRENCY

// export type FetchBondCurrencyResult = FetchBondResult & FetchCurrencyResult;
// const fetchBondCurrency = async (ctx:any): Promise<FetchBondCurrencyResult>
