// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getDatabase } from 'firebase/database'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCz2Y4oNyAeSdOcPdJmaohsPAbI9CLEjks",
  authDomain: "proyecto1-5fecb.firebaseapp.com",
  projectId: "proyecto1-5fecb",
  storageBucket: "proyecto1-5fecb.firebasestorage.app",
  messagingSenderId: "35290820341",
  appId: "1:35290820341:web:7196c6623bf669a4bb1fbc",
  measurementId: "G-TG7ZGLFNDW"
};





export const app   = initializeApp(firebaseConfig)
export const auth  = getAuth(app)
export const db    = getFirestore(app)
export const rtdb  = getDatabase(app)


