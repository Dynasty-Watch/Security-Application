/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

import { IonLoading, IonButton, IonContent,IonButtons, IonHeader, IonPage, IonTitle, IonToolbar, IonMenuButton } from "@ionic/react"
import { History } from "../components/RequestHistory";


const Tab2 = () => {
 

  
  const updateStatus = async (e) => {
		e?.preventDefault();
	
		console.log('update ');
		await showLoading();
	
		try {
		  const user = supabase.auth.user();
	
		  const updates = {
			userId: user.id,
			//...status,
		  };
	
		  let { error } = await supabase.from('EmergencyRequest').upsert(updates, {
			returning: 'minimal', // Don't return the value after inserting
		  });
	
		  if (error) {
			throw error;
		  }
		} catch (error) {
		  showToast({ message: error.message, duration: 5000 });
		} finally {
		  await hideLoading();
		};
	  };

    return(
        <IonPage>
            <IonHeader>
                
                    <IonToolbar>
                        <IonTitle>
                        History
                        </IonTitle>
                    </IonToolbar>
               
            </IonHeader>
            <IonContent>
               <History/>
          
            </IonContent>
        </IonPage>
        );
};
export default Tab2;