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

const Tab2 = () => {
    return (
        <>
            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>Request Page Two</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent fullscreen>
                    <IonHeader collapse="condense">
                        <IonToolbar>
                            <IonTitle size="large">Alerts</IonTitle>
                        </IonToolbar>
                    </IonHeader>
                    <IonCol>
                        <IonRow >
                            <Map />
                        </IonRow>
                    </IonCol>
                </IonContent>
            </IonPage>
        </>
    );
}

export default Tab2;