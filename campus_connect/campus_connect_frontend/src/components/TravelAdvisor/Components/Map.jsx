import { React, useMemo } from "react";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";

const MapDisplay = ({ LocationLoLa }) => {
  const center = useMemo(() => ({ lat: 33.7531, lng: -84.385388 }), []);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyA1KlBCcWM309cHr_YGgaMj6Fenhu680Jk",
  });
  if (!isLoaded) return <div>Loading...</div>;
  const mapContainerStyle = {
    width: "100%",
    height: "100vh",
  };
  return (
    <GoogleMap zoom={18} center={center} mapContainerStyle={mapContainerStyle}>
      <MarkerF position={center} />
      {LocationLoLa.map((location, index) => {
        return (
          <MarkerF
            key={index}
            position={{ lat: location.lat, lng: location.lon }}
          />
        );
      })}
    </GoogleMap>
  );
};

export default MapDisplay;
