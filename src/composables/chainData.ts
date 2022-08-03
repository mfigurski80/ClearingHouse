import { reactive } from "vue";

import { Bond, Currency, Collateral } from "@/types";
import { CurrencyType } from "@/types/enums";

export type ChainData = {
  bonds: Bond[];
  currencies: Currency[];
  collateral: Collateral[];
};

const testData = reactive<ChainData>({
  bonds: [
    {
      id: 14,
      active: true,
      currencyRef: 1,
      mintTime: new Date("2022-01-01T00:00:00.000Z"),
      startTime: new Date("2022-01-01T00:00:00.000Z"),
      maturityTime: new Date("2023-01-01T00:00:00.000Z"),
      periodDuration: 60 * 60 * 24,
      periodsCompleted: 14,
      periodsTotal: 100,
      couponSize: 10,
      faceValue: 100,
      beneficiary: "0x0000000000000000000000000000000000000000",
      minter: "0x2e7098b8eA74ed30dDF3d239f794385002dd3Ffe",
      owner: "0x2e7098b8eA74ed30dDF3d239f794385002dd3Ffe",
      approvedOperators: [],
      isWalletAssociated: true,
    },
    {
      id: 18,
      active: true,
      currencyRef: 1,
      mintTime: new Date("2022-01-01T00:00:00.000Z"),
      startTime: new Date("2022-01-01T00:00:00.000Z"),
      maturityTime: new Date("2023-01-01T00:00:00.000Z"),
      periodDuration: 60 * 60 * 24,
      periodsCompleted: 14,
      periodsTotal: 100,
      couponSize: 10,
      faceValue: 100,
      beneficiary: "0x0000000000000000000000000000000000000000",
      minter: "0x2e7098b8eA74ed30dDF3d239f794385002dd3Ffe",
      owner: "0x2e7098b8eA74ed30dDF3d239f794385002dd3Ffe",
      approvedOperators: [],
      isWalletAssociated: true,
    },
    {
      id: 24,
      active: true,
      currencyRef: 1,
      mintTime: new Date("2022-01-01T00:00:00.000Z"),
      startTime: new Date("2022-01-01T00:00:00.000Z"),
      maturityTime: new Date("2023-01-01T00:00:00.000Z"),
      periodDuration: 60 * 60 * 24,
      periodsCompleted: 14,
      periodsTotal: 100,
      couponSize: 10,
      faceValue: 100,
      beneficiary: "0x0000000000000000000000000000000000000000",
      minter: "0x2e7098b8eA74ed30dDF3d239f794385002dd3Ffe",
      owner: "0x2e7098b8eA74ed30dDF3d239f794385002dd3Ffe",
      approvedOperators: [],
      isWalletAssociated: true,
    },
  ],
  currencies: [
    {
      id: 1,
      name: "GOLD",
      location: "0x1141d0b1e0f3bbea8f8f8f8f8f8f8f8f8f8f8f8f8f",
      type: CurrencyType.ERC20,
    },
  ],
  collateral: [],
});

export const useChainData = () => {
  return { chainData: testData };
};
