import { DateTime } from "luxon";

/**
 * Helper function to convert date to ISO format
 * 
 * @param {Date} date
 * @returns {string} ISO date 
 */
export function dateConvertToISO(date) {
  const originalDate = DateTime.fromJSDate(date);
  
  return originalDate.toFormat("yyyy-MM-dd");
}