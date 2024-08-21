"use client";

import "mapbox-gl/dist/mapbox-gl.css";
import { useRef, useState, useEffect } from "react";
import Map, { GeolocateControl, Marker } from "react-map-gl";
import { point } from "@turf/helpers";
import distance from "@turf/distance";
import markersData from "../markers.json";
import MessagePopup from "./messagePopup";

import pirate from "@/content/img.png";

interface MessagePopupProps {
  description: string;
  name: string;
  image: string;
  onClose: () => void;
}

function MapComponent() {
  const [userLocation, setUserLocation] = useState<{
    longitude: number;
    latitude: number;
  } | null>(null);

  const [clickableMarkers, setClickableMarkers] = useState<number[]>([]);
  const geoControlRef = useRef<mapboxgl.GeolocateControl>(null);
  const markerRef = useRef<mapboxgl.Marker>(null);

  const [popupVisible, setPopupVisible] = useState(false);
  const [popupContent, setPopupContent] = useState<MessagePopupProps | null>(
    null
  );

  const getUserCoordinates = () => {
    const position = geoControlRef.current?.on("geolocate", (e) => {
      const lon = e.coords.longitude;
      const lat = e.coords.latitude;
      const position = [lon, lat];
      console.log(position);

      setUserLocation({
        longitude: e.coords.longitude,
        latitude: e.coords.latitude,
      });
    });
  };

  useEffect(() => {
    if (userLocation) {
      const newClickableMarkers = markersData
        .map((marker, index) => {
          const from = point([userLocation.longitude, userLocation.latitude]);
          const to = point([marker.longitude, marker.latitude]);
          const dist = distance(from, to, { units: "meters" });
          return dist < 100 ? index : -1; // Adjust the distance threshold as needed (100 meters)
        })
        .filter((index) => index !== -1);
      setClickableMarkers(newClickableMarkers);
    }
  }, [userLocation]);

  return (
    <>
      <div
        style={{
          position: "absolute",
          top: "1rem",
          left: "1rem",
          zIndex: 100,
          color: "white",
        }}
      >
        lon: {userLocation?.longitude} <br />
        lat: {userLocation?.latitude}
      </div>
      <Map
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        initialViewState={{
          longitude: 11.936156,
          latitude: 57.705973,
          zoom: 17,
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
        {markersData.map((marker, index) => (
          <Marker
            key={index}
            longitude={marker.longitude}
            latitude={marker.latitude}
            color={clickableMarkers.includes(index) ? "blue" : "gray"}
            onClick={() => {
              if (clickableMarkers.includes(index)) {
                console.log(`Marker ${index} clicked`);
                setPopupContent({
                  description: marker.description,
                  name: marker.name,
                  image: marker.image,
                  onClose: () => {
                    setPopupVisible(false);
                  },
                });
                setPopupVisible(true);
              }
            }}
            ref={markerRef}
          />
        ))}
      </Map>
      {popupVisible && popupContent && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 200,
          }}
        >
          <MessagePopup
            description={popupContent.description}
            name={popupContent.name}
            image={popupContent.image}
            onClose={() => {
              setPopupVisible(false);
            }}
          />
        </div>
      )}
    </>
  );
}

export default MapComponent;
