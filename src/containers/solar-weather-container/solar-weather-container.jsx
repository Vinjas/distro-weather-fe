import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import { RQ_KEY } from '@constants/react-query';
import { Header } from '@components/header/header';
import { Button } from '@components/button/button';
import { MapWrapper } from '@components/map-wrapper/map-wrapper';
import { useSolarSearch } from '@contexts/solar-search-context';
import { openMeteoService } from '@services/open-meteo';

import './solar-weather-container.scss';


export function SolarWeatherContainer() {

  const { t } = useTranslation();

  const { currentSolarViewport, setCurrentSolarViewPort } = useSolarSearch();

  const { 
    isLoading: isLoadingResults, 
    data: weatherData,
    refetch: refetchWeatherData
  } = useQuery(
    [ RQ_KEY.SOLAR_WEATHER, currentSolarViewport ],
    () => openMeteoService.getWeatherData(),
    {
      enabled: false,
      refetchOnWindowFocus: false,
    }
  );

  function handleSubmit() {
    setCurrentSolarViewPort(123)
    refetchWeatherData();
  }

  console.log('weatherData :>> ', weatherData);

  return (
    <div className='solar-weather-container'>
      <Header />
      <div className='solar-weather-container__content'>
        <div className='heading-1 text-color-secondary'>
          {t('solar-weather.title')}
        </div>
      </div>

      <MapWrapper />

      <Button onClick={handleSubmit}>
        {t('button.calculate')}
      </Button>

      {isLoadingResults && (
        <div>
          {t('loading')}
        </div>
      )}
      
    </div>

  )
}