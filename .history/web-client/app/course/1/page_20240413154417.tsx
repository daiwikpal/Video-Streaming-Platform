import React from 'react';
import Link from 'next/link'; // Added Link import
import './style.css';

export default function CoursePage() {
  // Example data for video details
  const videoDetails = [
    { title: 'Introduction to AI', thumbnail: 'https://i.ytimg.com/vi/SSE4M0gcmvE/maxresdefault.jpg', description: 'Video 1 Description' },
    { title: 'History of AI', thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROWtrw_24b76Of1QzStt6bG8xapakrJhiUizQWBmme7g&s', description: 'Video 2 Description' },
    { title: 'Graph search algorithms', thumbnail: 'https://dist.neo4j.com/wp-content/uploads/20181010052900/breadth-first-search-graph-algorithm-example.png', description: 'Video 3 Description' },
    { title: 'Reinforcement learning', thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgFMM70i4aGvzkKWUc7Ls7yuIoRQ6c6vq7H0UdvYrddg&s', description: 'Video 4 Description' },
    { title: 'Artificial intelligence principles', thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5l8dLvR9xWn4_DW6ruDYVmgbc_lqhW4Eg7K_a24n-yw&s', description: 'Video 5 Description' },
    { title: 'How to design intelligent systems', thumbnail: 'https://www.researchgate.net/publication/227094859/figure/fig3/AS:650035486281761@1531991945545/Intelligent-System-for-Decision-Support-Expert-Analysis-in-Layout-Design.png', description: 'Video 6 Description' },

  ];

  return (
    <div className="courseRoot">
      <div className="searchField">
        <input type="text" placeholder="Search..." />
        <button>Search</button>
      </div>

      <div className="courseHeaderImage"></div> {/* Placeholder for course header image */}
      <div className="courseInfo">
        <h1>CS 3600 - Intro to AI</h1>
        <p>Thad Starner</p>
        <p>Lectures: 6 | Students: 300</p>
      </div>
      <div className="videoGrid">
        {videoDetails.map((video, index) => (
          <Link href="/watch" key={index}> {/* Wrap videoCard div with Link component */}
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
