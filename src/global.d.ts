export {};

declare global {
  interface Window {
    // ethereum: import("ethers").providers.ExternalProvider;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ethereum: any;
  }
}
