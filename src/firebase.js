import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB4ykIe8SNYtBsvynlKvIr00AK5D7r_DMM",
  authDomain: "react-iot-b524c.firebaseapp.com",
  databaseURL: "https://react-iot-b524c-default-rtdb.firebaseio.com",
  projectId: "react-iot-b524c",
  storageBucket: "react-iot-b524c.appspot.com",
  messagingSenderId: "1033276601299",
  appId: "1:1033276601299:web:ac89a745e6bffd100ff526",
};

const app = firebase.initializeApp(firebaseConfig);

export default app;
