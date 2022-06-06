import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
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
import {supabase} from "../SupabaseClient"
import {useHistory} from  "react-router-dom";
import Logo from "../images/Dynasty Watch logo.jpeg";
import "./login.css";

const Login = () => {
  const [userEmail, setUserEmail] = useState();
  const [password, setPassword] = useState();
  const [showLoading,setShowLoading] = useState(false);
  const [session,setSession] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const emailFormat =
  "/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/";
  const history = useHistory();

  const loginUser = async (e) => {
    e.preventDefault();
    setShowLoading(true);

    if (userEmail != emailFormat) setErrorMessage("Email is not valid");

    try {
      const {session,error } = await supabase.auth.signIn({ 
        email : userEmail,
        password : password
      });
        
      if (error) console.log(error);
      else setSession(session.access_token)
      
      if(session != null) history.push("./Home");
      
    } catch (error) {
      alert(error);
    } finally {
      setShowLoading(false);
    }
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
                  onIonChange={(e) => setUserEmail(e.target.value)}
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
                  onIonChange={(e) => setPassword(e.target.value)}
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
            <Link to="/register">click here</Link>
          </p>
        </IonCol>
      </IonContent>
    </IonPage>
  );
};

export default Login;
