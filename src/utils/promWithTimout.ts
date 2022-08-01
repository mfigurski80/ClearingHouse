export const PromiseWithTimeout = (promise: Promise<any>, timeout: number) => {
  return Promise.race([
    promise,
    new Promise((res, rej) =>
      window.setTimeout(() => {
        rej("Timed out");
      }, timeout)
    ),
  ]);
};
