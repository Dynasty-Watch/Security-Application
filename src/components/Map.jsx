import React, { useState, useRef, useEffect } from "react";
import { useIonModal, useIonViewWillEnter } from '@ionic/react';
import { GoogleMap } from "@capacitor/google-maps";
import { markers } from "../data";
import { MarkerInfoWindow } from "../components/MarkerInfoWindow";

const Map = () => {
    let newMap;
    const key = "AIzaSyAIB2cC62_gWE8woaK9xqoKDjoLSht_5zQ";
    const mapRef = useRef(null);

    const [selectedMarker, setSelectedMarker] = useState(null);
    const [present, dismiss] = useIonModal(MarkerInfoWindow, { marker: selectedMarker, });
    const [mapConfig, setMapConfig] = useState({
        zoom: 12,
        center: {
            lat: markers[0].lat,
            lng: markers[0].lng,
        },
    });

    const addMapMarkers = () => markers.forEach((marker) => addMapMarker(marker));
    useIonViewWillEnter(() => createMap());;

    const modalOptions = {
        initialBreakpoint: 0.4,
        breakpoints: [0, 0.4],
        backdropBreakpoint: 0,
        onDidDismiss: () => dismiss(),
    };

    //marker event
    const markerClick = (marker) => {
        setSelectedMarker(
            markers.filter(
                (m) => m.lat === marker.latitude && m.lng === marker.longitude
            )[0]
        );
        present(modalOptions);
    };

    // Add markers to map
    const addMapMarker = async (marker) => {
        await newMap.addMarker({
            coordinate: {
                lat: marker.lat,
                lng: marker.lng,
            },
            title: marker.title,
        });
    };

    // map
    const createMap = async () => {
        if (!mapRef.current) return;

        newMap = await GoogleMap.create({
            id: "google-map",
            element: mapRef.current,
            apiKey: key,
            config: mapConfig,
        });

        newMap.setOnMarkerClickListener((marker) => markerClick(marker));
        addMapMarkers();
    };

    return (
        <capacitor-google-map ref={mapRef} id="map" style={{
            display: 'inline-block',
            // width: '100%',
            // height: '100%',
            // position : 'absolute'
        }}></capacitor-google-map >
    );
}

export default Map;