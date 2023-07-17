// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDf1rglz_MTxUKpHCrVO1EcjcdBm1RDhuY",
  authDomain: "thelasttest-e8714.firebaseapp.com",
  databaseURL: "https://thelasttest-e8714-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "thelasttest-e8714",
  storageBucket: "thelasttest-e8714.appspot.com",
  messagingSenderId: "783246050863",
  appId: "1:783246050863:web:f9e6f8067883e8bd1568da",
  measurementId: "G-L3KP70RGY5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
