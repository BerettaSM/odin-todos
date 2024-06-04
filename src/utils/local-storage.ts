/**
 *
 * @param key The key the payload is saved under.
 * @returns The found data of type T if found, null otherwise.
 */
export function findOnLocalStorage<T>(key: string): T | null {
  const found = localStorage.getItem(key);
  if (!found) {
    return null;
  }
  return JSON.parse(found) as T;
}

/**
 *
 * @param key The key to save the payload under.
 * @param payload The data to be saved.
 */
export function saveOnLocalStorage(key: string, payload: unknown): void {
  localStorage.setItem(key, JSON.stringify(payload));
}
