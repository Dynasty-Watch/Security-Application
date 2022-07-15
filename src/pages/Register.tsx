import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonPage,
  IonTitle,
  IonToolbar,
  IonLoading,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../SupabaseClient";
import { useHistory } from "react-router-dom";
import "./Home.css";

const Register: React.FC = () => {
  const [name, setName] = useState();
  const [surname, setSurname] = useState();
  const [securityID, setSecurityID] = useState();
  const [cellNo, setCellNo] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [cPassword, setCPassword] = useState();
  const [showLoading, setShowLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const emailFormat =
    "/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/";
  const history = useHistory();

  const registerUser = async (e: any) => {
    e.preventDefault();
    setShowLoading(true);

    if (password != cPassword) setErrorMessage("Passwords do not match");
    if (email != emailFormat) setErrorMessage("Email is not valid");

    try {
      const { user } = await supabase.auth.signUp({
        email: email,
        password: password,
      });

      const { error } = await supabase.from("SecurityInfo").insert({
        userId: user?.id,
        firstName: name,
        lastName: surname,
        email: email,
        phone: cellNo,
        securityId: securityID,
        Password: password,
      });

      if (error) console.log(error);
      else history.push("./Login");
      
    } catch (error) {
      console.log(error);
    } finally {
      setShowLoading(false);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Register Page</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonLoading
          isOpen={showLoading}
          onDidDismiss={() => setShowLoading(false)}
          message={"Loading..."}
        />
        <IonInput
          placeholder="Name:"
          onIonChange={(e: any) => setName(e.target.value)}
        />

        <IonInput
          placeholder="Surname:"
          onIonChange={(e: any) => setSurname(e.target.value)}
        />

        <IonInput
          placeholder="Security ID:"
          onIonChange={(e: any) => setSecurityID(e.target.value)}
        />

        <IonInput
          placeholder="Cell number:"
          onIonChange={(e: any) => setCellNo(e.target.value)}
        />

        <IonInput
          placeholder="Email:"
          onIonChange={(e: any) => setEmail(e.target.value)}
        />

        <IonInput
          placeholder="Password:"
          onIonChange={(e: any) => setPassword(e.target.value)}
        />

        <IonInput
          placeholder="Confirm Password:"
          onIonChange={(e: any) => setCPassword(e.target.value)}
        />

        <IonButton onClick={(e) => registerUser(e)} color="dark">
          Sign Up
        </IonButton>

        <p>
          Have an account already? <Link to="/login">click here</Link>
        </p>
      </IonContent>
    </IonPage>
  );
};

export default Register;
