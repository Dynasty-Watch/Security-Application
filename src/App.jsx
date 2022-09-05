import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import React, {useEffect, useState} from "react";
import { supabase } from "./SupabaseClient";
//import Tab1 from "./pages/Tab1";


/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

setupIonicReact();

const App = () => {
  const [session, setSession] = useState(null);
  useEffect(() => {
    setSession(supabase.auth.session())
    console.log(session)
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [session])
  return(
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
      <Route exact path="/" render={() => {
              return session ? <Redirect to="/home"/> : <Login/>;
            }} />
        <Route path="/register" component={Register} exact />
        <Route path="/home" component={Home} exact />
        <Route path="/forgotPassword" component={ForgotPassword} exact />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
  );
};

export default App;
