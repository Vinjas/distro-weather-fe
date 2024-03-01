export const RQ_CONFIG = {
  defaultOptions: {
    queries: {
      retry: 0,
      retryDelay: 0, // 1 second
      staleTime: 60000, // 1 minute
      cacheTime: 600000, // 10 minutes
      refetchInterval: false, // no interval refetching by default
      refetchOnWindowFocus: false,
      refetchOnMount: true
    }
  }
};

export const RQ_KEY = {
  SOLAR_WEATHER: 'SOLAR_WEATHER'
};
