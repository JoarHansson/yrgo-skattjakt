"use client";

import "mapbox-gl/dist/mapbox-gl.css";
import { useRef, useState, useEffect } from "react";
import Map, { GeolocateControl, Marker } from "react-map-gl";
import { point } from "@turf/helpers";
import distance from "@turf/distance";
import markersData from "../markers.json";
import QuestionMark from "./svg/question-mark";
import MessagePopup from "./messagePopup";
import Header from "./header";
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

  const [goldCounter, setGoldCounter] = useState(0);

  const [clickableMarkers, setClickableMarkers] = useState<number[]>([]);
  const geoControlRef = useRef<mapboxgl.GeolocateControl>(null);
  const markerRef = useRef<mapboxgl.Marker>(null);

  const [popupVisible, setPopupVisible] = useState(false);
  const [popupContent, setPopupContent] = useState<MessagePopupProps | null>(
    null
  );

  const incrementGoldCounter = () => {
    setGoldCounter(goldCounter + 10);
  };

  const getUserCoordinates = () => {
    geoControlRef.current?.on("geolocate", (e) => {
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
    console.log(`Gold Counter: ${goldCounter}`);
  }, [goldCounter]);

  useEffect(() => {
    if (userLocation) {
      const newClickableMarkers = markersData
        .map((marker) => {
          const from = point([userLocation.longitude, userLocation.latitude]);
          const to = point([marker.longitude, marker.latitude]);
          const dist = distance(from, to, { units: "meters" });
          return dist < 1000 ? marker.id : -1; // Adjust the distance threshold as needed (100 meters)
        })
        .filter((id) => id !== -1);
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
        <Header goldCounter={goldCounter} />
        {/* lon: {userLocation?.longitude} <br />
        lat: {userLocation?.latitude} */}
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

        {markersData.map((marker) => (
          <div className="z-30">
            <Marker
              key={marker.id}
              longitude={marker.longitude}
              latitude={marker.latitude}
              className="z-40"
              ref={markerRef}
            >
              {clickableMarkers.includes(marker.id) ? (
                <QuestionMark
                  className="stroke-blue-500 scale-150 z-50"
                  onClick={() => {
                    console.log(`${marker.name} clicked`);

                    setPopupContent({
                      description: marker.description,
                      name: marker.name,
                      image: marker.image,
                      onClose: () => {
                        setPopupVisible(false);
                      },
                    });
                    setPopupVisible(true);
                  }}
                />
              ) : (
                <QuestionMark
                  className="stroke-slate-50 scale-150 z-50"
                  onClick={() => {
                    console.log(`${marker.name} clicked`);
                    alert("access denied. come closer.");
                  }}
                />
              )}
            </Marker>
          </div>
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
              incrementGoldCounter();
            }}
          />
        </div>
      )}
    </>
  );
}

export default MapComponent;
