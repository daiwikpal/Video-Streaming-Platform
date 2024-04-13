import React from 'react';
import './style.css';

export default function CoursePage() {
  // Example data for video details
  const videoDetails = [
    { title: 'Introduction to AI', thumbnail: '/assets/images/video1-placeholder.jpg', description: 'Video 1 Description' },
    { title: 'History of AI', thumbnail: '/assets/images/video2-placeholder.jpg', description: 'Video 2 Description' },
    { title: 'History of AI', thumbnail: '/assets/images/video2-placeholder.jpg', description: 'Video 2 Description' },
    { title: 'History of AI', thumbnail: '/assets/images/video2-placeholder.jpg', description: 'Video 2 Description' },
    { title: 'History of AI', thumbnail: '/assets/images/video2-placeholder.jpg', description: 'Video 2 Description' },
    { title: 'History of AI', thumbnail: '/assets/images/video2-placeholder.jpg', description: 'Video 2 Description' },

  ];

  return (
    <div className="courseRoot">
      <div className="courseHeaderImage"></div> {/* Placeholder for course header image */}
      <div className="courseInfo">
        <h1>CS 3600 - Intro to AI</h1>
        <p>Thad Starner</p>
        <p>Lectures: 6 | Students: 300</p>
      </div>
      <div className="searchBar"></div> {/* Placeholder for search bar */}
      <div className="videoGrid">
        {videoDetails.map((video, index) => (
          <div key={index} className="videoCard">
            <div className="videoThumbnail" style={{ backgroundImage: `url(${video.thumbnail})` }}>
              {/* Placeholder for play icon, if needed */}
            </div>
            <div className="videoTitle">{video.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
