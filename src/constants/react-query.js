export const RQ_CONFIG = {
  defaultOptions: {
    queries: {
      retry: 0,
      staleTime: 1000,
      cacheTime: 1000,
      refetchOnWindowFocus: false,
      refetchInterval: false,
      refetchOnMount: true
    }
  }
};

export const RQ_KEY = {
  SOLAR_WEATHER: 'SOLAR_WEATHER'
};
