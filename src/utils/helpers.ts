/* eslint-disable  @typescript-eslint/no-explicit-any */

// See: https://dev.to/kevinluo201/set-value-of-datetime-local-input-field-3435
/**
 * This functions converts a date into a local date time string, which
 * is set to local time.
 *
 * @param date The date that will be used to generate the time string.
 * @returns A formatted time string.
 */
export function convertToDateTimeLocalString(date: Date) {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

/**
 * This functions creates a debounced version of the callback
 * passed in.
 *
 * @param callback The callback to be called after delay has passed.
 * @param delayMs The delay in milliseconds.
 * @returns A debounced version of the callback passed in.
 */
export function debounce<F extends (...args: any) => any>(
  callback: F,
  delayMs: number = 1000,
) {
  let eventId: NodeJS.Timeout;
  let timestamp = Infinity;

  return function debounced(...args: Parameters<F>) {
    if (Date.now() < timestamp + delayMs) clearTimeout(eventId);
    timestamp = Date.now();
    eventId = setTimeout(() => {
      callback(...args);
    }, delayMs);
  };
}

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

export function throttle<F extends (...args: any) => any>(func: F, ms = 1000) {
  // Get initial timestamp for function call
  let timestamp = getTimestamp();

  return function throttled(...args: Parameters<F>) {
    // Get current timestamp
    const now = getTimestamp();

    // Calculate difference
    if (now - timestamp < ms) {
      // If not enough time has elapsed, do nothing.
      return;
    }

    // Else call the throttled function.
    func(...args);

    // And update last function call timestamp
    timestamp = getTimestamp();
  };

  function getTimestamp() {
    return new Date().getTime();
  }
}
