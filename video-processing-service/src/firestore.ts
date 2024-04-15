import { credential } from "firebase-admin";
import { initializeApp } from "firebase-admin/app";
import { Firestore } from "firebase-admin/firestore";

// const serviceAccount = require('../config/serviceAccountKey.json');

initializeApp({
  credential: credential.applicationDefault(),
});

const db = new Firestore(); 

const videoCollection = 'videos'

export interface Video {
    id?: string, 
    uid?: string, 
    filename?: string, 
    status?: 'processing' | 'processed',
    title?: string, 
    description?: string
}

async function getVideo(videoId: string){
    const snapshot = await db.collection(videoCollection).doc(videoId).get(); 
    return (snapshot.data() as Video) ?? {}; 

}

export function setVideo(videoId: string, video: Video){
    return db.collection(videoCollection).doc(videoId).set(video, {merge: true})
}

export async function isVideoNew(videoId: string){
    const video = await getVideo(videoId); 
    return video?.status === undefined; 
}