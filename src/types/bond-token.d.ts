interface AddressRecord {
  id: number;
  Core?: string;
  LBondManager?: string;
  [key: string]: string;
}
interface AddressRecords {
  [key: string]: AddressRecord;
}

declare module "@mfigurski80/bond-token" {
  import { ContractInterface } from "ethers";
  export const Core: ContractInterface;
  export const LBondManager: ContractInterface;
  export const addresses: AddressRecords;
  export const getAddressesFor: (id: number) => AddressRecord;
}
