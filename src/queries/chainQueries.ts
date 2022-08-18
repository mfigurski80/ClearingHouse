import type { QueryFunctionContext } from "vue-query/types";

import { useWeb3 } from "@/composables/web3";
import type { RawBond, address } from "@/types";
import { counter } from "@/utils";

const { contracts } = useWeb3();

export type FetchBondResult = RawBond & { owner: address };

export const fetchBond = async (ctx: QueryFunctionContext) => {
  counter("fetch bond");
  const id: number = ctx.queryKey.slice(-1)[0] as number;
  const bond = (await contracts.Core.getBond(id)) as FetchBondResult;
  const owner = (await contracts.Core.ownerOf(id)) as address;
  bond.owner = owner;
  return bond;
};
