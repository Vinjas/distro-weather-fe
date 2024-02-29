import { Request } from '@services/request';

export class OpenMeteoService extends Request {
  ENDPOINT = {
    INTERVAL_DATA: 'https://api.open-meteo.com/v1/forecast?latitude=:latitude&longitude=:longitude&startDate=:startDate&end_date=:endDate',
  };

  /**
   * Retrieves the measurement set data for a specific model and ID, based on the provided measurement system.
   *
   * @param {string} modelNumber - The model number.
   * @param {string} id - The ID of the measurement set.
   * @param {MeasurementSystem} measurementSystem - The measurement system to use.
   * @returns {Promise<object>} A Promise that resolves to the measurement set data.
   */
  async getWeatherData(latitude, longitude, startDate, endDate) {
    const url = this.ENDPOINT.INTERVAL_DATA
      .replace(':latitude', latitude)
      .replace(':longitude', longitude)
      .replace(':startDate', startDate)
      .replace(':endDate', endDate);

    console.log('url :>> ', url);

    return this.http
      .get(url)
      .then(({ data }) => data || {});
  }
}

export const openMeteoService = new OpenMeteoService();