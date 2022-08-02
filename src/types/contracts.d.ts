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
