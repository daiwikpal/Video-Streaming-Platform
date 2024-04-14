/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import {onRequest} from "firebase-functions/v2/https";
import {initializeApp} from "firebase-admin/app";
import {Firestore} from "firebase-admin/firestore";
import * as logger from "firebase-functions/logger";
import * as functions from "firebase-functions";

import path = require("path");
import { Storage, GetSignedUrlConfig } from "@google-cloud/storage";

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

initializeApp();

const firestore = new Firestore();

export const helloWorld = onRequest((request, response) => {
  logger.info("Hello logs!", {structuredData: true});
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

// The ID of GCS bucket
const bucketName = 'video-streaming-platform-raw-videos';

// The full path of service account file containing google credentials 
const fileName = path.join(__dirname, "../video-streaming-platform-b0cda-fae64af23946.json");

// Creates a client
const storage = new Storage();

async function generateV4UploadSignedUrl() {
  // These options will allow temporary uploading of the file with outgoing
  // Content-Type: application/octet-stream header.
  const options: GetSignedUrlConfig = {
    version: 'v4',
    action: 'write',
    expires: Date.now() + 15 * 60 * 1000, // 15 minutes
    contentType: 'application/octet-stream',
  };

  // Get a v4 signed URL for uploading file
  const [url] = await storage
    .bucket(bucketName)
    .file(fileName)
    .getSignedUrl(options);

  console.log('Generated PUT signed URL:');
  console.log(url);
}

generateV4UploadSignedUrl().catch(console.error);
