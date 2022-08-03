export type address = string;

export interface RawBond {
  owner?: address;
  isWalletApprovedOperator?: boolean;
  id: number;
  flag: boolean;
  currencyRef: number;
  nPeriods: number;
  curPeriod: number;
  startTime: number;
  periodDuration: number;
  couponSize: number;
  faceValue: number;
  beneficiary: address;
  minter: address;
}

export interface RawCurrency {
  id: number;
  location: address;
  type: CurrencyType;
  erc1155SmallTokenId: number;
  erc1155TokenId: number;
}

export interface RawCollateral {
  id: number;
  bondId: number;
  currencyRef: number;
  amountOrId: number;
}
