/* eslint-disable no-unused-vars */
/* eslint-disable new-parens */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect}from "react";
import { useIonToast, useIonLoading, IonContent, IonList, IonItem, IonCard, IonLabel, IonSelect, IonSelectOption, IonHeader, IonToolbar, IonSegment, IonSegmentButton, IonButton } from "@ionic/react"
import { supabase } from "../SupabaseClient";
import RequestHistory from "./RequestHistory.css"
import { compassOutline } from "ionicons/icons";

export const History = () => {
    const [showLoading, hideLoading] = useIonLoading();
    const [showToast] = useIonToast();
    const [listactive, setListActive] = useState(true);
    const [status, setStatus] = useState({
        Accepted: true,
    });
    const [items, setItems] = useState({
        list : [],
       
    });
    const [item, setItem] = useState({
     
        active : [],
    });
      
    useEffect(() => {
        getActive();
        getHistory();
       

}, []);

const getHistory = async () => {
      await  showLoading(true);
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
   await hideLoading();
    };
    const getActive = async () => {
       
      let { data : act , error : err } = await supabase
          .from('EmergencyRequest')
          .select('RequestID, CrimeType, Summary, RequestLat, RequestLng')
          .eq('Accepted', false)
          .order("RequestID", {ascending: true})
  
      if (err) throw new (err.message)
      if ( act == null) throw new ("No Requests at the moment")
  
      console.log(act );
      const activerequests = act;
  
      setItem({
          active : activerequests.map(function( act, index){
              return (
                <form  onSubmit={updateStatus}>
              <IonList key={index}>
                  <IonCard className="history">
                <IonLabel> Request # : </IonLabel>
                    {act.RequestID}
                  <IonLabel>Type: </IonLabel>
                 {act.CrimeType}<br/>
                 <IonLabel>Summary: </IonLabel>
                 {act.Summary} <br/>

                 <IonLabel>Lat:{act.RequestLat} Lng: {act.RequestLng} </IonLabel>
                 <IonButton type="submit">Completed</IonButton>
                  </IonCard>
                  </IonList>
                  </form>)
             })

  
      })
      const updateStatus = async (e) => {
		e?.preventDefault();
	
		console.log('update ');
		await showLoading();
	
		try {
		  const user = supabase.auth.user();
	
		 
		  let { error } = await supabase.from('EmergencyRequest')
          .update({Accepted: true})
          .eq("RequestID", act.RequestID)
    
	
		  if (error) {
			throw error;
		  }
		} catch (error) {
		  showToast({ message: error.message, duration: 5000 });
		} finally {
		  await hideLoading();
		};
    };
     await hideLoading();
      };

     
    return(
        <>
        <IonHeader>
        <IonToolbar>
            <IonSegment>
                <IonSegmentButton value="active" onClick={() => {setListActive(true)}}>Active</IonSegmentButton>
                <IonSegmentButton value="handled" onClick={() => {setListActive(false)}}>History</IonSegmentButton>
            </IonSegment>
        </IonToolbar>
        </IonHeader>
        <IonContent>
            { listactive ? (
                <>
                {item.active}
                </>
            ) : (
                <>
                {items.list}
                </>
            )}
            <div>
            
            
            </div>
        </IonContent></>
    );


}