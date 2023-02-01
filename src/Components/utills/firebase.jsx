import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import {getAuth} from "firebase/auth"
import {getStorage } from "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyDVm1SuxaMz_cXqV98mLiehqY4BeTwpAZA",
    authDomain: "recipe-app-ca280.firebaseapp.com",
    databaseURL: "https://recipe-app-ca280-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "recipe-app-ca280",
    storageBucket: "recipe-app-ca280.appspot.com",
    messagingSenderId: "329482178241",
    appId: "1:329482178241:web:564ded9dda4e403f29ce40"
  };

  const app = initializeApp(firebaseConfig);
  export const db = getDatabase(app);
  export const auth = getAuth(app);
  export const dbStorage = getStorage(app);