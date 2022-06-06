import {
  IonCol,
  IonContent,
  IonHeader,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
  useIonModal,
  useIonViewWillEnter,
  IonTabs,
  IonTab,
  IonTabButton,
  IonMenu,
  IonList,
  IonListHeader,
  IonMenuToggle,
  IonIcon,
  IonItem,
  IonLabel
} from "@ionic/react";
import { globeOutline, heartOutline, locationOutline, navigateOutline, phonePortraitOutline, home } from "ionicons/icons";
import { useRef, useState } from "react";
import "./Home.css";

import { GoogleMap } from "@capacitor/google-maps";
import { markers } from "../data";
import { MarkerInfoWindow } from "../components/MarkerInfoWindow";

const Home = () => {
  // state and variables
  let newMap;
  const key = "AIzaSyAIB2cC62_gWE8woaK9xqoKDjoLSht_5zQ";
  const mapRef = useRef(null);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [present, dismiss] = useIonModal(MarkerInfoWindow, {marker: selectedMarker,});
  const [mapConfig, setMapConfig] = useState({
    zoom: 12,
    center: {
      lat: markers[0].lat,
      lng: markers[0].lng,
    },
  });

  const addMapMarkers = () => markers.forEach((marker) => addMapMarker(marker));
  useIonViewWillEnter(() => createMap());

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

  // markers
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
    <>
    <IonMenu side="start" contentId="main-content">
        <IonHeader>
          <IonToolbar color="primary">
            <IonTitle>Menu</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent>
          <IonList>
            <IonListHeader>
              Navigate
            </IonListHeader>
            <IonMenuToggle autoHide={false}>
              <IonItem button>
                <IonIcon slot="start" icon={home}></IonIcon>
                <IonLabel>
                  Home
                </IonLabel>
              </IonItem>
            </IonMenuToggle>
          </IonList>
        </IonContent>
        
      </IonMenu>
    <IonPage>
      

      <IonHeader>
        <IonToolbar>
          <IonTitle>Alerts</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Alerts</IonTitle>
          </IonToolbar>
        </IonHeader>
          <IonCol>
            <IonRow >
            <capacitor-google-map ref={mapRef} id="map" style={{
              display: 'inline-block',
              width: 310,
              height: 590
            }}></capacitor-google-map>
            </IonRow>
          </IonCol>
      </IonContent>
    </IonPage>
    </>
    
  );
};

export default Home;
