import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA3HXAMF-N-KyAat6Jq7RwR_uSVk3WqILA",
  authDomain: "frid-db.firebaseapp.com",
  databaseURL: "https://frid-db-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "frid-db",
  storageBucket: "frid-db.firebasestorage.app",
  messagingSenderId: "644587019949",
  appId: "1:644587019949:web:8dff37016cb4a315d73024",
  measurementId: "G-GP10T7EJ0V"
};

// אתחול האפליקציה של פיירבייס
const app = initializeApp(firebaseConfig);

// ייצוא השירותים לשימוש בשאר חלקי המערכת
export const db = getDatabase(app);
export const auth = getAuth(app);