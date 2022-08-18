import { ref, reactive, watch, readonly, onMounted, onUnmounted } from "vue";
import { ethers, providers } from "ethers";

import { PromiseWithTimeout } from "@/utils";
import { Core, LBondManager, addresses } from "@mfigurski80/bond-token";

export enum ConnectionStatus {
  NEED_PROVIDER,
  DISCONNECTED,
  CONNECTING,
  CONNECTED,
}

const handleAccountsChanged = () => {
  window.location.reload();
};

const _status = ref<ConnectionStatus>(ConnectionStatus.DISCONNECTED);
const _provider = ref<providers.Web3Provider | null>(null);
const _signer = ref<providers.JsonRpcSigner | null>(null);
const _wallet = ref<string | null>(null);

export const status = readonly(_status);
export const provider = readonly(_provider);
export const signer = readonly(_signer);
export const wallet = readonly(_wallet);

export const connect = async function (byUser = true) {
  // Check if web3 is available
  if (!window.ethereum) {
    alert("No web3 detected. Please install MetaMask.");
    _status.value = ConnectionStatus.NEED_PROVIDER;
    return;
  }
  // If it is, set the provider
  if (!_provider.value)
    _provider.value = new ethers.providers.Web3Provider(window.ethereum, "any");

  // wait for user to confirm connection
  if (byUser) {
    _status.value = ConnectionStatus.CONNECTING;
    await _provider.value.send("eth_requestAccounts", []);
  }

  _signer.value = _provider.value.getSigner();
  if (signer.value === undefined) {
    _status.value = ConnectionStatus.DISCONNECTED;
    return;
  }
  const address = await PromiseWithTimeout(
    _signer.value.getAddress(),
    1000
  ).catch((err) => {
    _status.value = ConnectionStatus.DISCONNECTED;
    throw err;
  });
  _wallet.value = address;
  _status.value = ConnectionStatus.CONNECTED;
  window.ethereum
    .removeListener("accountsChanged", handleAccountsChanged)
    .on("accountsChanged", handleAccountsChanged);
};

const contracts = reactive({} as { [key: string]: ethers.Contract });

watch(
  signer,
  (newSigner) => {
    // if (!newSigner) return;
    console.log("CREATING NEW CONTRACTS WITH SIGNER", newSigner);
    const a = Object.values(addresses).find(
      (v) => v.id === window.ethereum?.networkVersion
    );
    if (!a || !a.Core || !a.LBondManager) return;
    contracts.Core = new ethers.Contract(a.Core, Core, newSigner || undefined);
    contracts.LBondManager = new ethers.Contract(
      a.LBondManager,
      LBondManager,
      newSigner || undefined
    );
  },
  { immediate: true }
);

export const useWeb3 = () => {
  onMounted(() => {
    if (_status.value !== ConnectionStatus.DISCONNECTED) return;
    connect(false).catch(() => {
      return;
    });
  });

  onUnmounted(() => {
    window.ethereum?.removeListener("accountsChanged", handleAccountsChanged);
  });
  return { status, provider, signer, wallet, connect, contracts };
};
