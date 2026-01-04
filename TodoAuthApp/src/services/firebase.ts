import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyAwu5I3GtE6Fuy_IbSyMH52kX6aRinLI-g",
  authDomain: "todoapp-9ebca.firebaseapp.com",
  databaseURL: "https://todoapp-9ebca-default-rtdb.firebaseio.com",
  projectId: "todoapp-9ebca",
  storageBucket: "todoapp-9ebca.appspot.com",
  messagingSenderId: "1031546197378",
  appId: "1:1031546197378:web:6a70062dfdfea6b4a4ab9b"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getDatabase(app);

export default app;
