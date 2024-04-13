import React from 'react';
import './style.css';

export default function CoursePage() {
  // We'll assume that course and video details are fetched from somewhere,
  // and they are in the format of [{title: "Video #1", thumbnail: "/path/to/image", description: "Description"}]
  const courseDetails = {
    courseName: 'Intro to AI',
    courseNumber: 'CS 3600',
    professorName: 'Thad Starner',
    lectures: 10,
    students: 100
  };

  const videoDetails = new Array(6).fill({
    title: 'Title',
    thumbnail: '/assets/images/video-placeholder.jpg',
    description: 'Description'
  });

  return (
    <div className="courseRoot">
      <div className="courseThumbnail"></div>
      <div className="courseInfo">
        <h1>{`${courseDetails.courseNumber} - ${courseDetails.courseName}`}</h1>
        <p>{courseDetails.professorName}</p>
        <p>{`Lectures: ${courseDetails.lectures} | Students: ${courseDetails.students}`}</p>
      </div>
      <div className="searchBar"></div>
      <div className="videoGrid">
        {videoDetails.map((video, index) => (
          <div key={index} className="videoCard">
            <div className="videoThumbnail" style={{ backgroundImage: `url(${video.thumbnail})` }}></div>
            <div className="videoTitle">{video.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
