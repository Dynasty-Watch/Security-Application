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
  IonText,
  IonLoading
} from "@ionic/react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../SupabaseClient"
import { useHistory } from "react-router-dom";
import Logo from "../images/Dynasty Watch logo.jpeg";
import "./login.css";

const Login = () => {
  const history = useHistory();
  const [showLoading, setShowLoading] = useState(false);
  const [session, setSession] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    userEmail: "",
    password: ""
  })

  const loginUser = async (e) => {
    e.preventDefault();
    setShowLoading(true);
    const emailFormat = "/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/";

    if (formData.userEmail != emailFormat && formData.password !== null)
      authenticateUser(formData.userEmail, formData.password).finally(setShowLoading(false))
    else console.log("incorrect password/email")
  }

  const authenticateUser = async (email, password) => {
    await supabase.auth
      .signIn({
        email: email,
        password: password
      }).then((session, error) => {
        error ? console.log(error) : setSession(session.access_token);
        session != null ?? history.push("./Home");
      }).catch(error => console.log(error.message))
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login Page</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding" color="secondary">
        <IonLoading
          isOpen={showLoading}
          onDidDismiss={() => setShowLoading(false)}
          message={'Loading...'}
        />
        <IonImg src={Logo} />

        <div className="email">
          <IonGrid>
            <IonRow>
              <IonCol className="ion-align-self-center">
                <IonInput
                  color="dark"
                  placeholder="Email:"
                  value={formData.userEmail}
                  onIonChange={(e) => setFormData({ ...formData, userEmail: e.target.value })}
                />
              </IonCol>
            </IonRow>
          </IonGrid>
        </div>

        <div className="password">
          <IonGrid>
            <IonRow>
              <IonCol className="ion-align-self-center">
                <IonInput
                  color="dark"
                  placeholder="Password:"
                  value={formData.password}
                  onIonChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </IonCol>
            </IonRow>
          </IonGrid>
        </div>

        <div className="button">
          <IonButton
            color="dark"
            onClick={(e) => loginUser(e)}
          >
            Login
          </IonButton>
        </div>

        <IonCol className="ion-align-self-center">
          <p>
            <IonText color="dark">Don't have an account? </IonText>
            <Link to="/register">click here</Link>
          </p>
          <p>
            <IonText color="dark">Forgot your credentials? </IonText>
            <Link to="/forgotPassword">click here</Link>
          </p>
        </IonCol>
      </IonContent>
    </IonPage>
  );
};

export default Login;
