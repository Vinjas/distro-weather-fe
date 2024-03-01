import { useState, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Header } from '@components/header/header';
import { Button } from '@components/button/button';
import { MapWrapper } from '@components/map-wrapper/map-wrapper';
import { DateRangePicker } from '@components/date-range-picker/date-range-picker';
import { SolarHourlyChart } from '@components/solar-hourly-chart/solar-hourly-chart';
import { SolarSumChart } from '@components/solar-sum-chart/solar-sum-chart';
import { useSolarSearch } from '@contexts/solar-search-context';
import { openMeteoService } from '@services/open-meteo';
import { Loader } from '@components/loader/loader';
import './solar-weather-container.scss';


export function SolarWeatherContainer() {
  const { t } = useTranslation();

  const chartRef = useRef(null);
  const { currentSolarViewport, currentStartDate, currentEndDate } = useSolarSearch();

  const [solarHourlyWeatherData, setSolarHourlyWeatherData] = useState(null);
  const [solarSumWeatherData, setSolarSumWeatherData] = useState(null);
  const [requestError, setRequestError] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  const payload = useMemo(() => ({
    latitude: currentSolarViewport.latitude.toFixed(2),
    longitude: currentSolarViewport.longitude.toFixed(2),
    startDate: currentStartDate,
    endDate: currentEndDate
  }), [
    currentSolarViewport.latitude,
    currentSolarViewport.longitude,
    currentStartDate,
    currentEndDate
  ]);

  async function handleSubmit() {
    setIsFetching(true);

    try {
      const [solarHourlyWeatherDataQuery, solarSumWeatherData] = await Promise.all([
        openMeteoService.getSolarRadiationHourlyData(payload),
        openMeteoService.getSolarRadiationSumData(payload)
      ]);
    
      setSolarHourlyWeatherData(solarHourlyWeatherDataQuery);
      setSolarSumWeatherData(solarSumWeatherData);

      setTimeout(function () {
        chartRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }, 2);

      setRequestError(null);
    } catch (error) {
      console.error('Error requesting data:', error);

      setRequestError(t('messages.error'));
    }

    setIsFetching(false);
  }

  return (
    <div className='solar-weather-container'>
      <Header />
      <div className='solar-weather-container__content'>
        <div className='heading-1 text-color-secondary'>
          {t('solar-weather.title')}
        </div>
        <div className='solar-weather-container__description text-color-secondary'>
          {t('solar-weather.description')}
        </div>
      </div>

      {
        (solarSumWeatherData && solarSumWeatherData) && (
          <div ref={chartRef} className='solar-weather-container__chart-wrapper'>
            <SolarHourlyChart weatherData={solarHourlyWeatherData} />
            <SolarSumChart weatherData={solarSumWeatherData} />
          </div>
        )  
      }
      
      <div className='solar-weather-container__box'>
        <div className='solar-weather-container__selection'>
          <div className='solar-weather-container__column'>
            <p className='solar-weather-container__label'>
              {t('solar-weather.select-date')}
            </p>
            <DateRangePicker />
          </div>
          <div className='solar-weather-container__column'>
            <p className='solar-weather-container__label'>
              {t('solar-weather.select-location')}
            </p>
            <MapWrapper />
          </div>
        </div>

        
          <Button onClick={handleSubmit} disabled={isFetching}>
              {!isFetching && t('button.calculate')}
              {(isFetching) && <Loader />}
          </Button>
      </div>

      {
        requestError && (
          <div className='solar-weather-container__error'>
            {requestError}
          </div>
        )
      }
    </div>

  )
}