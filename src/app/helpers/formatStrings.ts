/**
 * Converts a string to title case.
 *
 * @param str - The string to convert.
 * @returns The converted string in title case.
 */
export function titleCase(str: string) {
  return str
    .toLowerCase()
    .split(' ')
    .map(function (word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
}
