import { shallowRef, watch } from "vue";
import { ethers } from "ethers";

import { provider } from "@/composables/web3";
import { Core, LBondManager, addresses } from "@mfigurski80/bond-token";

const contracts = shallowRef({} as { [key: string]: ethers.Contract });

watch(
  provider,
  (pr) => {
    if (!pr) return {};
    const _pr = pr;
    const a = Object.values(addresses).find(
      (v) => v.id === +window.ethereum?.networkVersion
    );
    if (!a || !a.Core || !a.LBondManager) return;

    console.groupCollapsed("Loading contracts");
    console.log("USING CORE AT", a.Core);
    console.log("USING LBONDMANAGER AT", a.LBondManager);
    console.groupEnd();

    contracts.value = {
      Core: new ethers.Contract(a.Core, Core.abi, _pr),
      LBondManager: new ethers.Contract(a.LBondManager, LBondManager.abi, _pr),
    };
    // console.log("BUILT CONTRACT OBJECTS FOR PROVIDER", { ..._pr });
    // console.log("CONTRACTS", contracts.value);
  },
  { immediate: true }
);

export const useContracts = () => {
  return {
    contracts,
  };
};
