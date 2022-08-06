import { computed, Ref } from "vue";
import { useQuery, useQueries, UseQueryOptions } from "vue-query";
import type { QueryFunctionContext } from "vue-query/types";

import type { RawCurrency, RawCurrencyDetails, address } from "@/types";
import { CurrencyType } from "@/types/enums";
import { counter } from "@/utils";

// DATA STORE

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

// FETCH INDIVIDUAL RAW CURRENCY

export type FetchCurrencyResult = RawCurrency & RawCurrencyDetails;
const fetchCurrency = async (
  ctx: QueryFunctionContext
): Promise<FetchCurrencyResult> => {
  counter("queries");
  const id = ctx.queryKey.slice(-1)[0] as number;
  console.log("FETCHING CURRENCY", id);
  await new Promise((resolve) => setTimeout(resolve, Math.random() * 1000 * 3));
  if (!(id in TEST_RAW_CURRENCY_DATA)) console.error("Currency not found", id);
  const cur = TEST_RAW_CURRENCY_DATA[id];
  if (!(cur.location in TEST_RAW_CURRENCY_DETAILS_DATA))
    console.error("Currency details not found", cur.location);
  // ensure source is immutable
  return { ...cur, ...TEST_RAW_CURRENCY_DETAILS_DATA[cur.location] };
};

// USEQUERY EXPORTS

export const useCurrencyQuery = (
  currencyId: number,
  options?: Omit<
    UseQueryOptions<unknown, unknown, unknown, (string | number)[]>,
    "queryFn" | "queryKey"
  >
) => {
  return useQuery(["currency", currencyId], fetchCurrency, {
    cacheTime: 1000 * 60 * 60 * 24 * 365,
    refetchOnWindowFocus: false,
    ...options,
  });
};

export const useCurrencyListQuery = (
  currencyIds: number[] | Ref<number[]>,
  options?: Omit<
    UseQueryOptions<unknown, unknown, unknown, (string | number)[]>,
    "queryFn" | "queryKey"
  >
) => {
  const p = computed(() =>
    ((currencyIds as Ref<number[]>).value || (currencyIds as number[])).map(
      (currencyId) => {
        return {
          queryKey: ["currency", currencyId],
          queryFn: fetchCurrency,
          cacheTime: 1000 * 60 * 60 * 24 * 365,
          refetchOnWindowFocus: false,
          enabled: currencyId !== undefined,
          ...options,
        };
      }
    )
  );

  return useQueries(p);
};
