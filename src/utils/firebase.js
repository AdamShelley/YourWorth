import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCPDGFjxb2Rh_GnDqYwS1qe7oAmqHdisTk",
  authDomain: "finance-dashboard-9f10e.firebaseapp.com",
  databaseURL:
    "https://finance-dashboard-9f10e-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "finance-dashboard-9f10e",
  storageBucket: "finance-dashboard-9f10e.appspot.com",
  messagingSenderId: "795444392244",
  appId: "1:795444392244:web:700693986fb8e5844b7561",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
