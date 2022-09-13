import { useMutation, UseMutationOptions } from "vue-query";

import { useContracts } from "@/composables/contracts";
import { sendMintBond, TransactionResult } from "@/queries/chainMutations";

export type BondMintMutationParameters = [string, string];

export const useBondMintMutation = (
  args: UseMutationOptions<
    TransactionResult,
    unknown,
    BondMintMutationParameters,
    undefined
  >
) => {
  const { contracts } = useContracts();

  return useMutation(
    (bond: BondMintMutationParameters) =>
      sendMintBond(contracts.value.Core, bond[0], bond[1]),
    { ...args }
  );
};
