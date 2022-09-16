import { RawCurrencyDetails } from "@/types";

export function toReadableNumber(n: number): string {
  const v = n
    .toPrecision(3)
    .replace(/\.?0+$/, "")
    .replace(/\.?0+(?=e)/, "");
  return v;
}

export function toCurrencyFormat(n: number, c: RawCurrencyDetails | undefined) {
  const v = c ? toReadableNumber(n / 10 ** c.decimals) : toReadableNumber(n);
  // console.log(`FORMATTING NUMBER: ${n} => ${v}`);
  return v;
}
