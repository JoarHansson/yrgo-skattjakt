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
import missionData from "../missions.json";
import MissionPopup from "./missionPopup";
import { useToast } from "@/components/ui/use-toast";

interface MessagePopupProps {
  congratsMessage: string;
  description: string;
  storyline: string;
  name: string;
  characterImage: string;
  icon: string;
  onClose: () => void;
}

interface PopupContentProps extends MessagePopupProps {
  type: "marker" | "mission";
}

function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function MapComponent() {
  const [userLocation, setUserLocation] = useState<{
    longitude: number;
    latitude: number;
  } | null>(null);
  const [goldCounter, setGoldCounter] = useState(0);
  const [finishedMarkers, setFinishedMarkers] = useState<number[]>([]);
  const [finishedMissions, setFinishedMissions] = useState<number[]>([]);
  const [clickableMissions, setClickableMissions] = useState<number[]>([]);
  const [clickableMarkers, setClickableMarkers] = useState<number[]>([]);
  const geoControlRef = useRef<mapboxgl.GeolocateControl>(null);
  const markerRef = useRef<mapboxgl.Marker>(null);
  const missionRef = useRef<mapboxgl.Marker>(null);
  const [missionDataState, setMissionData] = useState(missionData);
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupContent, setPopupContent] = useState<PopupContentProps | null>(
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
    const shuffledMissions = shuffleArray([...missionData]);
    const newMissions = missionData.map((mission, index) => ({
      ...mission,
      congratsMessage: shuffledMissions[index].congratsMessage,
      description: shuffledMissions[index].description,
      storyline: shuffledMissions[index].storyline,
      name: shuffledMissions[index].name,
      characterImage: shuffledMissions[index].characterImage,
      icon: shuffledMissions[index].icon,
    }));
    setMissionData(newMissions);
  }, []);

  useEffect(() => {
    console.log("Mission Data:", missionDataState);
  }, [missionDataState]);

  useEffect(() => {
    console.log(`Gold Counter: ${goldCounter}`);
  }, [goldCounter]);

  useEffect(() => {
    if (userLocation) {
      console.log("User Location:", userLocation);

      const newClickableMarkers = markersData
        .map((marker) => {
          const from = point([userLocation.longitude, userLocation.latitude]);
          const to = point([marker.longitude, marker.latitude]);
          const dist = distance(from, to, { units: "meters" });
          return dist < 1000 ? marker.id : -1; // Adjust the distance threshold as needed (100 meters)
        })
        .filter((id) => id !== -1);
      setClickableMarkers(newClickableMarkers);

      const newClickableMissions = missionDataState
        .map((mission) => {
          const from = point([userLocation.longitude, userLocation.latitude]);
          const to = point([mission.longitude, mission.latitude]);
          const dist = distance(from, to, { units: "meters" });
          console.log(`Distance to mission ${mission.id}:`, dist);
          return dist < 1000 ? mission.id : -1; // Adjust the distance threshold as needed (100 meters)
        })
        .filter((id) => id !== -1);
      setClickableMissions(newClickableMissions);
    }
  }, [userLocation]);

  useEffect(() => {
    console.log("Clickable Missions:", clickableMissions);
    console.log("Clickable markers:", clickableMarkers);
  }, [clickableMissions, clickableMarkers]);

  const handleMarkerClick = (markerId: number) => {
    if (!finishedMarkers.includes(markerId)) {
      setFinishedMarkers((prevFinishedMarkers) => [
        ...prevFinishedMarkers,
        markerId,
      ]);
    }
  };

  const handleMissionClick = (missionId: number) => {
    if (!finishedMissions.includes(missionId)) {
      setFinishedMissions((prevFinishedMissions) => [
        ...prevFinishedMissions,
        missionId,
      ]);
    }
  };

  const { toast } = useToast();

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
          <div className="z-30" key={marker.id}>
            <Marker
              longitude={marker.longitude}
              latitude={marker.latitude}
              className="z-40"
              ref={markerRef}
            >
              {finishedMarkers.includes(marker.id) && (
                <QuestionMark
                  className="stroke-green-500 scale-150 z-50"
                  onClick={() => {
                    console.log(`${marker.name} clicked`);
                    toast({
                      description: "Denna plats har du redan utforskat!",
                    });
                  }}
                />
              )}
              {clickableMarkers.includes(marker.id) &&
                !finishedMarkers.includes(marker.id) && (
                  <QuestionMark
                    className="stroke-blue-500 scale-150 z-50"
                    onClick={() => {
                      console.log(`${marker.name} clicked`);
                      setPopupVisible(true);
                      setPopupContent({
                        description: marker.description,
                        storyline: marker.storyline,
                        congratsMessage: marker.congratsMessage,
                        name: marker.name,
                        characterImage: marker.image,
                        icon: marker.icon,
                        onClose: () => {
                          setPopupVisible(false);
                          handleMarkerClick(marker.id);
                          incrementGoldCounter();
                        },
                        type: "marker",
                      });
                    }}
                  />
                )}
              {!clickableMarkers.includes(marker.id) &&
                !finishedMarkers.includes(marker.id) && (
                  <QuestionMark
                    className="stroke-slate-50 scale-150 z-50"
                    onClick={() => {
                      console.log(`${marker.name} clicked`);
                      toast({
                        description: "Du måste komma närmare!",
                      });
                    }}
                  />
                )}
            </Marker>
          </div>
        ))}
        {missionDataState.map((mission) => (
          <div className="z-30" key={mission.id}>
            <Marker
              longitude={mission.longitude}
              latitude={mission.latitude}
              className="z-40"
              ref={missionRef}
            >
              {finishedMissions.includes(mission.id) && (
                <QuestionMark
                  className="stroke-green-500 scale-150 z-50"
                  onClick={() => {
                    console.log(`${mission.name} clicked`);
                    toast({
                      description: "Denna plats har du redan utforskat!",
                    });
                  }}
                />
              )}
              {clickableMissions.includes(mission.id) &&
                !finishedMissions.includes(mission.id) && (
                  <QuestionMark
                    className="stroke-blue-500 scale-150 z-50"
                    onClick={() => {
                      console.log(`${mission.name} clicked`);
                      setPopupVisible(true);
                      setPopupContent({
                        congratsMessage: mission.congratsMessage,
                        description: mission.description,
                        storyline: mission.storyline,
                        name: mission.name,
                        characterImage: mission.image,
                        icon: mission.icon,
                        onClose: () => {
                          setPopupVisible(false);
                          handleMissionClick(mission.id);
                          incrementGoldCounter();
                        },
                        type: "mission",
                      });
                    }}
                  />
                )}
              {!clickableMissions.includes(mission.id) &&
                !finishedMissions.includes(mission.id) && (
                  <QuestionMark
                    className="stroke-slate-50 scale-150 z-50"
                    onClick={() => {
                      console.log(`${mission.name} clicked`);
                      toast({
                        description: "Du måste komma närmare!",
                      });
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
          {popupContent.type === "marker" ? (
            <MessagePopup
              congratsMessage={popupContent.congratsMessage}
              storyline={popupContent.storyline}
              description={popupContent.description}
              name={popupContent.name}
              characterImage={popupContent.characterImage}
              icon={popupContent.icon}
              onClose={popupContent.onClose}
            />
          ) : (
            <MissionPopup
              congratsMessage={popupContent.congratsMessage}
              storyline={popupContent.storyline}
              description={popupContent.description}
              name={popupContent.name}
              characterImage={popupContent.characterImage}
              icon={popupContent.icon}
              onClose={popupContent.onClose}
            />
          )}
        </div>
      )}
    </>
  );
}

export default MapComponent;
