import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyCAb022sYkdhnnIXfOE-mxk3OX_4lpnbDE",
    authDomain: "channelx-93834.firebaseapp.com",
    databaseURL: "https://channelx-93834.firebaseio.com",
    projectId: "channelx-93834",
    storageBucket: "",
    messagingSenderId: "817549961423",
    appId: "1:817549961423:web:16b8c6b8ff1b15e8d36fba"
};

const fire = firebase.initializeApp(firebaseConfig);
export default fire;