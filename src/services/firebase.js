import { initializeApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Define variables in the top-level scope so they are always available for export
let app;
let auth;
let db;
const googleProvider = new GoogleAuthProvider();

try {
  if (!firebaseConfig.apiKey || firebaseConfig.apiKey === "mock-api-key") {
    throw new Error("Invalid or missing Firebase API Key.");
  }

  app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
  auth = getAuth(app);
  db = getFirestore(app);

  console.log("✅ Firebase initialized successfully.");
} catch (error) {
  console.error("⚠️ Firebase Fallback Mode:", error.message);
  // Safe mocks to prevent the app from crashing
  auth = { currentUser: null };
  db = {};
}

// --- EXPORTED FUNCTIONS ---
// These MUST be exported as named exports for Navbar.jsx to find them

export const loginWithGoogle = async () => {
  // Check if we have a real auth object and the necessary function
  if (!auth || typeof signInWithPopup !== 'function') {
    console.warn("Auth is not available in fallback mode.");
    return null;
  }
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error("Login failed:", error);
    return null;
  }
};

export const logout = async () => {
  if (auth && typeof signOut === 'function') {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }
};

export const syncUserDocument = async (user) => {
  if (!user || !db || !db.type === 'firestore') return; // Basic check for real DB

  try {
    const userRef = doc(db, "users", user.uid);
    const snap = await getDoc(userRef);

    if (!snap.exists()) {
      await setDoc(userRef, {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        age: "",
        pincode: "",
        voterJourneyProgress: 0,
        voterQuestHighScore: 0,
        createdAt: new Date().toISOString(),
      });
    }
  } catch (error) {
    console.error("Firestore sync error:", error);
  }
};

export { app, auth, db };