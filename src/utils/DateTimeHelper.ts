/**
 * Converts unix time to date
 * @param unixUtc 
 * @returns date of unix time to date 
 */
export function convertUnixTimeToDate(unixUtc: number): Date {
  return new Date(unixUtc * 1000);
}