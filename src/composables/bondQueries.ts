import { useQuery, useQueries, UseQueryOptions } from "vue-query";

import { RawBond, address } from "@/types";

const TEST_RAW_BOND_DATA: { [key: number]: RawBond } = {
  13: {
    id: 13,
    flag: false,
    currencyRef: 1,
    nPeriods: 100,
    curPeriod: 101,
    periodDuration: 60 * 60 * 24,
    couponSize: 4,
    startTime: +new Date("2022-01-01T00:00:00.000Z") / 1000,
    faceValue: 23,
    beneficiary: "0x0000000000000000000000000000000000000000",
    minter: "0x2e7098b8eA74ed30dDF3d239f794385002dd3Ffe",
  },
  18: {
    id: 18,
    flag: false,
    currencyRef: 0,
    nPeriods: 100,
    curPeriod: 14,
    periodDuration: 60 * 60 * 24,
    couponSize: 10,
    startTime: +new Date("2022-01-01T00:00:00.000Z") / 1000,
    faceValue: 100,
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
    couponSize: 4,
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

type FetchBondResult = RawBond & { owner: address };
const fetchBond = async (ctx: any): Promise<FetchBondResult> => {
  const id = ctx.queryKey[-1];
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const bond = TEST_RAW_BOND_DATA[id];
  // ensure source is immutable
  return { ...bond, owner: TEST_RAW_OWNERSHIP_DATA[id] };
};

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
