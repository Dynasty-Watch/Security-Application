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
import React, { useEffect, useState } from "react";
import { star } from "ionicons/icons";
import { Link } from "react-router-dom";
import ExploreContainer from "../components/ExploreContainer";
import { toast } from "../components/toast";
import {supabase} from "../SupabaseClient"
import {useHistory} from  "react-router-dom";
import Logo from "../images/Dynasty Watch logo.jpeg";
import "./login.css";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [showLoading,setShowLoading] = useState(false)
  const history = useHistory();

  const loginUser = async email => {
    try {
        setShowLoading(true);

        const { error } = await supabase.auth.signIn({ email});
        if (error) {
          console.log(error);
        } else {
          history.push("./Home")
        }
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
                  onIonChange={(e) => setEmail(e.target.value)}
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
            onClick={(e) => {
              e.preventDefault();
              loginUser(email);
            }}
          >
            Login
          </IonButton>
        </div>

        <p>
          <IonText color="dark">Don't have an account?</IonText>{" "}
          <Link to="/register">click here</Link>
        </p>
      </IonContent>
    </IonPage>
  );
};

export default Login;
