import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyBTi6-MYDO-skqiSeuEJrlpaqe6URhUBtc",
    authDomain: "channelx-714c6.firebaseapp.com",
    databaseURL: "https://channelx-714c6.firebaseio.com",
    projectId: "channelx-714c6",
    storageBucket: "",
    messagingSenderId: "697701922217",
    appId: "1:697701922217:web:03e8c2f4961ea7228f00b8",
    measurementId: "G-7SJGHG1M48"
  };

const fire = firebase.initializeApp(firebaseConfig);
export default fire;