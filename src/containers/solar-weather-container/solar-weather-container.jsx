import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import { RQ_KEY } from '@constants/react-query';
import { Header } from '@components/header/header';
import { Button } from '@components/button/button';
import { MapWrapper } from '@components/map-wrapper/map-wrapper';
import { DateRangePicker } from '@components/date-range-picker/date-range-picker';
import { useSolarSearch } from '@contexts/solar-search-context';
import { openMeteoService } from '@services/open-meteo';

import './solar-weather-container.scss';
import { useMemo } from 'react';
import { Loader } from '../../components/loader/loader';


export function SolarWeatherContainer() {
  const { t } = useTranslation();

  const { currentSolarViewport, currentStartDate, currentEndDate } = useSolarSearch();

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

  const { 
    isFetching,
    isLoading,
    data: weatherData,
    refetch: refetchWeatherData
  } = useQuery(
    [ RQ_KEY.SOLAR_WEATHER, currentSolarViewport, currentStartDate, currentEndDate],
    () => openMeteoService.getWeatherData(payload),
    {
      enabled: false,
      refetchOnWindowFocus: false,
    }
  );

  function handleSubmit() {
    refetchWeatherData();
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

        
          <Button onClick={handleSubmit} disabled={isFetching || isLoading}>
              {!isFetching && !isLoading && t('button.calculate')}
              {(isFetching || isLoading) && (
                <Loader />
              )}
          </Button>
      </div>
    </div>

  )
}