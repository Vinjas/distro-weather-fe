import { Request } from '@services/request';

export class OpenMeteoService extends Request {
  ENDPOINT = {
    SOLAR_RADIATION_HOURLY: 'https://api.open-meteo.com/v1/forecast?latitude=:latitude&longitude=:longitude&hourly=direct_radiation,diffuse_radiation&start_date=:startDate&end_date=:endDate',
    SOLAR_RADIATION_SUM: 'https://api.open-meteo.com/v1/forecast?latitude=:latitude&longitude=:longitude&daily=shortwave_radiation_sum&start_date=:startDate&end_date=:endDate'
  };

  /**
   * Generate the URL for the request.
   * 
   * @param {string} endpoint - The endpoint to use.
   * @param {object} params - The parameters for the request.
   * @param {string} params.latitude - The latitude of the location.
   * @param {string} params.longitude - The longitude of the location.
   * @param {string} params.startDate - The start date of the period.
   * @param {string} params.endDate - The end date of the period.
   * @returns {string} The URL for the request.
   */
  generateUrl(endpoint, params) {
    const { latitude, longitude, startDate, endDate } = params;
    
    return endpoint
      .replace(':latitude', latitude)
      .replace(':longitude', longitude)
      .replace(':startDate', startDate)
      .replace(':endDate', endDate);
  }

  /**
   * Get the daily solar radiation sum for a given period.
   *
   * @param {object} params - The parameters for the request.
   * @returns {Promise<object>} A Promise that resolves to the solar radiation hourly data.
   */
  async getSolarRadiationHourlyData(params) {
    const url = this.generateUrl(this.ENDPOINT.SOLAR_RADIATION_HOURLY, params);

    return this.http
      .get(url)
      .then(({ data }) => data || {});
  }

  /**
   * Get the daily solar radiation sum for a given period.
   * 
   * @param {object} params - The parameters for the request.
   * @returns {Promise<object>} A Promise that resolves to the solar radiation sum data.
   */
  async getSolarRadiationSumData(params) {
    const url = this.generateUrl(this.ENDPOINT.SOLAR_RADIATION_SUM, params);

    return this.http
      .get(url)
      .then(({ data }) => data || {});
  }
}

export const openMeteoService = new OpenMeteoService();