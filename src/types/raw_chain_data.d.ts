import { CurrencyType } from "./enums";

// RAW DATA TYPES

export type address = string;

export interface RawBond {
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
  owner?: address;
  operators?: address[];
}

export interface RawMintBond {
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
  owner: address;
}

export interface WalletBondRelationship {
  wallet: address;
  owner: boolean;
  approvedOperator: boolean;
}

export interface RawCurrency {
  id: number;
  location: address;
  type: CurrencyType;
  erc1155SmallTokenId: number;
  erc1155TokenId: number;
}

export interface RawCurrencyDetails {
  location: address;
  name: string;
  symbol: string;
  decimals: number;
}

export interface RawCollateral {
  id: number;
  bondId: number;
  currencyRef: number;
  amountOrId: number;
}
