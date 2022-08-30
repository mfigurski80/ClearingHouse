// lol what, you may say. Why aren't these defined in related types files?
// Because typescript wants to remove all types present in .d.ts files
// in the compilation step. Therefore, assigning a number to an enum would
// result in a missing value: https://github.com/vuejs/vue-cli/issues/2132
// Usage is now: ```
// import type { Bond, Currency, Collateral } from "@/types";
// import { CurrencyType } from "@/types/enums";
// ```

export enum CurrencyType {
  ETHER = 0,
  ERC20 = 1,
  ERC721 = 2,
  ERC1155Token = 3,
  ERC1155NFT = 4,
}

export enum Direction {
  INCOMING,
  OUTGOING,
}
export enum EventType {
  SERVICE_PAYMENT,
  FACE_PAYMENT,
}

export enum Relationship {
  OWNER = "owner",
  MINTER = "minter",
  BENEFICIARY = "beneficiary",
  OPERATOR = "operator",
  NONE = "unrelated",
}
