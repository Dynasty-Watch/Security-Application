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
    IonText
} from '@ionic/react';
import React, { useState } from 'react';
import Logo from '../images/Dynasty Watch logo.jpeg';
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { supabase, Supabase } from "../SupabaseClient";

const ForgotPassword = () => {
    const [password, setPassword] = useState();
    const [cPassword, setCPassword] = useState();
    const [email, setEmail] = useState();
    const [Page, setPage] = useState(2)

    const HandleEmail = (e) => {
        e.preventDefault();
        setPage(1);
        return email;
    }

    const HandleUpdate = async (e) => {
        e.preventDefault();

        const { data, error } = await supabase.auth.api.updateUser()
    }

    return (
        <>
            {Page == 1 && (
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
                            <IonButton color='dark' onClick={(e) => HandleEmail(e)}>Continue</IonButton>
                        </div>
                    </IonContent>
                </IonPage>
            )}
            {Page == 2 && (
                <IonPage>
                    <IonHeader>
                        <IonToolbar>
                            <IonTitle>Verify Email</IonTitle>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent className='ion-padding' color='secondary'>
                        <p>
                            <IonText color='dark'>
                                Enter your email to receive confirmation that your password have been reset.
                            </IonText>
                        </p>

                        <div className="email">
                            <IonGrid>
                                <IonRow>
                                    <IonCol className='ion-align-self-center'>
                                        <IonInput color='dark'
                                            placeholder="Email:"
                                            onIonChange={(e) => setEmail(e.target.value)} />
                                    </IonCol>
                                </IonRow>
                            </IonGrid>
                        </div>

                        <div className='button'>
                            <IonButton color='dark' onClick={(e) => HandleUpdate(3)}>Verify</IonButton>
                        </div>
                        <p>
                            <IonText color="dark">Back to Login </IonText>
                            <Link to="/login">click here</Link>
                        </p>
                    </IonContent>
                </IonPage>
            )}
        </>
    );
}

export default ForgotPassword;
