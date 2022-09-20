/* eslint-disable no-unused-vars */
/* eslint-disable new-parens */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect}from "react";
import { useIonToast, useIonLoading, IonContent, IonList, IonItem, IonCard, IonLabel } from "@ionic/react"
import { supabase } from "../SupabaseClient";
import RequestHistory from "./RequestHistory.css"
import { compassOutline } from "ionicons/icons";

export const History = () => {
    const [showLoading, hideLoading] = useIonLoading();
    const [showToast] = useIonToast();
    const [items, setItems] = useState({
        list : [],
    });
    
    // const [requests] = useState([]);
     
    useEffect(() => {
        getHistory();
}, []);

const getHistory = async () => {
        
    let { data , error } = await supabase
        .from('EmergencyRequest')
        .select('CrimeType, Summary')
        .eq('Accepted', true)

    if (error) throw new (error.message)
    if (data == null) throw new ("No Requests at the moment")

    console.log(data);
    const requests = data;

    setItems({
        list : requests.map(function(d, index){
            return (<IonList key={index}>
                <IonCard className="history">
                <IonLabel>Type: </IonLabel>
               {d.CrimeType}<br/>
               <IonLabel>Summary: </IonLabel>
               {d.Summary}
                </IonCard>
                </IonList>)
           })

    })
   
    };
 
    return(
        <IonContent>
            {items.list}
        </IonContent>
    );


}