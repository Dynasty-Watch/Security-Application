/* eslint-disable no-undef */
/* eslint-disable eqeqeq */
/* eslint-disable new-parens */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from "react";
import { useIonModal, IonLoading ,IonButton, IonCol, IonContent, IonGrid, IonIcon, IonLabel, IonNote, IonRow } from '@ionic/react';
import { GoogleMap } from "@capacitor/google-maps";
import { markers } from "../data";
import { UseMarkers } from "../data";
import { supabase } from "../SupabaseClient";
import "./Map.css";
import { heartOutline, locationOutline, navigateOutline, phonePortraitOutline } from "ionicons/icons";
import {
    useJsApiLoader,
    GoogleMap as Rmap,
    Marker ,
    DirectionsRenderer,
  } from '@react-google-maps/api'
  import { Geolocation } from "@capacitor/geolocation";
  const libraries = ['places'];


const Map = () => {
    const [page, setPage] = useState(1);
     useEffect(() => {
        setPage(1);
      }, []);
      const [showLoading, setShowLoading] = useState(false);
    const MarkerInfoWindow = ({ marker, dismiss, page}) => {
       
        const handleClick = () =>{
            setPage(2);
            console.log("Clicked");
            setShowLoading(true)
            dismiss();
        }; 
        return (
            <IonContent key={marker.markerID}>
                <IonGrid className="ion-padding">
    
                    <IonRow className="ion-margin-bottom">
                        <IonCol size="12">
                            <IonLabel>
                                <h1>{marker.title}</h1>
                                <></>
                                <IonNote>{marker.Summary}</IonNote>
                            </IonLabel>
                        </IonCol>
                    </IonRow>
    
                    <IonRow className="ion-justify-content-start ion-align-items-center">
                        <IonCol size="2">
                            <IonIcon icon={locationOutline} color="primary" style={{ fontSize: "1.5rem" }} />
                        </IonCol>
    
                        <IonCol size="10">{marker.address}</IonCol>
                    </IonRow>
    
                    {/* <IonRow className="ion-justify-content-start ion-align-items-center">
                        <IonCol size="2">
                            <IonIcon icon={globeOutline} color="primary" style={{ fontSize: "1.5rem" }} />
                        </IonCol>
    
                        <IonCol size="10">{marker.website}</IonCol>
                    </IonRow> */}
    
                    <IonRow className="ion-justify-content-start ion-align-items-center">
                        <IonCol size="2">
                            <IonIcon icon={phonePortraitOutline} color="primary" style={{ fontSize: "1.5rem" }} />
                        </IonCol>
    
                        <IonCol size="10">{marker.phone}</IonCol>
                    </IonRow>
    
                    <IonRow>
                        <IonButton {...page} onClick={handleClick}>
                            <IonIcon icon={navigateOutline}/>&nbsp;
                            Navigate
                        </IonButton>
                    </IonRow>
                </IonGrid>
            </IonContent>
        );
    };
    
    let newMap;
    const key = "AIzaSyAIB2cC62_gWE8woaK9xqoKDjoLSht_5zQ";
    const mapRef = useRef(null);
    let requests;
    
   
    const [selectedMarker, setSelectedMarker] = useState(null);
    const [present, dismiss] = useIonModal(MarkerInfoWindow, { marker: selectedMarker, page: page, });

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
        setCpostion({
            lati : [marker].map(item => item.latitude),
         longi : [marker].map(item => item.longitude),
        });
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

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: "AIzaSyAsbwt4GElIq_C9duQZxcb2tiX3luBGuRo",
        libraries,
      });
      const [map, setMap] = useState(/** @type google.maps.Map */ (null))
  const [directionsResponse, setDirectionsResponse] = useState(null)
  const [distance, setDistance] = useState('')
  const [duration, setDuration] = useState('')
  const [cpostion, setCpostion] = useState({
    lati: 0,
    longi: 0,
  })
  const [ position,setPosition] = useState({
    latitude : 0,
    longitude: 0,
});

useEffect(() => {
    getLocation();
}, []);

const getLocation = async () => {
    await Geolocation.checkPermissions()
    .then(() => Geolocation.getCurrentPosition())
    .then((val) => {
        setPosition({
    
        latitude : val.coords.latitude,
        longitude : val.coords.longitude,
        });
        
    });
};
async function calculateRoute() {
    
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService()
    const results = await directionsService.route({
        origin: new google.maps.LatLng(position.latitude, position.longitude),
      destination: new google.maps.LatLng(cpostion.lati, cpostion.longi),
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    })
    
    setDirectionsResponse(results)
    setDistance(results.routes[0].legs[0].distance.text)
    setDuration(results.routes[0].legs[0].duration.text)
  };

    return (
        <div>
        { page == 1 && (
        <>
        <capacitor-google-map ref={mapRef} id="map" style={{
            display: 'inline-block',
            width: '300px',
            height: '570px',
            position: 'absolute'
        }}></capacitor-google-map >
        </>)} 

        
        
        {page == 2 && isLoaded && (
            <>
                    <div className="buttons">
            <IonButton type='submit' onClick={calculateRoute}>
              Calculate Route
            </IonButton> 
            <IonButton href="/home">Done</IonButton></div>
            <p>Distance: {distance} </p>
          <p>Duration: {duration} </p>
          <IonLoading isOpen={showLoading} onDidDismiss={()=> setShowLoading(false)} message={"Loading"} duration={5000}></IonLoading>
            <Rmap
          center={{
            lat: position.latitude,
            lng: position.longitude,
        }}
          zoom={15}
          mapContainerStyle={{ width: '90vw', height: '90vh' }}
          options={{
            mapTypeControl: false,
            fullscreenControl: false,
          }}
         
          onLoad={map => setMap(map)}
        >
          <Marker position={{
                                    lat: position.latitude,
                                    lng: position.longitude,
                            }}
                        />
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
        </Rmap>
           </>
        )}
        
        </div>
    );
}

export default Map;