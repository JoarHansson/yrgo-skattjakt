"use client";

import "mapbox-gl/dist/mapbox-gl.css";
import { useCallback, useEffect, useMemo, useRef } from "react";
import Map, { GeolocateControl, Marker } from "react-map-gl";
import mapboxgl from "mapbox-gl";

function MapComponent() {
  const geoControlRef = useRef<mapboxgl.GeolocateControl>(null);

  const getUserCoordinates = () => {
    geoControlRef.current?.on("geolocate", (e) => {
      const lon = e.coords.longitude;
      const lat = e.coords.latitude;
      const position = [lon, lat];
      console.log(position);
      alert(position); // for testing on mobile
    });
  };

  const markerRef = useRef<mapboxgl.Marker>(null);

  const popup = useMemo(() => {
    return new mapboxgl.Popup().setText("Hello world!");
  }, []);

  return (
    <>
      <Map
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        initialViewState={{
          longitude: 11.936156,
          latitude: 57.705973,
          zoom: 17,
          // maxZoom: 20,
        }}
        style={{ position: "absolute", top: 0, bottom: 0, width: "100%" }}
        mapStyle="mapbox://styles/mapbox/dark-v11"
      >
        <GeolocateControl
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation={true}
          ref={geoControlRef}
          onGeolocate={() => getUserCoordinates()}
          fitBoundsOptions={{ maxZoom: 17 }}
        />
        <Marker
          longitude={11.936151}
          latitude={57.705979}
          color="red"
          popup={popup}
          ref={markerRef}
        />
      </Map>
    </>
  );
}

export default MapComponent;
