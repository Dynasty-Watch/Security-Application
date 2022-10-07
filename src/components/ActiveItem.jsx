import { useState } from "react";
import { supabase } from "../SupabaseClient";
import { IonCard, IonLabel,  IonButton, useIonLoading } from "@ionic/react"


const ActiveItem = ({act}) => {
    const [  isAccepted ,setAccepted] = useState(act.Accepted);
    const [showLoading, hideLoading] = useIonLoading();
    
	
    const ActAccepted = async () => {
		console.log('update ');
        await showLoading();
		
		try{
        const { data, error} = await supabase
        .from("EmergencyRequest")
        .update({Accepted : !isAccepted}, {	
        returning: 'minimal',})
        .eq("RequestID", act.RequestID)
        .single();

        if (error) {
            console.error(error);
        }
        setAccepted(data.Accepted);
    } catch (error) {
        console.log("Error", error);
      } finally {
       
        await hideLoading();
      };
   
	}
    return  (
        <div>
                <IonCard className="active">
                <IonLabel><b><b>Request#</b></b></IonLabel>
                    {act.RequestID}
					<br/>
                  <IonLabel> <b><b>Type:</b></b></IonLabel>
                 {act.CrimeType}<br/>
                 <IonLabel><b><b>Summary:</b></b> </IonLabel>
                 {act.Summary} <br/>

                 <IonLabel><b><b>Lat:</b></b>{act.RequestLat} <b><b>Lng:</b></b> {act.RequestLng} </IonLabel>
                 <IonButton onClick={ActAccepted}>Completed</IonButton>
                  </IonCard>

        </div>
    );
};

export default ActiveItem;
