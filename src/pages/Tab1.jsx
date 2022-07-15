import {
    IonCol,
    IonContent,
    IonHeader,
    IonPage,
    IonRow,
    IonTitle,
    IonToolbar,
    useIonModal,
    useIonViewWillEnter,
    IonTabs,
    IonTab,
    IonTabButton,
    IonMenu,
    IonList,
    IonListHeader,
    IonMenuToggle,
    IonIcon,
    IonItem,
    IonLabel,
    IonApp,
    IonReactRouter,
    IonRouterOutlet,
    Route,
    Redirect,
    IonTabBar
} from "@ionic/react";
import Map from "../components/Map";
import { _markers } from "../data";

const Tab1 = () => {
    _markers();
    return (
        <>
            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>Request Page One</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent fullscreen>
                    <IonHeader collapse="condense">
                        <IonToolbar>
                            <IonTitle size="large">Alerts</IonTitle>
                        </IonToolbar>
                    </IonHeader>
                    <IonCol>
                        <Map />
                    </IonCol>
                </IonContent>
            </IonPage>
        </>
    );
}

export default Tab1;