import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAriXtndSVOuQflbJpbPWuEw0gdtdwlLxI",
  authDomain: "blog-portfolio-a48cd.firebaseapp.com",
  projectId: "blog-portfolio-a48cd",
  storageBucket: "blog-portfolio-a48cd.firebasestorage.app",
  messagingSenderId: "345115050610",
  appId: "1:345115050610:web:0b56e0f652250761df38eb",
  measurementId: "G-Q48S5Z60YS",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;
