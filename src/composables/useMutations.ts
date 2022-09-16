import { useMutation, UseMutationOptions } from "vue-query";

import { useContracts } from "@/composables/contracts";
import { wallet } from "@/composables/web3";
import { fetchBondFormat, FormattedBond } from "@/queries/chainQueries";
import { sendMintBond, TransactionResult } from "@/queries/chainMutations";
import type { RawMintBond } from "@/types";

export const useBondMintMutation = (
  args?: UseMutationOptions<TransactionResult, unknown, RawMintBond, undefined>,
  withFormat?: (fmt: FormattedBond) => undefined
) => {
  const { contracts } = useContracts();

  return useMutation(
    async (bond: RawMintBond) => {
      const fmt = await fetchBondFormat(contracts.value.LBondManager, {
        ...bond,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        minter: bond.minter ?? wallet.value!,
      });
      // console.log("FORMAT", fmt);
      withFormat && (await withFormat(fmt));
      return sendMintBond(contracts.value.Core, fmt[0], fmt[1]);
    },
    { ...args }
  );
};
