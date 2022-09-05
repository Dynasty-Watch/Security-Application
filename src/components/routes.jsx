/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

import { IonInput, IonButton, IonContent,IonButtons, IonHeader, IonPage, IonTitle, IonToolbar, IonMenuButton } from "@ionic/react"
import {
    useJsApiLoader,
    GoogleMap as Rmap,
    Marker,
    Autocomplete,
    DirectionsRenderer,
  } from '@react-google-maps/api'
  import { useRef, useState , useEffect} from 'react'
  import { Geolocation } from "@capacitor/geolocation";
  const libraries = ['places'];

const Routes = () => {
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: "AIzaSyAsbwt4GElIq_C9duQZxcb2tiX3luBGuRo",
        libraries,
      });
      const [map, setMap] = useState(/** @type google.maps.Map */ (null))
  const [directionsResponse, setDirectionsResponse] = useState(null)
  const [distance, setDistance] = useState('')
  const [duration, setDuration] = useState('')
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
    if (destiantionRef.current.value === '') {
      return
    }
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService()
    const results = await directionsService.route({
        origin: new google.maps.LatLng(position.latitude, position.longitude),
      destination: destiantionRef.current.value,
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

    return(
        <IonPage>
            <IonHeader>
                <IonButtons>
                    <IonMenuButton/>
                    <IonToolbar>
                        <IonTitle>
                            routes
                        </IonTitle>
                    </IonToolbar>
                </IonButtons>
            </IonHeader>
            <IonContent>
            <Autocomplete>
              <IonInput type='text' placeholder='Destination' ref={destiantionRef} />
            </Autocomplete>
            <IonButton type='submit' onClick={calculateRoute}>
              Calculate Route
            </IonButton>
            <p>Distance: {distance} </p>
          <p>Duration: {duration} </p>
            <Rmap
          center={{
            lat: position.latitude,
            lng: position.longitude,
        }}
          zoom={15}
          mapContainerStyle={{ width: '100%', height: '100%' }}
         
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
export default Routes;