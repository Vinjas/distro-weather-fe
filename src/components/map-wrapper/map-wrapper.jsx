import MapGL from 'react-map-gl';
import Geocoder from "react-map-gl-geocoder";
import { useRef, useCallback } from 'react';
import { useSolarSearch } from '@contexts/solar-search-context';
import './map-wrapper.scss';

export function MapWrapper() {
  const mapBoxToken = import.meta.env.VITE_MAP_BOX_TOKEN;
  const mapRef = useRef();

  const { currentSolarViewport, setCurrentSolarViewPort } = useSolarSearch();

  const handleViewportChange = useCallback(
    (newViewport) => setCurrentSolarViewPort(newViewport),
    []
  );

  const handleGeocoderViewportChange = useCallback(
    (newViewport) => {
      const geocoderDefaultOverrides = { transitionDuration: 500 };

      return handleViewportChange({
        ...newViewport,
        ...geocoderDefaultOverrides
      });
    },
    [ handleViewportChange ]
  );

  return (
    <div className='map-wrapper'>
      <MapGL
          ref={mapRef}
          {...currentSolarViewport}
          width="100%"
          height="347px"
          onViewportChange={handleViewportChange}
          mapStyle="mapbox://styles/mapbox/streets-v9"
          mapboxAccessToken={mapBoxToken}
          mapboxApiAccessToken={mapBoxToken}
      >
        <Geocoder
            mapRef={mapRef}
            onViewportChange={handleGeocoderViewportChange}
            mapboxApiAccessToken={mapBoxToken}
            position="top-left"
        />
      </MapGL>
    </div>
  )
}