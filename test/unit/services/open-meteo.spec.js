// FILEPATH: /Users/vinyadan/PROJECTS/distro-weather-fe/test/unit/services/open-meteo.spec.js
import { openMeteoService } from '../../../src/services/open-meteo';

const getSpy = jest.spyOn(openMeteoService.http, 'get').mockResolvedValue({ data: {} });

describe('OpenMeteoService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('generateUrl()', () => {
    const params = {
      latitude: '50.8503',
      longitude: '4.3517',
      startDate: '2022-01-01',
      endDate: '2022-01-31'
    };
    const expectedUrl = 'https://api.open-meteo.com/v1/forecast?latitude=50.8503&longitude=4.3517&hourly=direct_radiation,diffuse_radiation&start_date=2022-01-01&end_date=2022-01-31';
    expect(openMeteoService.generateUrl(openMeteoService.ENDPOINT.SOLAR_RADIATION_HOURLY, params)).toBe(expectedUrl);
  });

  it('getSolarRadiationHourlyData()', async () => {
    const payload = {
      latitude: 1, 
      longitude: 2, 
      startDate: 3, 
      endDate: 4
    };

    const url = "https://api.open-meteo.com/v1/forecast?latitude=1&longitude=2&hourly=direct_radiation,diffuse_radiation&start_date=3&end_date=4";

    await openMeteoService.getSolarRadiationHourlyData(payload);

    expect(getSpy).toHaveBeenCalledWith(url);
  });

  it('getSolarRadiationSumData()', async () => {
    const payload = {
      latitude: 1, 
      longitude: 2, 
      startDate: 3, 
      endDate: 4
    };

    const url = "https://api.open-meteo.com/v1/forecast?latitude=1&longitude=2&daily=shortwave_radiation_sum&start_date=3&end_date=4";

    await openMeteoService.getSolarRadiationSumData(payload);

    expect(getSpy).toHaveBeenCalledWith(url);
  });
});