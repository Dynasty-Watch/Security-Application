import { IonButton, IonCol, IonContent, IonGrid, IonIcon, IonLabel, IonNote, IonRow } from '@ionic/react';
import { globeOutline, heartOutline, locationOutline, navigateOutline, phonePortraitOutline } from "ionicons/icons";

export const MarkerInfoWindow = ({ marker, dismiss }) => {

	return (
		<IonContent>
			<IonGrid className="ion-padding">

				<IonRow className="ion-margin-bottom">
					<IonCol size="12">
						<IonLabel>
							<h1>{marker.CrimeType}</h1>
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
					<IonButton>
						<IonIcon icon={navigateOutline} />&nbsp;
						Accept
					</IonButton>
				</IonRow>
			</IonGrid>
		</IonContent>
	);
}