import { shallowRef, watchEffect } from "vue";
import { ethers } from "ethers";

import { provider, signer } from "@/composables/web3";
import { Core, LBondManager, addresses } from "@mfigurski80/bond-token";

const contracts = shallowRef({} as { [key: string]: ethers.Contract });

watchEffect(() => {
  if (!provider.value) return;
  const pr = provider.value;
  const a = Object.values(addresses).find(
    (v) => v.id === +window.ethereum?.networkVersion
  );
  if (!a || !a.Core || !a.LBondManager) {
    contracts.value = {};
    return;
  }

  console.groupCollapsed("Loading contracts");
  console.log("USING CORE AT", a.Core);
  console.log("USING LBONDMANAGER AT", a.LBondManager);
  console.log("USING PROVIDER::", pr);
  if (signer.value) console.log("WITH SIGNER::", { ...signer.value });
  console.groupEnd();

  contracts.value = {
    Core: new ethers.Contract(a.Core, Core.abi, signer.value ?? pr),
    LBondManager: new ethers.Contract(
      a.LBondManager,
      LBondManager.abi,
      pr // no signer needed for lib
    ),
  };
});

export const useContracts = () => {
  return {
    contracts,
  };
};
