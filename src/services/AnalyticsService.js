import { getAnalytics, logEvent as firebaseLogEvent } from "firebase/analytics";
import { app } from "./firebase";

const GA4_MEASUREMENT_ID = import.meta.env.VITE_FIREBASE_MEASUREMENT_ID;

let analytics = null;
try {
  if (app && GA4_MEASUREMENT_ID) {
    analytics = getAnalytics(app);
  }
} catch (error) {
  console.error("Analytics initialization failed:", error);
}

export const AnalyticsService = {
  logEvent(eventName, eventParams = {}) {
    if (analytics) {
      firebaseLogEvent(analytics, eventName, eventParams);
    }
  }
};
