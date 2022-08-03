import { inject } from "vue";

export enum ConnectionStatus {
  NEED_PROVIDER,
  DISCONNECTED,
  CONNECTING,
  CONNECTED,
}

const useWeb3Provider = () => {
  const web3Data = inject("web3");
  return web3Data;
};
export default useWeb3Provider;
