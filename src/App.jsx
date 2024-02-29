import { SolarWeatherContainer } from '@containers/solar-weather-container/solar-weather-container'
import { SolarSearchProvider } from '@contexts/solar-search-context'
import { QueryClient, QueryClientProvider } from 'react-query';
import { RQ_CONFIG } from '@constants/react-query';
import './App.scss'

const defaultQueryClient = new QueryClient(RQ_CONFIG);

function App() {
  return (
    <QueryClientProvider client={ defaultQueryClient }>
      <SolarSearchProvider>
        <SolarWeatherContainer />
      </SolarSearchProvider>
    </QueryClientProvider>
  )
}

export default App
