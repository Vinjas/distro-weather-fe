import { SolarWeatherContainer } from '@containers/solar-weather-container/solar-weather-container'
import { SolarSearchProvider } from '@contexts/solar-search-context'
import './App.scss'


function App() {
  return (
    <SolarSearchProvider>
      <SolarWeatherContainer />
    </SolarSearchProvider>
  )
}

export default App
