import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDkPnJvVh8fkxLRI1CnvokQPg5tFzec2Ww",
  authDomain: "whatsapp-clone-d0564.firebaseapp.com",
  projectId: "whatsapp-clone-d0564",
  storageBucket: "whatsapp-clone-d0564.appspot.com",
  messagingSenderId: "634023414264",
  appId: "1:634023414264:web:7ebbe29b01ada87741ae0d",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();
const provider = new GoogleAuthProvider();

export { auth, provider };
export default db;
