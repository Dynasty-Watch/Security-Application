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

const Tab3 = () => {
    return (
        <>
            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>Profile</IonTitle>
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

                        </IonRow>
                    </IonCol>
                </IonContent>
            </IonPage>
        </>
    );
}

export default Tab3;