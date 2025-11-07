import { initializeApp } from "firebase/app";
import { 
  createUserWithEmailAndPassword, 
  getAuth, 
  signInWithEmailAndPassword, 
  signOut 
} from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyDPdAihmH8ixXy7t03X2RCPfMv0UXXAUUg",
  authDomain: "netflix-clone-e6c92.firebaseapp.com",
  projectId: "netflix-clone-e6c92",
  storageBucket: "netflix-clone-e6c92.firebasestorage.app",
  messagingSenderId: "671452550913",
  appId: "1:671452550913:web:34c19ebc7683b73d67ad00"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Signup
const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;

    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });

    toast.success("Signup successful!");
    console.log("User signed up successfully:", user);
  } catch (error) {
    console.error("Signup error:", error);
    toast.error(getFirebaseError(error.code));
  }
};

// Login
const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    toast.success("Login successful!");
    console.log("Login successful!");
  } catch (error) {
    console.error("Login error:", error);
    toast.error(getFirebaseError(error.code));
  }
};

// Logout
const logout = async () => {
  try {
    await signOut(auth);
    toast.info("Logged out successfully!");
  } catch (error) {
    console.error("Logout error:", error);
    toast.error("Failed to log out. Try again.");
  }
};

// Error helper
const getFirebaseError = (code) => {
  switch (code) {
    case "auth/invalid-email":
      return "Invalid email format.";
    case "auth/user-not-found":
      return "No account found with this email.";
    case "auth/wrong-password":
      return "Incorrect password.";
    case "auth/email-already-in-use":
      return "Email already in use. Try logging in.";
    case "auth/weak-password":
      return "Password must be at least 6 characters.";
    default:
      return "Authentication failed. Please try again.";
  }
};

export { auth, db, login, signup, logout };
