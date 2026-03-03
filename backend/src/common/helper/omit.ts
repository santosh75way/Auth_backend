export function omitKeys<T extends object, K extends keyof T>(
  obj: T,
  keys: readonly K[],
): Omit<T, K> {
  const copy = { ...obj } as T;

  for (const key of keys) {
    delete (copy as T & Record<K, T[K]>)[key];
  }

  return copy as Omit<T, K>;
}