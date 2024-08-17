
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";
import { getStorage, FirebaseStorage } from "firebase/storage";
import { getAnalytics, Analytics } from "firebase/analytics";


interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;
}


const firebaseConfig: FirebaseConfig = {
  apiKey: "AIzaSyDKUSoj9l0XH_0i9Z9XlrwN9Z4vVWJKmq4",
  authDomain: "comment-system-17f90.firebaseapp.com",
  projectId: "comment-system-17f90",
  storageBucket: "comment-system-17f90.appspot.com",
  messagingSenderId: "313287182164",
  appId: "1:313287182164:web:486b5dbe61714d18a0eac1",
  measurementId: "G-YHW4PFLV7D"
};


const app = initializeApp(firebaseConfig);

const auth: Auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db: Firestore = getFirestore(app);
const storage: FirebaseStorage = getStorage(app);
const analytics: Analytics = getAnalytics(app);

export { auth, googleProvider, db, storage, analytics };
