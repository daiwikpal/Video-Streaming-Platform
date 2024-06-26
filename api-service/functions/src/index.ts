/* eslint-disable */

/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import { onCall, onRequest } from "firebase-functions/v2/https";
import { initializeApp } from "firebase-admin/app";
import { Firestore } from "firebase-admin/firestore";
import * as logger from "firebase-functions/logger";
import * as functions from "firebase-functions";

// import path = require("path");
import { Storage, GetSignedUrlConfig } from "@google-cloud/storage";

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

initializeApp();

const firestore = new Firestore();
const storage = new Storage();

const rawVideoBucketName = "video-streaming-platform-raw-videos";

export const helloWorld = onRequest((request, response) => {
  logger.info("Hello logs!", { structuredData: true });
  response.send("Hello from Firebase!");
});

export const createUser = functions.auth.user().onCreate((user) => {
  const userInfo = {
    uid: user.uid,
    email: user.email,
  };

  firestore.collection("users").doc(user.uid).set(userInfo);
  logger.info(`User Created: ${userInfo}`);
  return;
});

export const generateUploadURL = onCall({ maxInstances: 1 },  async (request) => {
    if (!request.auth) {
      throw new functions.https.HttpsError(
        "failed-precondition",
        "The function must be called while being authenticated."
      );
    }

    const auth = request.auth;
    const data = request.data;
    const bucket = storage.bucket(rawVideoBucketName);

    const fileName = `${auth.uid}-${Date.now()}.${data.fileExtension}`;

    const options: GetSignedUrlConfig = {
      version: "v4",
      action: "write",
      expires: Date.now() + 15 * 60 * 1000, // 15 minutes
    };

    // Get a v4 signed URL for uploading file
    const [url] = await bucket.file(fileName).getSignedUrl(options);

    return { url, fileName };
  }
); 

export const getVideos = onCall({ maxInstances: 1 },  async (request) => {
    const snapshot = await firestore.collection("videos").limit(10).get(); 
    return snapshot.docs.map((doc) => doc.data()); 
}); 