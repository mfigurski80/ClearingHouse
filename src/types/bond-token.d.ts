interface AddressRecord {
  id: number;
  Core?: string;
  LBondManager?: string;
  [key: string]: string;
}
interface AddressRecords {
  [key: string]: AddressRecord;
}
interface ContractRecord {
  abi: string;
}

declare module "@mfigurski80/bond-token" {
  // import { ContractInterface } from "ethers";
  export const Core: ContractRecord;
  export const LBondManager: ContractRecord;
  export const addresses: AddressRecords;
  export const getAddressesFor: (id: number) => AddressRecord;
}
