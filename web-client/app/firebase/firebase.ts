// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
      apiKey: "AIzaSyDfdr2VGrQ6eJWuMy9Rnp0kZSZ1bqhr8kI",
      authDomain: "video-streaming-platform-b0cda.firebaseapp.com",
      projectId: "video-streaming-platform-b0cda",
      storageBucket: "video-streaming-platform-b0cda.appspot.com",
      messagingSenderId: "331679469986",
      appId: "1:331679469986:web:600647d531fc35aa0ee2fb",
      measurementId: "G-7G46J195D6"

};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);