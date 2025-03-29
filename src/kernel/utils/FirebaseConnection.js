import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
    apiKey: "AIzaSyAbRHFqW5rvsPmOIp4-CIZ4-cY8YduBZ8A",
    authDomain: "airbnbe-6d160.firebaseapp.com",
    projectId: "airbnbe-6d160",
    storageBucket: "airbnbe-6d160.firebasestorage.app",
    messagingSenderId: "768287547617",
    appId: "1:768287547617:web:dc2e24a04e81d5e39e17a0"
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
const db = getFirestore(app);
const storage = getStorage(app);
export { app, auth, db, storage };