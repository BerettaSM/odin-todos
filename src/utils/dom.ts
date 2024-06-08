import { convertToDateTimeLocalString } from './helpers';

/**
 * This function updates the datetime-local input's value. Defaults to now,
 * unless an offset in hours is passed.
 *
 * @param input The datetime-local for which to update the value.
 * @param hoursOffset An optional hours offset to add into the date. Defaults to 0.
 * @throws If the input is not of type "datetime-local".
 */
export function updateLocalDateInput(
  input: HTMLInputElement,
  hoursOffset: number = 0,
): void {
  if (input.type !== 'datetime-local') {
    throw new Error(`Must be a "datetime-local" input.`);
  }
  const now = new Date();
  now.setHours(now.getHours() + hoursOffset);
  input.value = convertToDateTimeLocalString(now);
}
