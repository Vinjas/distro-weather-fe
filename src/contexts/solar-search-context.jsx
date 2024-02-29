/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useMemo, useState } from 'react';
import { dateConvertToISO } from '@utils/date';

export const SolarSearchContext = createContext();

export function SolarSearchProvider(props) {
  const [currentSolarViewport, setCurrentSolarViewPort] = useState({
    latitude: 51.92,
    longitude: 4.47,
    zoom: 10,
    transitionDuration: 500,
  });
  const [currentStartDate, setCurrentStartDate] = useState(dateConvertToISO(new Date()));
  const [currentEndDate, setCurrentEndDate] = useState(dateConvertToISO(new Date()));

  const api = useMemo(() => ({
    currentSolarViewport,
    setCurrentSolarViewPort,
    currentStartDate,
    setCurrentStartDate,
    currentEndDate,
    setCurrentEndDate
  }), [
    currentSolarViewport,
    currentStartDate,
    currentEndDate
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
