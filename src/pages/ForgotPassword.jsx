import {
    IonButton,
    IonContent,
    IonHeader,
    IonInput,
    IonPage,
    IonTitle,
    IonToolbar,
    IonImg,
    IonGrid,
    IonRow,
    IonCol,
} from '@ionic/react';
import React, { useState } from 'react';
import Logo from '../images/Dynasty Watch logo.jpeg';

const ForgotPassword = () => {
    const [password, setPassword] = useState();
    const [cPassword, setCPassword] = useState();

    return (

        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>New Password</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className='ion-padding' color='secondary'>
                <IonImg src={Logo} />

                <div className="password">
                    <IonGrid>
                        <IonRow>
                            <IonCol className='ion-align-self-center'>
                                <IonInput color='dark'
                                    placeholder="Password:"
                                    onIonChange={(e) => setPassword(e.target.value)}
                                />
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </div>

                <div className='confirm-password'>
                    <IonGrid>
                        <IonRow>
                            <IonCol className='ion-align-self-center'>
                                <IonInput color='dark'
                                    placeholder="Confirm Password:"
                                    onIonChange={(e) => setCPassword(e.target.value)}
                                />
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </div>

                <div className='button'>
                    <IonButton color='dark' onClick={confirm}>Next</IonButton>
                </div>
            </IonContent>
        </IonPage>
    );
}

export default ForgotPassword;
