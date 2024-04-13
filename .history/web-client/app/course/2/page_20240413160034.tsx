import React from 'react';
import Link from 'next/link'; // Added Link import
import { Search } from 'lucide-react'; // Import the Search icon
import './style.css';

export default function CoursePage() {
  // Example data for video details
  const videoDetails = [
    { title: 'Introduction to AI', thumbnail: 'https://i.ytimg.com/vi/SSE4M0gcmvE/maxresdefault.jpg', description: 'Video 1 Description' },
    { title: 'History of AI', thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROWtrw_24b76Of1QzStt6bG8xapakrJhiUizQWBmme7g&s', description: 'Video 2 Description' },
    { title: 'Graph search algorithms', thumbnail: 'https://dist.neo4j.com/wp-content/uploads/20181010052900/breadth-first-search-graph-algorithm-example.png', description: 'Video 3 Description' },
  ];

  return (
    <div className="courseRoot">


      <div className="courseHeaderImage"></div>
      <div className="courseInfo">
        <h1>CS 3451 - Computer Graphics</h1>
        <p>Bo Zhu</p>
        <p>Lectures: 3 | Students: 169</p>
      </div>
      <div className="searchField">
        <input type="text" placeholder="Search..." />
        <button><Search /></button> 
      </div>

      <div className="videoGrid">
        {videoDetails.map((video, index) => (
          <Link href="/watch" key={index}>
            <div className="videoCard">
              <div className="videoThumbnail" style={{ backgroundImage: `url(${video.thumbnail})` }}></div>
              <div className="videoTitle">{video.title}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
