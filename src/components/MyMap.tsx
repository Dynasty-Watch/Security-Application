import React, { useRef, useEffect } from "react";
import { GoogleMap } from "@capacitor/google-maps";

const MyMap: React.FC = () => {
  const mapRef = useRef<HTMLElement>();
  let newMap: GoogleMap;

  useEffect(() => {
    createMap;
  });

  async function createMap() {
    if (!mapRef.current) return;

    newMap = await GoogleMap.create({
      id: "my-cool-map",
      element: mapRef.current,
      apiKey: "AIzaSyD2QU_op6CGlNb5OjFKoVbCIGvbWCmFaNY",
      config: {
        center: {
          lat: 33.6,
          lng: -117.9,
        },
        width: 200,
        height: 200,
        zoom: 8,
      },
    });
  }

  return (
    <capacitor-google-map
      ref={mapRef}
      style={{
        display: "inline-block",
        width: 275,
        height: 400,
      }}
    ></capacitor-google-map>
  );
};

export default MyMap;
