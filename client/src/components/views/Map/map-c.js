import React, { useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';

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


  // return isLoaded ? (
  //     <GoogleMap
  //       mapContainerStyle={containerStyle}
  //       center={currentPosition || { lat: -3.745, lng: -38.523 }} // Default to a position if current location is not available
  //       zoom={10}
  //       onLoad={onLoad}
  //       onUnmount={onUnmount}
  //     >
  //     {props.markers.map((marker, index) => (
  //       <Marker
  //         key={index}
  //         position={{ lat: marker.lat, lng: marker.lng }}
  //       />
  //     ))}
  //       <></>
  //     </GoogleMap>
  // ) : <></>

  return isLoaded ? (
    <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <Map
        defaultCenter={currentPosition || { lat: 33.7531, lng:  -84.3853 }}
        defaultZoom={11}
        gestureHandling={'greedy'}
        disableDefaultUI={true}
        mapId={"ec4661b131a88a41"}
      >
        {props.markers.map((marker, index) => (

          <AdvancedMarker

            key={index}
            position={{ lat: marker.lat, lng: marker.lng }}>
            <Pin background={'#FBBC04'} glyphColor={'#000'} borderColor={'#000'} />
          </AdvancedMarker>
        ))}
        {props.event_markers.map((marker, index) => (

          <AdvancedMarker

            key={index}
            position={{ lat: marker.lat, lng: marker.lng }}>
            <Pin background={'red'} glyphColor={'#000'} borderColor={'#000'} />
          </AdvancedMarker>
        ))}
      </Map>
    </APIProvider>

  )

    : <></>
}
export default MyComponent;
