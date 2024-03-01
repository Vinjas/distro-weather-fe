import PropTypes from 'prop-types'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { useTranslation } from 'react-i18next'
import { useMemo } from 'react';
import './solar-hourly-chart.scss';

export function SolarHourlyChart({ weatherData }) {
  const { t } = useTranslation();
  
  const directRadiation = useMemo(() => {
    if (!weatherData) return [];
    
    return weatherData?.hourly?.direct_radiation?.map((value, index) => ({
      x: index,
      y: value,
      name: weatherData.hourly.time[index]
    }));
  }
  , [weatherData]);

  const diffuseRadiation = useMemo(() => {
    if (!weatherData) return [];
    
    return weatherData?.hourly?.diffuse_radiation.map((value, index) => ({
      x: index,
      y: value,
      name: weatherData.hourly.time[index]
    }));
  }
  , [weatherData]);

  const options = {
    chart: {
      type: 'line',
      backgroundColor: 'white',
    },
    title: {
      text: t('chart.solar.title'),
      style: {
        color: '#15325B'
      }
    },
    /* xAxis: {
      categories: diffuseRadiation.map((point, index) => (index % 4 === 0 ? point.name : ''))
    }, */
    xAxis: {
      categories: diffuseRadiation.map((point) => {
        // Dividir la fecha y la hora y limitar la longitud de la fecha si es demasiado larga
        const datetime = new Date(point.name);
        const date = datetime.toLocaleDateString();
        const hour = datetime.toLocaleTimeString();

        return `${date} ${hour}`;
      }),
      minTickInterval: diffuseRadiation.length / 10,
    },
    yAxis: {
      title: {
        text: weatherData?.hourly_units?.direct_radiation
      }
    },
    series: [
      {
        name: t('chart.solar.solar-ghi'),
        data: directRadiation
      },
      {
        name: t('chart.solar.solar-dhi'),
        data: diffuseRadiation
      }
    ],
    colors: [ "#F89134", "#15325B"]
  }
  
  return (
    <div className='solar-hourly-chart'>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
      />
    </div>
  )
}

SolarHourlyChart.propTypes = {
  weatherData: PropTypes.object
}