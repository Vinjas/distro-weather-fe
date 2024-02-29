import { DateTime } from "luxon";

export function dateConvertToISO(date) {
  const originalDate = DateTime.fromJSDate(date);
  
  return originalDate.toFormat("yyyy-MM-dd");
}