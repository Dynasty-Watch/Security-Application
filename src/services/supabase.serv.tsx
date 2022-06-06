//import { Injectable } from '@ionic/react'
import { createClient, SupabaseClient, User } from "@supabase/supabase-js"
import { contractOutline } from "ionicons/icons";
import { environement } from '../environment/environment';


/*@Injectable ({
    providedIn: 'root',
})

export class SupabaseService {
    supabase: SupabaseClient;
     private _currentUser: BehaviorSubject<any> = new BehaviorSubject(null);

    constructor() {
        this.supabase = createClient(environement.supabaseUrl, environement.supabaseKey, {
            autoRefreshToken: true,
            persistSession: true

        });

        this.supabase.auth.onAuthStateChange((event, session) => {
            contractOutline.log('event', event);

            if (event == 'SIGNED_IN') {
                this._currentUser.next(session.user);
            } else {
                this.
            }

        });
    }

    //loadUser(){

    }
}
*/