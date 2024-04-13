import React from 'react';
import './style.css';

export default function CoursePage() {
  // Example data for video details
  const videoDetails = [
    { title: 'Introduction to AI', thumbnail: 'https://i.ytimg.com/vi/SSE4M0gcmvE/maxresdefault.jpg', description: 'Video 1 Description' },
    { title: 'History of AI', thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROWtrw_24b76Of1QzStt6bG8xapakrJhiUizQWBmme7g&s', description: 'Video 2 Description' },
    { title: 'Graph search algorithms', thumbnail: 'https://dist.neo4j.com/wp-content/uploads/20181010052900/breadth-first-search-graph-algorithm-example.png', description: 'Video 3 Description' },
    { title: 'Reinforcement learning', thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgFMM70i4aGvzkKWUc7Ls7yuIoRQ6c6vq7H0UdvYrddg&s', description: 'Video 4 Description' },
    { title: 'Artificial intelligence principles', thumbnail: '/assets/images/video2-placeholder.jpg', description: 'Video 5 Description' },
    { title: 'AI 4', thumbnail: '/assets/images/video2-placeholder.jpg', description: 'Video 6 Description' },

  ];

  return (
    <div className="courseRoot">
      <div className="courseHeaderImage"></div> {/* Placeholder for course header image */}
      <div className="courseInfo">
        <h1>CS 3600 - Intro to AI</h1>
        <p>Thad Starner</p>
        <p>Lectures: 6 | Students: 300</p>
      </div>
      <div className="videoGrid">
        {videoDetails.map((video, index) => (
          <div key={index} className="videoCard">
            <div className="videoThumbnail" style={{ backgroundImage: `url(${video.thumbnail})` }}>
            </div>
            <div className="videoTitle">{video.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
