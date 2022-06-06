import { 
    IonButton, 
    IonContent, 
    IonHeader, 
    IonText, 
    IonInput, 
    IonPage, 
    IonTitle, 
    IonToolbar,
    IonGrid,
    IonRow,
    IonCol,
   } from '@ionic/react';
  import React, { useState } from 'react';
  import { Redirect } from 'react-router-dom';
  import './login.css';
  
const Verify: React.FC = () => {
    const [email, setEmail] = useState();
  
    async function confirm() {
      console.log(email) 
    }

   {/*const [currentUser, setCurrentUser] = useState<any>("");
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      console.log(user)
    });
    
    if (email) {
      
     return <Redirect to="/login"/>;
    } else {
       
      
    } */
   } 

    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Verification</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className='ion-padding' color='secondary'>
         {/* <IonImg src={Logo} />  */}

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
                onIonChange={(e: any) => setEmail(e.target.value)}/>
            </IonCol>
          </IonRow>
        </IonGrid>
        </div>
          
          <div className='button'>
          <IonButton color='dark' onClick={confirm}>Verify</IonButton>
          </div>
  
         {/* <p>
            <IonText color='dark'>Don't have an account? </IonText><Link to="/register">click here</Link>
          </p> */}
          
        </IonContent>
      </IonPage>
      
    );
  }
 export default Verify;
  
  

  