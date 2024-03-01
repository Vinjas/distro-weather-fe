import PropTypes from 'prop-types'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { useTranslation } from 'react-i18next'
import { useMemo } from 'react';
import './solar-sum-chart.scss';

export function SolarSumChart({ weatherData }) {
  const { t } = useTranslation();
  
  const sumRadiation = useMemo(() => {
    if (!weatherData) return [];

    return weatherData?.daily?.shortwave_radiation_sum?.map((value, index) => ({
      x: index,
      y: value,
      name: weatherData.daily.time[index]
    }))
  }
  , [weatherData]);

  const options = {
    chart: {
      type: 'column',
      backgroundColor: 'white',
    },
    title: {
      text: t('chart.solar.title'),
      style: {
        color: '#15325B'
      }
    },
    xAxis: {
      categories: sumRadiation.map((point) => {
        const datetime = new Date(point.name);
        return datetime.toLocaleDateString();
      }),
      labels: {
        style: {
          whiteSpace: 'nowrap' // Evitar que se ajusten las etiquetas del eje x
        }
      }
    },
    yAxis: {
      title: {
        text: weatherData?.daily_units?.shortwave_radiation_sum
      }
    },
    series: [
      {
        name: t('chart.solar.solar-sum'),
        data: sumRadiation
      }
    ],
    colors: [ "#F89134", "#15325B"]
  }
  
  return (
    <div className='solar-sum-chart'>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
      />
    </div>
  )
}

SolarSumChart.propTypes = {
  weatherData: PropTypes.object
}