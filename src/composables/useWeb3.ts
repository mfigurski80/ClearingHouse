import { ref, onMounted, onUnmounted } from "vue";
import { ethers, providers } from "ethers";

import { PromiseWithTimeout } from "@/utils/promWithTimout";

export enum ConnectionStatus {
  NEED_PROVIDER,
  DISCONNECTED,
  CONNECTING,
  CONNECTED,
}

const handleAccountsChanged = () => {
  window.location.reload();
};

const useWeb3Provider = () => {
  // Init all state
  const status = ref<ConnectionStatus>(ConnectionStatus.DISCONNECTED);
  const provider = ref<providers.Web3Provider | null>(null);
  const signer = ref<providers.JsonRpcSigner | null>(null);
  const wallet = ref<string | null>(null);

  const connect = async (askUser = true) => {
    // Check if web3 is available
    if (!window.ethereum) {
      alert("No web3 detected. Please install MetaMask.");
      status.value = ConnectionStatus.NEED_PROVIDER;
      return;
    }
    // If it is, set the provider
    status.value = ConnectionStatus.CONNECTING;
    if (!provider.value)
      provider.value = new ethers.providers.Web3Provider(
        window.ethereum,
        "any"
      );

    // wait for user to confirm connection
    if (askUser) await provider.value.send("eth_requestAccounts", []);

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
  };

  onMounted(() => {
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
