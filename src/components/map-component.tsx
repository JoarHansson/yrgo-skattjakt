"use client";

import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef } from "react";
import Map, { GeolocateControl, Marker } from "react-map-gl";

function MapComponent() {
  const geoControlRef = useRef<mapboxgl.GeolocateControl | null>(null);

  useEffect(() => {
    // Activate as soon as the control is loaded
    // geoControlRef.current?.trigger();

    geoControlRef.current?.on("geolocate", (e) => {
      const lon = e.coords.longitude;
      const lat = e.coords.latitude;
      const position = [lon, lat];
      console.log(position);
    });
  }, [geoControlRef.current]);

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
          // onGeolocate={console.log("hej")}
        />
        <Marker
          longitude={11.936151}
          latitude={57.705979}
          color="red"
          // popup={popup}
          // ref={markerRef}
        />
      </Map>
    </>
  );
}

export default MapComponent;
