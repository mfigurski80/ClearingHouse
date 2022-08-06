import { computed, watch } from "vue";

import { useBondListQuery, FetchBondResult } from "@/composables/bondQueries";
import {
  useCurrencyQuery,
  FetchCurrencyResult,
} from "@/composables/currencyQueries";
import { toReadableInterval, toRelativeDate } from "@/utils";

export enum BondStatus {
  PENDING = "PENDING",
  ACTIVE = "ACTIVE",
  FAILING = "FAILING",
  DEFAULT = "DEFAULT",
  COMPLETE = "COMPLETE",
}
export interface BondListingTableEntry {
  isLoading: boolean;
  isError: boolean;
  error: string;
  warning?: boolean;
  id: string;
  status?: BondStatus;
  currencySymbol?: string;
  couponSize?: number;
  faceValue?: number;
  periodInterval?: string;
  progress?: number;
  progressLabel?: string;
  nextDate?: string;
  nextOverdue?: boolean;
}

function formatBond(
  bond: FetchBondResult,
  currency?: FetchCurrencyResult
): BondListingTableEntry {
  if (currency && bond.currencyRef !== currency.id) {
    console.error("Wrong currency given");
    currency = undefined;
  }
  const nextDate = new Date(
    bond.startTime * 1000 + 1000 * bond.periodDuration * bond.curPeriod
  );
  const nextOverdue = nextDate < new Date();
  let status = BondStatus.PENDING;
  if (new Date(bond.startTime * 1000) < new Date()) {
    if (bond.flag) status = BondStatus.DEFAULT;
    else if (bond.curPeriod > bond.nPeriods) status = BondStatus.COMPLETE;
    else if (nextOverdue) status = BondStatus.FAILING;
    else status = BondStatus.ACTIVE;
  }
  return {
    isLoading: true,
    isError: true,
    error: "",
    warning: status === BondStatus.DEFAULT || status === BondStatus.FAILING,
    id: `#${bond.id}`,
    status: status,
    currencySymbol: currency?.symbol || "???",
    couponSize: bond.couponSize, // TODO: format
    faceValue: bond.faceValue, // TODO: format
    periodInterval: toReadableInterval(bond.periodDuration * 1000),
    progress: bond.curPeriod / bond.nPeriods,
    progressLabel: `${bond.curPeriod} / ${bond.nPeriods}`,
    nextDate: status === BondStatus.COMPLETE ? "---" : toRelativeDate(nextDate),
    nextOverdue: nextOverdue,
  };
}

export default function useSmallBondListing(bondIds: number[]) {
  const bondListQuery = useBondListQuery(bondIds);

  const bonds = computed(() =>
    bondListQuery.map((res, i) => {
      // console.log("MAPPING RES", { ...res });
      const queryState = {
        queryStatus: res.status,
        isSuccess: res.isSuccess,
        isLoading: res.isLoading,
        isError: res.isError,
        error: res.error,
        id: "#" + bondIds[i],
      } as BondListingTableEntry;
      const bond = res.data as FetchBondResult;
      if (!bond) {
        return queryState;
      }
      return { ...queryState, ...formatBond(bond) };
    })
  );

  watch(bonds, (res) => {
    console.log(
      "BOND LISTING UPDATED",
      res.map((v) => ({ ...v }))
    );
  });

  return bonds;
}
