"use client"; 
import React, { use } from "react";
import "./style.css";
import { useSearchParams } from "next/navigation";

export default function Watch() {
  const videoThumbnails = new Array(7).fill(
    "/assets/images/video-placeholder.jpg"
  );

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
            <div className="commentInputField">{}</div>
            <div className="commentButtonFrame">
              <button className="commentButton">Comment</button>
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
