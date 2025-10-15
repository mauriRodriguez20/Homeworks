import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage} from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyD6ltrJ7zJkqp7TOmNIDJZyr4aSkpVx1UE",
  authDomain: "parcial-2-7c77d.firebaseapp.com",
  projectId: "parcial-2-7c77d",
  storageBucket: "parcial-2-7c77d.firebasestorage.app",
  messagingSenderId: "719964833925",
  appId: "1:719964833925:web:2f58e87658eda9203181ec",
  measurementId: "G-R80SBLNCM8"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);        
export const db = getFirestore(app);    
export const storage = getStorage(app); 
