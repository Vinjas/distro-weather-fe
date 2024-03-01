// FILEPATH: /Users/vinyadan/PROJECTS/distro-weather-fe/src/utils/date.test.js
import { dateConvertToISO } from '../../../src/utils/date';

describe('dateConvertToISO', () => {
  it('should correctly convert a JS Date to ISO format', () => {
    const testDate = new Date(2022, 0, 1); // January 1, 2022
    const expectedOutput = '2022-01-01';
    expect(dateConvertToISO(testDate)).toBe(expectedOutput);
  });

  it('should handle leap years correctly', () => {
    const testDate = new Date(2020, 1, 29); // February 29, 2020
    const expectedOutput = '2020-02-29';
    expect(dateConvertToISO(testDate)).toBe(expectedOutput);
  });
});
