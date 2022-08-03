import { reactive } from "vue";

import { RawBond } from "@/types";

export interface ChainData {
  bonds: RawBond[];
}

const testData = reactive<ChainData>({
  bonds: [
    {
      id: 14,
      flag: true,
      currencyRef: 1,
      nPeriods: 100,
      curPeriod: 14,
      startTime: new Date("2022-01-01T00:00:00.000Z").getTime() / 1000,
      periodDuration: 60 * 60 * 24,
      couponSize: 10,
      faceValue: 100,
      beneficiary: "0x0000000000000000000000000000000000000000",
      minter: "0x2e7098b8eA74ed30dDF3d239f794385002dd3Ffe",
    },
    {
      id: 17,
      flag: true,
      currencyRef: 1,
      nPeriods: 100,
      curPeriod: 14,
      startTime: new Date("2022-06-04T00:00:00.000Z").getTime() / 1000,
      periodDuration: 60 * 60 * 24,
      couponSize: 10,
      faceValue: 100,
      beneficiary: "0x0000000000000000000000000000000000000000",
      minter: "0x2e7098b8eA74ed30dDF3d239f794385002dd3Ffe",
    },
    {
      id: 24,
      flag: true,
      currencyRef: 1,
      nPeriods: 12,
      curPeriod: 3,
      startTime: new Date("2022-01-01T00:00:00.000Z").getTime() / 1000,
      periodDuration: 60 * 60 * 24 * 30,
      couponSize: 10,
      faceValue: 100,
      beneficiary: "0x2e7098b8eA74ed30dDF3d239f794385002dd3Ffe",
      minter: "0x0000000000000000000000000000000000000000",
    },
  ],
});

export const useChainData = () => {
  return { chainData: testData };
};
