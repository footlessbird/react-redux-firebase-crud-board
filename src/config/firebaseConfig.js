import * as firebase from "firebase";

/*
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import 'firebase/database'
*/

var config = {
  apiKey: "AIzaSyDu0vpbB3ZCJookzmh7gIpf67f9Shxu1-Y",
  authDomain: "simplecommunity-1fad0.firebaseapp.com",
  databaseURL: "https://simplecommunity-1fad0.firebaseio.com",
  projectId: "simplecommunity-1fad0",
  storageBucket: "simplecommunity-1fad0.appspot.com",
  messagingSenderId: "195346449472"
};

firebase.initializeApp(config);
firebase.firestore().settings({ timestampsInSnapshots: true });


export default firebase;
