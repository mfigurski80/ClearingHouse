import type { ethers } from "ethers";

export type TransactionResult = {
  tx: ethers.ContractTransaction;
  receipt: ethers.ContractReceipt;
};

export const sendMintBond = async (
  core: ethers.Contract,
  alpha: string,
  beta: string
): Promise<TransactionResult> => {
  const tx: ethers.ContractTransaction = await core.mintBond(alpha, beta);
  console.log("SENT TRANSACTION", tx);
  const receipt = await tx.wait();
  return { tx, receipt };
};
