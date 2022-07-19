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
    IonLabel,
    IonApp,
    IonReactRouter,
    IonRouterOutlet,
    Route,
    Redirect,
    IonTabBar,
    IonButton
} from "@ionic/react";
import Map from "../components/Map";
import { supabase } from "../SupabaseClient";
import { UseMarkers } from "../data";
import { Geolocation } from "@capacitor/geolocation";
import React, { useState, useEffect } from "react";

const Tab1 = () => {

    useEffect(() => {
        printCurrentPosition();
    }, [])

    const printCurrentPosition = async () => {
        const coordinates = await Geolocation.getCurrentPosition();
        console.log('Current position:', coordinates);
    };

    return (
        <>
            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>Request Page One</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent fullscreen>
                    <IonHeader collapse="condense">
                        <IonToolbar>
                            <IonTitle size="large">Alerts</IonTitle>
                        </IonToolbar>
                    </IonHeader>
                    <IonCol>
                        <Map />
                    </IonCol>

                </IonContent>
            </IonPage>
        </>
    );
}

export default Tab1;