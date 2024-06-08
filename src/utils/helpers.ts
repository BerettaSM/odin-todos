/**
 *
 * @param max The max number to generate (exclusive).
 * @returns A random number between 0 and max.
 */
export function getRandomNumber(max: number): number;
/**
 *
 * @param min The min number to generate (inclusive).
 * @param max The max number to generate (exclusive).
 * @returns A random number between min and max.
 */
export function getRandomNumber(min: number, max: number): number;
export function getRandomNumber(min: number, max?: number): number {
  if (max === undefined) [min, max] = [0, min];
  return min + Math.floor(Math.random() * (max - min));
}

/**
 *
 * @param arr An array from which to pick a random element.
 * @returns A random element from the array.
 * @throws If the array is empty.
 */
export function randomChoice<T>(arr: T[]) {
  if (arr.length === 0) {
    throw new Error("Can't pick a choice from an empty array.");
  }
  const randomIndex = getRandomNumber(arr.length);
  return arr[randomIndex];
}
