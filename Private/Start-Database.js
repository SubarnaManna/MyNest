// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAiE_AUjNLKh_QGRq1uqd4_t-3fJMDZzDY",
  authDomain: "mynest-diversion2k24.firebaseapp.com",
  projectId: "mynest-diversion2k24",
  storageBucket: "mynest-diversion2k24.appspot.com",
  messagingSenderId: "865727437493",
  appId: "1:865727437493:web:1af36823cd50319504fcfc",
  measurementId: "G-1VWEQCW79W"
};


export default function Start_DB() {
    
    // Initialize Firebase
    // const app = initializeApp(firebaseConfig);
    initializeApp(firebaseConfig);
    // const analytics = getAnalytics(app);
    console.log("DB Connected...");
}


/* 
    ######## #### ########  ######## ########     ###     ######  ########
     ##        ##  ##     ## ##       ##     ##  ##   ##  ##       ##
     ######    ##  ########  ######   ########  #########  ######  ######
     ##        ##  ##    ##  ##       ##     ## ##     ##       ## ##
     ##       #### ##     ## ######## ########  ##     ##  ######  ########

     // For Deploy : 
     Step 1: npm run build 
     Step 2: firebase init
     Step 3: Select options 
     Step 4: index.html no write build folder.
     Step 5: update firebase configuration file 
     Step 6: firebase deploy --only hosting    

*/