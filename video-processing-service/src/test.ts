import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const serviceAccount = require("../config/serviceAccountKey.json");

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

const testData = {
  publicURL: "https://example.com/video.mp4",
  id: "test-video-id-1",
};

db.collection("videos")
  .doc("test-doc-id")
  .set(testData)
  .then(() => {
    console.log("Test data written to Firestore successfully");
  })
  .catch((error) => {
    console.error("Error writing test data:", error);
  });
