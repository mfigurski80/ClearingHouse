export function PromiseWithTimeout<T>(
  promise: Promise<T>,
  timeout: number
): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_res, rej) =>
      window.setTimeout(() => {
        rej("Timed out");
      }, timeout)
    ),
  ]);
}
