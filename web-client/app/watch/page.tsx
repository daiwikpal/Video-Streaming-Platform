"use client";
import React, { useState, use } from "react";
import "./style.css";
import { app } from '../firebase/firebase';
import { useSearchParams } from "next/navigation";
import { collection, doc, getFirestore, setDoc, serverTimestamp } from "firebase/firestore";
import { setMessage } from "../firebase/functions";

export default function Watch() {
  const [comment, setComment] = useState('');
  const videoThumbnails = new Array(7).fill(
    "/assets/images/video-placeholder.jpg"
  );
  

  const addComment = async () => {
    if (comment.trim() === '') return;
  
    try {
      // put video ID, user ID, and username, figure out how to get them
      const uid = 'user-id';
      const username = 'username';
      const videoID = 'video-id';

      await setMessage("CQbKTVHr0uCLck4JxM8N", {
        commentText: comment,
        uid: uid,
        username: username,
        videoID: videoID,
        timestamp: serverTimestamp()

      })

      // const database = getFirestore(app);
  
      // Create a new reference with a generated id in the 'messages' collection
      // and add the comment data to the new reference



    //   console.log(comment); 
    //   const newCommentDoc = doc(database, 'messages', 'CQbKTVHr0uCLck4JxM8N');
    //   await setDoc(newCommentDoc, {
    //     commentText: comment,
    //     uid: uid,
    //     username: username,
    //     videoID: videoID,
    //     timestamp: serverTimestamp()
    //   });
  
    //   setComment('');
    
    } catch (error) {
      console.error("Error adding comment: ", error);
    }
  };


  const videoSrc = useSearchParams().get('v'); 
  const videoPrefix = 'https://storage.googleapis.com/video-streaming-platform-processed-videos/'

  return (
    <div className="root">
      <div className="header">
        {/*<div className="logo"></div> {}*}
        {/*<div className="searchField"></div> {}*/}
      </div>

      <div className="contentContainer">
        <div className="leftContainer">
          <div className="mainVideo">
            <video className="mainVideo" controls src = {videoPrefix + videoSrc} />
          </div>
          <div className="titleDescription">
            <div className="title">Title</div>
            <div className="description">Description</div>
          </div>

          <div className="addComment">
            <div className="commentInputField">
              {/* Textarea for adding comments */}
              <textarea 
                className="commentInput" 
                placeholder="Add a comment..." 
                value={comment}  
                onChange={(e) => {
                  const value = e.target.value;
                  setComment(value);
                  console.log("button pressed");
                }}>
              </textarea>
            </div>
            <div className="commentButtonFrame">
              <button className="commentButton" onClick={addComment}>Comment</button>
            </div>
          </div>
          <div className="commentsFrame">
            <div className="comments">Comments</div>
            <div className="commentArea">{}</div>
          </div>
        </div>
        <div className="rightContainer">
          <div className="moreVideos">
            {videoThumbnails.map((thumbnailSrc, index) => (
              <div
                key={index}
                className="videoThumbnail"
                style={{ backgroundImage: `url(${thumbnailSrc})` }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
