import { useTranslation } from 'react-i18next';
import { Header } from '@components/header/header';
import './solar-weather-container.scss';
import { Button } from '@components/button/button';

export function SolarWeatherContainer() {

  const { t } = useTranslation();
  
  function handleTestClick() {
    alert('Test button clicked');
  }

  return (
    <div className='solar-weather-container'>
      <Header />
      <div className='solar-weather-container__content'>
        <div className='heading-1 text-color-secondary'>
          {t('solar-weather.title')}
        </div>
      </div>

      <Button onClick={handleTestClick}>
        {t('button.calculate')}
      </Button>
      
    </div>

  )
}