/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useMemo, useState } from 'react';

export const SolarSearchContext = createContext();

export function SolarSearchProvider(props) {
  const [currentSolarViewport, setCurrentSolarViewPort] = useState({
    latitude: 51.92444,
    longitude: 4.47775,
    zoom: 10,
    transitionDuration: 500,
  });
  
  const api = useMemo(() => ({
    currentSolarViewport,
    setCurrentSolarViewPort
  }), [
    currentSolarViewport
  ]);

  return <SolarSearchContext.Provider value={ api } { ...props } />;
}

export function useSolarSearch() {
  const context = useContext(SolarSearchContext);

  if (!context) {
    throw new Error('useSolarSearch must be used within a SolarSearchProvider');
  }

  return context;
}
