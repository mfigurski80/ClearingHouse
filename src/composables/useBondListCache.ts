import { reactive, watch } from "vue";
import { z } from "zod";

const BOND_LIST_CACHE_KEY = "__relatedBondList__";
const s = z.object({
  owned: z.array(z.number()), // bond ids you own and/or are beneficiary of
  minted: z.array(z.number()), // bond ids you minted
});
export type BondListCache = z.infer<typeof s>;
const defaultValue: BondListCache = {
  owned: [],
  minted: [],
};

export default function useBondListCache() {
  const read = localStorage.getItem(BOND_LIST_CACHE_KEY);
  const initialValue = read ? s.parse(JSON.parse(read)) : defaultValue;
  s.parse(initialValue);

  const cache = reactive(initialValue);

  watch(cache, (val) => {
    // s.parse(val);
    localStorage.setItem(BOND_LIST_CACHE_KEY, JSON.stringify(val));
  });

  return cache;
}
