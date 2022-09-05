/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

import { IonLoading, IonButton, IonContent,IonButtons, IonHeader, IonPage, IonTitle, IonToolbar, IonMenuButton } from "@ionic/react"
import {
    useJsApiLoader,
    GoogleMap as Rmap,
    Marker,
    Autocomplete,
    DirectionsRenderer,
  } from '@react-google-maps/api'
  import { useRef, useState , useEffect} from 'react'
  import { Geolocation } from "@capacitor/geolocation";
import { Link } from "react-router-dom";
  const libraries = ['places'];

const Tab2 = () => {
  const [showLoading, setShowLoading] = useState(true);
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: "AIzaSyAsbwt4GElIq_C9duQZxcb2tiX3luBGuRo",
        libraries,
      });
      const [map, setMap] = useState(/** @type google.maps.Map */ (null))
  const [directionsResponse, setDirectionsResponse] = useState(null)
  const [distance, setDistance] = useState('')
  const [duration, setDuration] = useState('')
  const [status, setStatus] = useState({
    Accepted: true,
  })
  const [cpostion, setCpostion] = useState({
    lati: 0,
    longi: 0,
  })
  const [ position,setPosition] = useState({
    latitude : 0,
    longitude: 0,
});

useEffect(() => {
    getLocation();
}, []);

const getLocation = async () => {
    await Geolocation.checkPermissions()
    .then(() => Geolocation.getCurrentPosition())
    .then((val) => {
        setPosition({
    
        latitude : val.coords.latitude,
        longitude : val.coords.longitude,
        });
        setCpostion({
            lati: -26.184735805508335, 
            longi: 27.979532669670185
        });
    });
};

  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef()
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destiantionRef = useRef()

  if (!isLoaded) {
    return <p>loading..</p>;
  }

  async function calculateRoute() {
    
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService()
    const results = await directionsService.route({
        origin: new google.maps.LatLng(position.latitude, position.longitude),
      destination: new google.maps.LatLng(cpostion.lati, cpostion.longi),
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    })
    
    setDirectionsResponse(results)
    setDistance(results.routes[0].legs[0].distance.text)
    setDuration(results.routes[0].legs[0].duration.text)
  }

  // eslint-disable-next-line no-unused-vars
  function clearRoute() {
    setDirectionsResponse(null)
    setDistance('')
    setDuration('')
    originRef.current.value = ''
    destiantionRef.current.value = ''
  }

  const updateStatus = async (e) => {
		e?.preventDefault();
	
		console.log('update ');
		await showLoading();
	
		try {
		  const user = supabase.auth.user();
	
		  const updates = {
			userId: user.id,
			...status,
		  };
	
		  let { error } = await supabase.from('EmergencyRequest').upsert(updates, {
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

    return(
        <IonPage>
            <IonHeader>
                
                    <IonToolbar>
                        <IonTitle>
                        Request Page One
                        </IonTitle>
                    </IonToolbar>
               
            </IonHeader>
            <IonContent>
               
           <div className="buttons">
            <IonButton type='submit' onClick={calculateRoute}>
              Calculate Route
            </IonButton> 
            <IonButton href="/home">Done</IonButton></div>
            <p>Distance: {distance} </p>
          <p>Duration: {duration} </p>
          <IonLoading isOpen={showLoading} onDidDismiss={()=> setShowLoading(false)} message={"Loading"} duration={1000}></IonLoading>
           
            <Rmap
          center={{
            lat: position.latitude,
            lng: position.longitude,
        }}
          zoom={15}
          mapContainerStyle={{ width: '100%', height: '100%' }}
          options={{
            mapTypeControl: false,
            fullscreenControl: false,
          }}
         
          onLoad={map => setMap(map)}
        >
          <Marker position={{
                                    lat: position.latitude,
                                    lng: position.longitude,
                            }}
                        />
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
        </Rmap>
            </IonContent>
        </IonPage>
        );
};
export default Tab2;