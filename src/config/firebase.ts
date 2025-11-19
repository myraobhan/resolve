import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Analytics is optional and may fail if API key / measurement id are not configured
let analytics: any = null;
export let analyticsInstance: any = null;

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL || undefined,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || undefined,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Analytics only when measurementId and apiKey are present
try {
  if (firebaseConfig.measurementId && firebaseConfig.apiKey) {
    // load analytics lazily to avoid throwing during dev when config is incomplete
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { getAnalytics } = require('firebase/analytics');
    analytics = getAnalytics(app);
    // expose analytics instance for other modules
    analyticsInstance = analytics;
  }
} catch (error) {
  // Don't crash the app when analytics initialization fails (common in local dev)
  // Log the error for diagnostics
  // eslint-disable-next-line no-console
  console.warn('Firebase Analytics not initialized:', error);
}

export default app;
