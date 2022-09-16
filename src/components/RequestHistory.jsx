/* eslint-disable new-parens */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect}from "react";
import { useIonToast, useIonLoading, IonContent, IonList, IonItem } from "@ionic/react"
import { supabase } from "../SupabaseClient";

export const History = () => {
    const [showLoading, hideLoading] = useIonLoading();
    const [showToast] = useIonToast();
    const [requests, setRequests] = useState({
        RequestID: "",
        CrimeType: "",
        Summary: "",
        Accepted: "",
    });

    useEffect(()=> {
        getHistory();
    },[]);
    
    const getHistory = async () => {
        console.log("get");
        await showLoading();
        try
        {
            let { data, error, status } = await supabase
            .from('EmergencyRequest')
            .select(`RequestID,CrimeType, Summary, Accepted`)
            .eq('Accepted', true)
            if (error && status !== 406) {
                throw error;
              }
              if (data) {
                setRequests({
                    RequestID: data.RequestID,
                    CrimeType: data.CrimeType,
                    Summary: data.Summary,
                    Accepted: data.Accepted,
        });
    }
    } catch (error) {
    showToast({ message: error.message, duration: 3000 });
    } finally {
    await hideLoading();
    }
    };

    return(
        <IonContent>
            <IonList>
            {requests.map((e) => (
                <IonItem key={e.RequestID}>{e.CrimeType}<br/>{e.Summary}<br/>{e.Accepted}</IonItem>
            ))}
            </IonList>
        </IonContent>
    )


};