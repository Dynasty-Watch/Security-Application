import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonSpinner,
} from "@ionic/react";
import React, { useRef, useEffect } from "react";
import GoogleMapReact from "google-map-react";
const mapKey = "AIzaSyD2QU_op6CGlNb5OjFKoVbCIGvbWCmFaNY";

const MyMap = (props: any) => {
  const center = {
    lat: 12.934485599999999,
    lng: 77.6192336,
  };

  return (
    <>
      <IonPage id="main">
        <IonHeader>
          <IonToolbar color="dark">
            <IonButtons slot="start">
              <IonMenuButton></IonMenuButton>
            </IonButtons>
            <IonTitle slot="start">Map Geolocation</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <div className="GEoMap">
            <GoogleMapReact
              bootstrapURLKeys={{
                key: "AIzaSyD2QU_op6CGlNb5OjFKoVbCIGvbWCmFaNY",
              }}
              defaultCenter={center}
              defaultZoom={16}
            >
              <AnyReactComponent />
            </GoogleMapReact>
          </div>
        </IonContent>
      </IonPage>
    </>
  );
};

const AnyReactComponent = () => (
  <div
    style={{
      color: "white",
      background: "red",
      padding: "10px",
      display: "inline-flex",
      textAlign: "center",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "100%",
      transform: "translate(-80%, -100%)",
    }}
  >
    <div className="pointer"></div>
  </div>
);

export default MyMap;
