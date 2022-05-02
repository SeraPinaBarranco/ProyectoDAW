  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.7.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.7.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyCCArJFLg2iCmxctUWB0QAiZXQRuv4kiNA",
    authDomain: "proyectodaw-4bc87.firebaseapp.com",
    projectId: "proyectodaw-4bc87",
    storageBucket: "proyectodaw-4bc87.appspot.com",
    messagingSenderId: "438054642270",
    appId: "1:438054642270:web:ad0fa8d2ec861a910e0acf",
    measurementId: "G-M3CT0QW94M"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);