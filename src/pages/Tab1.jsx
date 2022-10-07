/* eslint-disable no-unused-vars */
import {
    IonCol,
    IonContent,
    IonHeader,
    IonPage,
    
    IonTitle,
    IonToolbar,
    
} from "@ionic/react";
import Map from "../components/Map";
import { supabase } from "../SupabaseClient";
import { UseMarkers } from "../data";
import { Geolocation } from "@capacitor/geolocation";
import React, { useState, useEffect } from "react";

const Tab1 = () => {

    const [recoveryToken, setRecoveryToken] = useState(null);

    useEffect(() => {
        /* Recovery url is of the form
         * <SITE_URL>#access_token=x&refresh_token=y&expires_in=z&token_type=bearer&type=recovery
         * Read more on https://supabase.com/docs/reference/javascript/reset-password-email#notes
         */
        let url = window.location.hash;
        let query = url.slice(1);
        let result = {};

        query.split("&").forEach((part) => {
            const item = part.split("=");
            result[item[0]] = decodeURIComponent(item[1]);
        });

        if (result.type === "recovery") {
            setRecoveryToken(result.access_token);
        }
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
                        <IonTitle>Requests</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent fullscreen>
                    
                    <IonCol>
                        <Map />
                    </IonCol>

                </IonContent>
            </IonPage>
        </>
    );
}

export default Tab1;