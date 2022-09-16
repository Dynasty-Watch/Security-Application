/* eslint-disable new-parens */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { supabase } from "../SupabaseClient";

export const UseMarkers = () => {
    const [requests, setRequests] = useState([])

    useEffect(async () => {
        try {
            let { data: EmergencyRequest, error } = await supabase
                .from('EmergencyRequest')
                .select('*')

    
            if (error) throw new (error.message);
            if (EmergencyRequest == null) throw new ("No requests yet");

            setRequests(EmergencyRequest);
            console.log(requests);

        } catch (error) {
            console.log(error.message);
        }
    }, [markers])
}



export const markers = [
    // Format resembles database table structure
    { lat: -26.1861, lng: 27.9959, CrimeType: "Assult", Summary: "CampusLorem ipsum dolor sit amet.", address: "122 Kingsway Rd, Auckland Park", website: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.", phone: "072 926 6253" },
    { lat: -26.1941, lng: 27.9969, CrimeType: "Hijack", Summary: "CampusLorem ipsum dolor sit amet.", address: "68 Ararat Street, Wesdene", website: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.", phone: "084 926 7728" },

];
