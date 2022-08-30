import React, { useState, useRef, useEffect } from "react";
import { useIonModal, useIonViewWillEnter } from '@ionic/react';
import { GoogleMap } from "@capacitor/google-maps";
import { markers } from "../data";
import { UseMarkers } from "../data";
import { supabase } from "../SupabaseClient";
import { MarkerInfoWindow } from "../components/MarkerInfoWindow";

const Map = () => {
    let newMap;
    const key = "AIzaSyAIB2cC62_gWE8woaK9xqoKDjoLSht_5zQ";
    const mapRef = useRef(null);
    let requests;

    const [selectedMarker, setSelectedMarker] = useState(null);
    const [present, dismiss] = useIonModal(MarkerInfoWindow, { marker: selectedMarker, });

    // config on render
    const [mapConfig, setMapConfig] = useState({
        zoom: 12,
        center: {
            lat: markers[0].lat,
            lng: markers[0].lng,
        },
    });

    // fetch requests from database
    useEffect(async () => {
        createMap();

        let { data: EmergencyRequest, error } = await supabase
            .from('EmergencyRequest')
            .select('*')
            .eq('Accepted', false)

        if (error) throw new (error.message)
        if (EmergencyRequest == null) throw new ("No Requests at the moment")

        console.log(EmergencyRequest)
        requests = EmergencyRequest;

        // add markers
        requests.forEach((location) => {
            newMap.addMarker({
                coordinate: {
                    lat: location.RequestLat,
                    lng: location.RequestLng
                },
                title: location.CrimeType
            });
        });

        newMap.setOnMarkerClickListener((requests) => markerClick(requests));
    }, [])

    //const addMapMarkers = () => markers.forEach((marker) => addMapMarker(marker));
    //useIonViewWillEnter(() => createMap());

    const modalOptions = {
        initialBreakpoint: 0.4,
        breakpoints: [0, 0.4],
        backdropBreakpoint: 0,
        onDidDismiss: () => dismiss(),
    };

    //marker event
    const markerClick = (marker) => {
        // setSelectedMarker(
        //     markers.filter(
        //         (m) => m.lat === marker.latitude && m.lng === marker.longitude
        //     )[0]
        // );
        setSelectedMarker(marker)
        console.log(marker)
        present(modalOptions);
    };

    // Add markers to map
    // const addMapMarker = async (marker) => {
    //     await newMap.addMarker({
    //         coordinate: {
    //             lat: marker.lat,
    //             lng: marker.lng,
    //         },
    //         title: marker.title,
    //     });


    // };

    // map
    const createMap = async () => {
        if (!mapRef.current) return;

        newMap = await GoogleMap.create({
            id: "google-map",
            element: mapRef.current,
            apiKey: key,
            config: mapConfig,
        });

        //newMap.setOnMarkerClickListener((marker) => markerClick(marker));
        //addMapMarkers();
    };

    return (
        <capacitor-google-map ref={mapRef} id="map" style={{
            display: 'inline-block',
            width: '300px',
            height: '570px',
            position: 'absolute'
        }}></capacitor-google-map >
    );
}

export default Map;