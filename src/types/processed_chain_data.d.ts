// PROCESSED DATA TYPES
export interface Bond {
  id: number;
  active: boolean;
  currencyRef: number;
  currency?: Currency;
  mintTime: Date;
  startTime: Date;
  maturityTime: Date;
  periodDuration: number;
  periodsCompleted: number;
  periodsTotal: number;
  faceValue: number;
  couponSize: number;
  beneficiary: address;
  minter: address;
  owner: address;
  collateral?: Collateral[];
  approvedOperators: address[];
  isWalletAssociated: boolean;
}

export interface Currency {
  id: number;
  name: string;
  symbol: string;
  location: address;
  type: CurrencyType;
  erc1155TokenId?: number;
}

export interface Collateral {
  id: number;
  bondId: number;
  currency: Currency;
  amount?: number;
  nftId?: number;
}

export interface Event {
  completed: boolean;
  bondId: number;
  bond?: Bond;
  eventType: EventType;
  direction: Direction;
  timestamp: Date;
}
