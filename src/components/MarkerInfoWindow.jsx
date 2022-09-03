import { IonButton, IonCol, IonContent, IonGrid, IonIcon, IonLabel, IonNote, IonRow } from '@ionic/react';
import { heartOutline, locationOutline, navigateOutline, phonePortraitOutline } from "ionicons/icons";
//import { useState  } from 'react';
export const MarkerInfoWindow = ({ marker, dismiss, page}) => {
       
    const handleClick = () =>{
		let setPage;
        setPage(2);
        console.log("Clicked");
    }; 
	return (
		<IonContent key={marker.markerID}>
			<IonGrid className="ion-padding">

				<IonRow className="ion-margin-bottom">
					<IonCol size="12">
						<IonLabel>
							<h1>{marker.title}</h1>
							<></>
							<IonNote>{marker.Summary}</IonNote>
						</IonLabel>
					</IonCol>
				</IonRow>

				<IonRow className="ion-justify-content-start ion-align-items-center">
					<IonCol size="2">
						<IonIcon icon={locationOutline} color="primary" style={{ fontSize: "1.5rem" }} />
					</IonCol>

					<IonCol size="10">{marker.address}</IonCol>
				</IonRow>

				{/* <IonRow className="ion-justify-content-start ion-align-items-center">
					<IonCol size="2">
						<IonIcon icon={globeOutline} color="primary" style={{ fontSize: "1.5rem" }} />
					</IonCol>

					<IonCol size="10">{marker.website}</IonCol>
				</IonRow> */}

				<IonRow className="ion-justify-content-start ion-align-items-center">
					<IonCol size="2">
						<IonIcon icon={phonePortraitOutline} color="primary" style={{ fontSize: "1.5rem" }} />
					</IonCol>

					<IonCol size="10">{marker.phone}</IonCol>
				</IonRow>

				<IonRow>
					<IonButton onClick={dismiss}>
						<IonIcon icon={heartOutline} />&nbsp;
						Accept
					</IonButton>
					<IonButton {...page} onClick={handleClick}>
						<IonIcon icon={navigateOutline}/>&nbsp;
						Accept
					</IonButton>
				</IonRow>
			</IonGrid>
		</IonContent>
	);
}
