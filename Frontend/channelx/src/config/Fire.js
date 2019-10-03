/*
Description: Updating Fire.js using constants 
Author: Sami
Date: 10/02/2019
*/

import firebase from "firebase";
import * as KEYS from '../constants/keys/keys';
// import 'firebase/auth';


const firebaseConfig = {
    apiKey: KEYS.API_KEY,
    authDomain: KEYS.AUTH_DOMAIN,
    databaseURL: KEYS.DATABASE_URL,
    projectId: KEYS.PROJECT_ID,
    storageBucket: KEYS.STORAGE_BUCKET,
    messagingSenderId: KEYS.MESSAGING_SENDER_ID,
    appId: KEYS.APP_ID,
    measurementId: KEYS.MEASUREMENTS_ID
  };
   

  // class fire {
  //   constructor() {
  //     firebase.initializeApp(firebaseConfig);
  //     this.auth = firebase.auth();
  //   }

  //   doCreateUserWithEmailAndPassword = (email, password) =>
  //   this.auth.createUserWithEmailAndPassword(email, password);

  //   doSignInWithEmailAndPassword = (email, password) =>
  //   this.auth.signInWithEmailAndPassword(email, password);

  //   doSignOut = () => this.auth.signOut();

  //   doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  //   doPasswordUpdate = password =>
  //   this.auth.currentUser.updatePassword(password);
  // }

  const fire = firebase.initializeApp(firebaseConfig);
  export default fire;
