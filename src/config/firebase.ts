import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

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

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

if (typeof window !== 'undefined' && firebaseConfig.measurementId && firebaseConfig.apiKey) {
  import('firebase/analytics')
    .then(({ getAnalytics, isSupported }) =>
      isSupported().then((ok) => {
        if (ok) analyticsInstance = getAnalytics(app);
      })
    )
    .catch((error) => {
      console.warn('Firebase Analytics not initialized:', error);
    });
}

export default app;
