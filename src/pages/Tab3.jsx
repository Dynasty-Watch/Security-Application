/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    IonButton,
    IonButtons,
    IonContent,
    IonFooter,
    IonHeader,
    IonIcon,
    IonInput,
    IonItem,
    IonLabel,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar,
    useIonLoading,
    useIonRouter,
    useIonToast,
  } from "@ionic/react";
  import { useEffect, useState } from "react";
  import { supabase } from "../SupabaseClient";
  import "./Profile.css";
  import { Avatar } from "../components/Avatar";
  import { lockClosed, lockClosedOutline } from "ionicons/icons";
  
  const Tab3 = () => {
    const [showLoading, hideLoading] = useIonLoading();
    const [showToast] = useIonToast();
    const [session] = useState(() => supabase.auth.session());
    const router = useIonRouter();
    const [profile, setProfile] = useState({
		firstName: "",
        lastName: "",
        email: "",
        phone: "",
        securityId: "",
        avatar_url: "",
	});
	useEffect(() => {
		getProfile();
	}, [session]);
	const getProfile = async () =>{
		console.log('get');
		await showLoading();
		try {
			const user = supabase.auth.user();
			let {data, error, status} = await supabase.from("SecurityInfo")
			.select(`firstName, lastName, email, phone, securityId, avatar_url`)
			.eq('userId', user.id)
			.single();

			if (error && status !== 406){
				throw error;
			}
			if (data) {
				setProfile({
					firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                phone: data.phone,
                securityId: data.securityId,
                avatar_url: data.avatar_url,
				});
			} 
		}	
			catch (error){
				showToast({message: error.message, duration: 3000});
			} finally {
				await hideLoading();
			}
	};
	const signOut = async () => {
		await supabase.auth.signOut();
		router.push('/', 'forward', 'replace');
	  }

	  const updateProfile = async (e) => {
		e?.preventDefault();
	
		console.log('update ');
		await showLoading();
	
		try {
		  const user = supabase.auth.user();
	
		  const updates = {
			userId: user.id,
			...profile,
			avatar_url: avatar_url,
			updated_at: new Date(),
		  };
	
		  let { error } = await supabase.from('SecurityInfo').upsert(updates, {
			returning: 'minimal', // Don't return the value after inserting
		  });
	
		  if (error) {
			throw error;
		  }
		} catch (error) {
		  showToast({ message: error.message, duration: 5000 });
		} finally {
		  await hideLoading();
		};
	  };
    return (
      <IonPage>
        <IonHeader>
        
           
            <IonToolbar>
              <IonTitle>Profile</IonTitle>
            </IonToolbar>
        
        </IonHeader>
        <IonContent fullscreen>
          <form className="user_div" onSubmit={updateProfile}>
            <div >
              <Avatar url={profile.avatar_url} onUpload={updateProfile}></Avatar>
            </div>
            <IonItem>
              <IonLabel><p>Email</p>{session?.user?.email}<IonIcon icon={lockClosedOutline}></IonIcon></IonLabel>
            </IonItem>
            <IonItem >
              <IonLabel position="stacked">Name</IonLabel>
              <IonInput 
              placeholder="Name"
              value={profile.firstName}
              onIonChange={(e) =>
                setProfile({ ...profile, FirstName: e.detail.value ?? '' })
              }
              >
              </IonInput>
              </IonItem>
              <IonItem >
              <IonLabel position="stacked">Surname</IonLabel>
              <IonInput 
              placeholder="Surname"
              value={profile.lastName}
              onIonChange={(e) =>
                setProfile({ ...profile, LastName: e.detail.value ?? '' })
              }
              >
              </IonInput>
              </IonItem>
              <IonItem >
              <IonLabel position="stacked">Cell No.</IonLabel>
              <IonInput 
              placeholder="Cell number"
              value={profile.phone}
              onIonChange={(e) =>
                setProfile({ ...profile, Phone: e.detail.value ?? '' })
              }
              >
              </IonInput>
              </IonItem>
    
              <IonItem >
              <IonLabel position="stacked">SecurityId</IonLabel>
              <IonInput 
              placeholder="Security ID"
              value={profile.securityId}
              onIonChange={(e) =>
                setProfile({ ...profile, Age: e.detail.value ?? '' })
              }
              >
              </IonInput>
              </IonItem>
              
              <div className="ion-text-center">
              <IonButton  
            color="dark"
            expand="block"
            fill="solid" 
            onClick={() => signOut()}>
              Logout
            </IonButton>
            </div>
              </form>
           
            

          
        </IonContent>
      </IonPage>
    );
  };
  
  export default Tab3;
  