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
  import './login.css';
  
const forgetPassword: React.FC = () => {
    const [password, setPassword] = useState();
    const [cPassword, setCPassword] = useState();
  
    async function confirm() {
      console.log(password, cPassword)
    }

    {/*const [currentUser, setCurrentUser] = useState<any>("");
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      console.log(user)
    });
    
    if (email) {
      
     return <Redirect to="/verify"/>;
    } else {
       
      
    } */
   }
  
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Forget Password</IonTitle>
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
                  onIonChange={(e: any) => setPassword(e.target.value)}/>
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
            onIonChange={(e: any) => setCPassword(e.target.value)}/>
              </IonCol>
            </IonRow>
          </IonGrid>
            </div>
          
          <div className='button'>
          <IonButton color='dark' onClick={confirm}>Submit</IonButton>
          </div>
  
         {/* <p>
            <IonText color='dark'>Don't have an account? </IonText><Link to="/register">click here</Link>
          </p> */}
          
        </IonContent>
      </IonPage>
      
    );
  };
  
  export default forgetPassword;
  
  
  
  {/* <IonButton color='primary'>
            <IonIcon slot="start" icon={star}></IonIcon>
            hello world</IonButton> */}
  