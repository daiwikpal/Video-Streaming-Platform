import React from 'react';
import Link from 'next/link'; // Added Link import
import { Search } from 'lucide-react'; // Import the Search icon
import './style.css';

export default function CoursePage() {
  // Example data for video details
  const videoDetails = [
    { title: '2D Transformations', thumbnail: 'https://www.oreilly.com/api/v2/epubs/9781783988204/files/graphics/B02052_05_06.jpg', description: 'Video 1 Description' },
    { title: 'Radiometry', thumbnail: 'https://cdn.shopify.com/s/files/1/0823/0287/files/response-curves.png?v=1673370533', description: 'Video 2 Description' },
    { title: 'Graphics Hardware Pipeline', thumbnail: 'https://www.cgchannel.com/wp-content/uploads/2010/11/pipeline.jpg', description: 'Video 3 Description' },
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
