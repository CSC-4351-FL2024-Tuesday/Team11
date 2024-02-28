import React, { useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
const containerStyle = {
  width: '100%',
  height: '100%'
};

function MyComponent(props) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
  })

  const [map, setMap] = React.useState(null)
  const [currentPosition, setCurrentPosition] = useState(null);

  const onLoad = useCallback(function callback(map) {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setCurrentPosition({ lat: latitude, lng: longitude });
        map.setCenter({ lat: latitude, lng: longitude });
      },
      error => console.error(error)
    );
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback() {
    setMap(null);
  }, []);


  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={currentPosition || { lat: -3.745, lng: -38.523 }} // Default to a position if current location is not available
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
      {props.markers.map((marker, index) => (
        <Marker
          key={index}
          position={{ lat: marker.lat, lng: marker.lng }}
        />
      ))}
        <></>
      </GoogleMap>
  ) : <></>
}

export default MyComponent;
