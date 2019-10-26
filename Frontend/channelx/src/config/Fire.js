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
const fire = firebase.initializeApp(firebaseConfig);



export const auth = firebase.auth();
export const db = firebase.firestore();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const facebookProvider = new firebase.auth.FacebookAuthProvider();
export const twitterProvider = new firebase.auth.TwitterAuthProvider();
export const githubProvider = new firebase.auth.GithubAuthProvider();
export const emailProvider = new firebase.auth.EmailAuthProvider();
export default fire;
