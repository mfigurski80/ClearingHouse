import { shallowRef, watchEffect } from "vue";
import { ethers } from "ethers";

import { provider, signer } from "@/composables/web3";
import { Core, LBondManager, addresses } from "@mfigurski80/bond-token";

const contracts = shallowRef({} as { [key: string]: ethers.Contract });

watchEffect(() => {
  if (!provider.value) return {};
  const a = Object.values(addresses).find(
    (v) => v.id === +window.ethereum?.networkVersion
  );
  if (!a || !a.Core || !a.LBondManager) return;

  console.groupCollapsed("Loading contracts");
  console.log("USING CORE AT", a.Core);
  console.log("USING LBONDMANAGER AT", a.LBondManager);
  if (signer.value) console.log("WITH SIGNER:", { ...signer.value });
  console.groupEnd();

  contracts.value = {
    Core: new ethers.Contract(a.Core, Core.abi, signer.value ?? provider.value),
    LBondManager: new ethers.Contract(
      a.LBondManager,
      LBondManager.abi,
      signer.value ?? provider.value
    ),
  };
});

export const useContracts = () => {
  return {
    contracts,
  };
};
