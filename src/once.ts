export function once<T extends (...args: any) => any>(
  fn: T,
): (...args: Parameters<T>) => ReturnType<T> {
  const init = {};
  let result = init;
  return (...args) => {
    if (result !== init) {
      return result;
    }
    return (result = fn(...args));
  };
}
