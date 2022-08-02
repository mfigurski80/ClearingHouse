import { ref, onMounted, onUnmounted } from "vue";
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

export const status = ref<ConnectionStatus>(ConnectionStatus.DISCONNECTED);
export const provider = ref<providers.Web3Provider | null>(null);
export const signer = ref<providers.JsonRpcSigner | null>(null);
export const wallet = ref<string | null>(null);

const useWeb3Provider = () => {
  async function connect(byUser = true) {
    // Check if web3 is available
    if (!window.ethereum) {
      alert("No web3 detected. Please install MetaMask.");
      status.value = ConnectionStatus.NEED_PROVIDER;
      return;
    }
    // If it is, set the provider
    if (!provider.value)
      provider.value = new ethers.providers.Web3Provider(
        window.ethereum,
        "any"
      );

    // wait for user to confirm connection
    if (byUser) {
      status.value = ConnectionStatus.CONNECTING;
      await provider.value.send("eth_requestAccounts", []);
    }

    signer.value = provider.value.getSigner();
    if (signer.value === undefined) {
      status.value = ConnectionStatus.DISCONNECTED;
      return;
    }
    const address = await PromiseWithTimeout(
      signer.value.getAddress(),
      1000
    ).catch((err) => {
      status.value = ConnectionStatus.DISCONNECTED;
      throw err;
    });
    wallet.value = address;
    status.value = ConnectionStatus.CONNECTED;
    provider.value
      .removeListener("accountsChanged", handleAccountsChanged)
      .on("accountsChanged", handleAccountsChanged);
  }

  onMounted(() => {
    if (status.value !== ConnectionStatus.DISCONNECTED) return;
    connect(false).catch(() => {
      return;
    });
  });

  onUnmounted(() => {
    window.ethereum?.removeListener("accountsChanged", handleAccountsChanged);
  });

  return { status, provider, signer, wallet, connect };
};
export default useWeb3Provider;
