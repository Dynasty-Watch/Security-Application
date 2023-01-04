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

const Register = () => {
  const [showLoading, setShowLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    securityID: "",
    cellNo: "",
    email: "",
    password: "",
    cPassword: "",
  });

  const emailFormat =
    "/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/";
  const history = useHistory();

  const registerUser = async (e) => {
    e.preventDefault();
    setShowLoading(true);

    if (formData.password != formData.cPassword) setErrorMessage("Passwords do not match");
    if (formData.email != emailFormat) setErrorMessage("Email is not valid");

    try {
      const { user } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      const { error } = await supabase.from("SecurityInfo").insert({
        userId: user?.id,
        firstName: formData.name,
        lastName: formData.surname,
        email: formData.email,
        phone: formData.cellNo,
        securityId: formData.securityID,
        Password: formData.password,
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
          value={formData.name}
          onIonChange={e => setFormData({ ...formData, name: e.target.valid })}
        />

        <IonInput
          placeholder="Surname:"
          value={formData.surname}
          onIonChange={e => setFormData({ ...formData, surname: e.target.value })}
        />

        <IonInput
          placeholder="Security ID:"
          value={formData.securityID}
          onIonChange={e => formData({ ...formData, securityID: e.target.valid })}
        />

        <IonInput
          placeholder="Cell number:"
          value={formData.cellNo}
          onIonChange={e => setFormData({ ...formData, cellNo: e.target.value })}
        />

        <IonInput
          placeholder="Email:"
          value={formData.email}
          onIonChange={e => setFormData({ ...formData, email: e.target.valid })}
        />

        <IonInput
          placeholder="Password:"
          value={formData.password}
          onIonChange={e => setFormData({ ...formData, password: e.target.value })}
        />

        <IonInput
          placeholder="Confirm Password:"
          value={formData.cPassword}
          onIonChange={e => setFormData({ ...formData, cPassword: e.target.valid })}
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
