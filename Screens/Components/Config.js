import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyAb488opsTEaJFrae00_0QQJdnoh-wlAr0",
  authDomain: "songsta-5d560.firebaseapp.com",
  databaseURL: "https://songsta-5d560-default-rtdb.firebaseio.com",
  projectId: "songsta-5d560",
  storageBucket: "songsta-5d560.appspot.com",
  messagingSenderId: "283605803491",
  appId: "1:283605803491:web:f3ed30d8735dfaa75900d6"

};


const app = initializeApp(firebaseConfig);

export default app