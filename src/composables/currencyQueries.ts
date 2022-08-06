import { useQuery, useQueries, UseQueryOptions } from "vue-query";

import type { RawCurrency, RawCurrencyDetails, address } from "@/types";
import { CurrencyType } from "@/types/enums";

const TEST_RAW_CURRENCY_DATA: { [key: number]: RawCurrency } = {
  0: {
    id: 0,
    location: "0x0000000000000000000000000000000000000000",
    type: CurrencyType.ETHER,
    erc1155SmallTokenId: 0,
    erc1155TokenId: 0,
  },
  1: {
    id: 1,
    location: "0x0000000000000000000000000000000000000001",
    type: CurrencyType.ERC20,
    erc1155SmallTokenId: 0,
    erc1155TokenId: 0,
  },
};

const TEST_RAW_CURRENCY_DETAILS_DATA: { [key: address]: RawCurrencyDetails } = {
  "0x0000000000000000000000000000000000000000": {
    location: "0x0000000000000000000000000000000000000000",
    name: "Ether",
    symbol: "ETH",
    decimals: 18,
  },
  "0x0000000000000000000000000000000000000001": {
    location: "0x0000000000000000000000000000000000000001",
    name: "Dai Stablecoin",
    symbol: "DAI",
    decimals: 2,
  },
};

type FetchCurrencyResult = RawCurrency & RawCurrencyDetails;
const fetchCurrency = async (id: number): Promise<FetchCurrencyResult> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  if (!(id in TEST_RAW_CURRENCY_DATA)) {
    throw new Error("Currency not found");
  }
  const cur = TEST_RAW_CURRENCY_DATA[id];
  if (!(cur.location in TEST_RAW_CURRENCY_DETAILS_DATA)) {
    throw new Error("Currency details not found");
  }
  // ensure source is immutable
  return { ...cur, ...TEST_RAW_CURRENCY_DETAILS_DATA[cur.location] };
};

export const useCurrencyQuery = (
  currencyId: number,
  options?: Omit<
    UseQueryOptions<unknown, unknown, unknown, (string | number)[]>,
    "queryFn" | "queryKey"
  >
) => {
  return useQuery(["currency", currencyId], () => fetchCurrency(currencyId), {
    cacheTime: 1000 * 60 * 60 * 24 * 365,
    refetchOnWindowFocus: false,
    ...options,
  });
};

export const useCurrencyListQuery = (
  currencyIds: number[],
  options?: Omit<
    UseQueryOptions<unknown, unknown, unknown, (string | number)[]>,
    "queryFn" | "queryKey"
  >
) => {
  return useQueries(
    currencyIds.map((currencyId) => ({
      queryKey: ["currency", currencyId],
      queryFn: () => fetchCurrency(currencyId),
      cacheTime: 1000 * 60 * 60 * 24 * 365,
      refetchOnWindowFocus: false,
      enabled: !!currencyId,
      ...options,
    }))
  );
};
