"use client";

import "mapbox-gl/dist/mapbox-gl.css";
import { useRef, useState, useEffect, useContext } from "react";
import { UserContext } from "@/app/user-settings-provider";
import Map, { GeolocateControl, Marker } from "react-map-gl";
import { point } from "@turf/helpers";
import distance from "@turf/distance";
import markersData from "../markers.json";
import KarlatornetData from "@/karlatornet.json";
import MessagePopup from "../components/messagePopup";
import Header from "./header";
import missionData from "../missions.json";
import MissionPopup from "./missionPopup";
import { useToast } from "@/components/ui/use-toast";
import KarlatornetLight from "@/content/tower_light.png";
import KarlatornetPopup from "../components/karlatornetPopup";
import QuestionMarkWhite from "@/content/map_qmark_white.png"; // unreachable pin
import QuestionMarkGreen from "@/content/map_qmark_green.png"; // reachable pin
import Flag from "@/content/map_flag.png"; // completed pin

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
  type: "marker" | "mission" | "Karlatornet";
}

function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function MapComponent() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error(" must be used within a UserSettingsProvider");
  }
  const { userSettings, setUserSettings } = context;
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
    if (userLocation) {
      console.log("User Location:", userLocation);

      const newClickableMarkers = markersData
        .map((marker) => {
          const from = point([userLocation.longitude, userLocation.latitude]);
          const to = point([marker.longitude, marker.latitude]);
          const dist = distance(from, to, { units: "meters" });
          return dist < 20 ? marker.id : -1; // Avstånd på storyline markers
        })
        .filter((id) => id !== -1);
      setClickableMarkers(newClickableMarkers);

      const newClickableMissions = missionDataState
        .map((mission) => {
          const from = point([userLocation.longitude, userLocation.latitude]);
          const to = point([mission.longitude, mission.latitude]);
          const dist = distance(from, to, { units: "meters" });
          console.log(`Distance to mission ${mission.id}:`, dist);
          return dist < 20 ? mission.id : -1; // Avstånd på missions
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

  const isKarlatornetClickable = () => {
    if (userSettings.energy === 4) {
      return true;
    } else false;
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
                <img
                  src={Flag.src}
                  className="w-16 h-16"
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
                  <img
                    src={QuestionMarkGreen.src}
                    className="w-16 h-16"
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
                        },
                        type: "marker",
                      });
                    }}
                  />
                )}

              {!clickableMarkers.includes(marker.id) &&
                !finishedMarkers.includes(marker.id) && (
                  <img
                    src={QuestionMarkWhite.src}
                    className="w-16 h-16"
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
                <img
                  src={Flag.src}
                  className="w-16 h-16"
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
                  <img
                    src={QuestionMarkGreen.src}
                    className="w-16 h-16"
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
                        },
                        type: "mission",
                      });
                    }}
                  />
                )}

              {!clickableMissions.includes(mission.id) &&
                !finishedMissions.includes(mission.id) && (
                  <img
                    src={QuestionMarkWhite.src}
                    className="w-16 h-16"
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

        <Marker
          longitude={KarlatornetData[0].longitude}
          latitude={KarlatornetData[0].latitude}
          className="z-40"
          ref={markerRef}
        >
          <img
            src={KarlatornetLight.src}
            width={100}
            alt={KarlatornetData[0].name}
            className="custom-marker-image"
            onClick={() => {
              if (isKarlatornetClickable()) {
                setPopupVisible(true);
                setPopupContent({
                  description: KarlatornetData[0].description,
                  storyline: KarlatornetData[0].storyline,
                  congratsMessage: KarlatornetData[0].congratsMessage,
                  name: KarlatornetData[0].name,
                  characterImage: KarlatornetData[0].image,
                  icon: KarlatornetData[0].icon,
                  onClose: () => {
                    setPopupVisible(false);
                    handleMarkerClick(KarlatornetData[0].id);
                  },
                  type: "Karlatornet",
                });
              } else {
                toast({
                  description:
                    "Du måste fortsätta samla Pirat-energi innan du närmar dig Karlatornet",
                });
              }
            }}
          />
        </Marker>
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
          ) : popupContent.type === "mission" ? (
            <MissionPopup
              congratsMessage={popupContent.congratsMessage}
              storyline={popupContent.storyline}
              description={popupContent.description}
              name={popupContent.name}
              characterImage={popupContent.characterImage}
              icon={popupContent.icon}
              onClose={popupContent.onClose}
            />
          ) : popupContent.type === "Karlatornet" ? (
            <KarlatornetPopup
              congratsMessage={popupContent.congratsMessage}
              storyline={popupContent.storyline}
              description={popupContent.description}
              name={popupContent.name}
              characterImage={popupContent.characterImage}
              icon={popupContent.icon}
              onClose={popupContent.onClose}
            />
          ) : null}
        </div>
      )}
    </>
  );
}

export default MapComponent;
