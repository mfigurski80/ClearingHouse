import type { ethers } from "ethers";

import type {
  RawBond,
  RawMintBond,
  RawCurrency,
  RawCurrencyDetails,
  address,
} from "@/types";
import { CurrencyType } from "@/types/enums";
import { counter } from "@/utils";

type HexNumber = { _hex: string; _isBigNumber: boolean };
type FetchBondResponse = {
  flag: boolean;
  currencyRef: number;
  nPeriods: number;
  curPeriod: number;
  couponSize: HexNumber;
  faceValue: HexNumber;
  startTime: HexNumber;
  periodDuration: HexNumber;
  minter: address;
  beneficiary: address;
};
type FetchCurrencyResponse = {
  ERC1155Id: HexNumber;
  ERC1155SmallId: HexNumber;
  currencyType: CurrencyType;
  location: address;
};
export type FetchBondResult = RawBond & { owner: address };
export type FetchCurrencyResult = RawCurrency & RawCurrencyDetails;

export const fetchBond = async (
  core: ethers.Contract,
  id: number
): Promise<FetchBondResult> => {
  counter("bond");
  // console.log("Fetch Bond", id);
  const bondResp = (await core.getBond(id)) as FetchBondResponse;
  const owner = (await core.ownerOf(id)) as address;
  return {
    id,
    flag: bondResp.flag,
    currencyRef: bondResp.currencyRef,
    nPeriods: bondResp.nPeriods,
    curPeriod: bondResp.curPeriod,
    couponSize: parseInt(bondResp.couponSize._hex, 16),
    faceValue: parseInt(bondResp.faceValue._hex, 16),
    startTime: parseInt(bondResp.startTime._hex, 16),
    periodDuration: parseInt(bondResp.periodDuration._hex, 16),
    minter: bondResp.minter,
    beneficiary: bondResp.beneficiary,
    owner: owner,
  };
};

export const fetchCurrency = async (
  core: ethers.Contract,
  id: number
): Promise<FetchCurrencyResult> => {
  // const cache = localStorage.getItem(`currency-${id}`);
  // if (cache) {
  //   return JSON.parse(cache);
  // }
  counter("currency");

  const currencyResp = (await core.currencies(id)) as FetchCurrencyResponse;
  const currencyDetails = await fetchCurrencyDetails(
    core,
    currencyResp.location,
    currencyResp.currencyType
  );
  return {
    ...currencyDetails,
    id,
    erc1155SmallTokenId: parseInt(currencyResp.ERC1155SmallId._hex, 16),
    erc1155TokenId: parseInt(currencyResp.ERC1155Id._hex, 16),
    type: currencyResp.currencyType,
  };
  // localStorage.setItem(`currency-${id}`, JSON.stringify(result));
  // return result;
};

export const fetchCurrencyDetails = async (
  core: ethers.Contract,
  address: address,
  type: CurrencyType
): Promise<RawCurrencyDetails> => {
  // console.log("Fetch Currency Details", address, type);
  if (type === CurrencyType.ETHER)
    return {
      location: address,
      name: "Ether",
      symbol: "ETH",
      decimals: 18,
    };
  // TODO: fetch details for actual custom currencies
  else
    return {
      location: address,
      name: "--",
      symbol: "--",
      decimals: 0,
    };
};

export type FormattedBond = [string, string];
export const fetchBondFormat = async (
  manager: ethers.Contract,
  bond: RawMintBond
): Promise<[string, string]> => {
  console.log("Fetch Bond Format", bond, manager);
  return await Promise.all([
    manager.buildAlpha(
      bond.flag,
      bond.couponSize.toString(),
      bond.nPeriods,
      bond.curPeriod,
      bond.currencyRef,
      bond.beneficiary
    ),
    manager.buildBeta(
      bond.faceValue.toString(),
      bond.startTime,
      bond.periodDuration,
      bond.minter
    ),
  ]);
};
