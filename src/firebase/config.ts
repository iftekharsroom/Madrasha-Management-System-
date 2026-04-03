import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAShai3kW-hGXnBfpgyGIEfORSG1gYje6c",
  authDomain: "web-app-f41d0.firebaseapp.com",
  projectId: "web-app-f41d0",
  storageBucket: "web-app-f41d0.firebasestorage.app",
  messagingSenderId: "223321630612",
  appId: "1:223321630612:web:2f482c89026c1ced519181",
  measurementId: "G-FS2D0WYS28",
  databaseURL: "https://web-app-f41d0-default-rtdb.firebaseio.com"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
export const storage = getStorage(app);

export default app;
