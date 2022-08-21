import { ref, readonly, shallowRef, onMounted, onUnmounted } from "vue";
import { ethers, providers } from "ethers";

import { PromiseWithTimeout } from "@/utils";

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
// const _provider = ref<providers.Web3Provider | null>(null);
const _signer = ref<providers.JsonRpcSigner | null>(null);
const _wallet = ref<string | null>(null);

export const status = readonly(_status);
export const provider = shallowRef<providers.Web3Provider | null>(null);
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
  if (!provider.value) {
    provider.value = new ethers.providers.Web3Provider(window.ethereum, "any");
  }

  // wait for user to confirm connection
  if (byUser) {
    _status.value = ConnectionStatus.CONNECTING;
    await provider.value.send("eth_requestAccounts", []);
  }

  _signer.value = provider.value.getSigner();
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

export const useWeb3 = () => {
  onMounted(() => {
    if (_status.value !== ConnectionStatus.DISCONNECTED) return;
    connect(false).catch((err) => {
      console.error("FAILED TO AUTO-CONNECT", err);
      return;
    });
  });

  onUnmounted(() => {
    window.ethereum?.removeListener("accountsChanged", handleAccountsChanged);
  });

  return { status, provider, signer, wallet, connect };
};
