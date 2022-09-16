/* eslint-disable no-unused-vars */
/* eslint-disable new-parens */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect}from "react";
import { useIonToast, useIonLoading, IonContent, IonList, IonItem, IonCard, IonLabel } from "@ionic/react"
import { supabase } from "../SupabaseClient";

export const History = () => {
    const [showLoading, hideLoading] = useIonLoading();
    const [showToast] = useIonToast();
   const requests  = [
    {
        RequestID : 1,
        CrimeType : "Assault",
        Summary : "Man beat me",
        Accepted : false
    },
    {
        id : 2,
        Type : "Robbery",
        Summary: "group of teens",
        Accepted: true
    },{
        id : 3,
        Type : "Armed Robbery",
        Summary: "Group of men in bmw",
        Accepted : false
    },
    {
        id : 4,
        Type : "Hijacking",
        Summary : "",
        Accepted : false
    },{
        id : 5,
        Type : "Organized Crime",
        Summary: "Will i get paid for this information",
        Accepted: true
    },{
        id : 6,
        Type : "Shoplifting",
        Summary : "",
        Accepted : true
    },{
        id : 7,
        Type : "Sexual Offence",
        Summary : "i was attacked in a dark alley",
        Accepted : false
    },{
        id : 8,
        Type : "Kidnapping",
        Summary : "",
        Accepted : false
    }
]

    return(
        <IonContent>
            <IonList>
            {requests.map((e) => (
                <IonItem  key={e.RequestID}><IonCard>
                    <IonLabel>Type:</IonLabel>{e.CrimeType}<br/>
                <IonLabel>Summary:</IonLabel>{e.Summary}<br/>
                <IonLabel>Accepted:</IonLabel>{e.Accepted}
                </IonCard></IonItem>
            ))}
            </IonList>
        </IonContent>
    )


};