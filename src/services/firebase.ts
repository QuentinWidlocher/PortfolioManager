import firebase from 'firebase';

export class FirebaseService {
    public db: firebase.firestore.Firestore;
    public auth: firebase.auth.Auth;

    public constructor() {
        let firebaseConfig = {
            apiKey: "AIzaSyCWiOsnhSTE-DkuvKyN3Mlbznn8xbLVrJY",
            authDomain: "portfolio-9b0b3.firebaseapp.com",
            databaseURL: "https://portfolio-9b0b3.firebaseio.com",
            projectId: "portfolio-9b0b3",
            storageBucket: "portfolio-9b0b3.appspot.com",
            messagingSenderId: "349548091568",
            appId: "1:349548091568:web:6e3ee6f884c8e907"
        };

        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);

        this.db = firebase.firestore();
        this.auth = firebase.auth();

        this.auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    }

    public getCurrentUser(): Promise<any> {
        return new Promise<any>(rslv => {
            const unsubscribe = this.auth.onAuthStateChanged((user: any) => {
                unsubscribe();
                rslv(user);
            });
        });
    }
}

export const firebaseService: FirebaseService = new FirebaseService();