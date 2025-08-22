import { initializeApp } from '@react-native-firebase/app';
import { getAuth } from '@react-native-firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDoXs9C7Eb9bzVoI288TVpJJQ98eA1H_8g",
  authDomain: "skinsync-c39aa.firebaseapp.com",
  projectId: "skinsync-c39aa",
  storageBucket: "skinsync-c39aa.appspot.com",
  messagingSenderId: "573482467649",
  appId: "1:573482467649:android:24b78af0bd54f6acb8e1c0", 
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
