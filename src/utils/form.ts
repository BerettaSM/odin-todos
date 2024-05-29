/**
 * This function whatever extracts
 * all data from the received form
 * by selecting and querying all
 * inputs inside the form, using
 * the inputs' "name" attribute.
 *
 * @param form The form to extract input from.
 * @returns A record of input names as keys and their values (either a string or a file).
 *
 */
export function extractFormData(form: HTMLFormElement) {
  const formData = new FormData(form);
  return [...formData.entries()].reduce(
    (data, [key, value]) => ((data[key] = value), data),
    {} as Record<string, FormDataEntryValue>,
  );
}
