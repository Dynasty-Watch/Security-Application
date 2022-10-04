import { useState } from "react";
import { supabase } from "../SupabaseClient";
import { IonCard, IonLabel,  IonButton } from "@ionic/react"


const ActiveItem = ({act}) => {
    const [isAccepted ,  setAccepted] = useState(false);

    const ActAccepted = async () => {
        const { data, error} = await supabase
        .from("EmergencyRequest")
        .update({ Accepted : !isAccepted})
        .eq("RequestID", act.RequestID)
        .single();

        if (error) {
            console.error(error);
        }
        setAccepted(data.Accepted)
    };

    return  (
        <div>
                <IonCard className="history">
                <IonLabel> Request# </IonLabel>
                    {act.RequestID}
					<br/>
                  <IonLabel>Type: </IonLabel>
                 {act.CrimeType}<br/>
                 <IonLabel>Summary: </IonLabel>
                 {act.Summary} <br/>

                 <IonLabel>Lat:{act.RequestLat} Lng: {act.RequestLng} </IonLabel>
                 <IonButton onClick={ActAccepted}>Completed</IonButton>
                  </IonCard>

        </div>
    );
};

export default ActiveItem;
