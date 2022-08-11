// Remove references to this! only for debugging

type Counter = { [key: string]: number };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any).counter = {};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const w: Counter = (window as any).counter;
export function counter(key: string, n = 1) {
  if (!w[key]) w[key] = 0;
  w[key] += n;
}
