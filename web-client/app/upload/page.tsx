"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import styles from './uploadPage.module.css';
import { uploadVideo } from '../firebase/functions';


export default function Upload() {
    const [showVideos, setShowVideos] = useState(true);
    const [showPopup, setShowPopup] = useState(false); // Add this line
    const [showCreatePlaylist, setShowCreatePlaylist] = useState(false);
    // Sidenav bar for upload page
    const sideNav = (
        <div className={`${styles.sidenav}`}>
            <div className={`${styles['channel-circle']}`}>
                <div className={`${styles.circle}`}></div>
                <div className={`${styles['channel-name']}`}>MyChannelName</div>
            </div>
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/content">Content</Link>
            <Link href="/analytics">Analytics</Link>
            <Link href="/comments">Comments</Link>
            <Link href="/copyright">Copyright</Link>
            <Link href="/settings">Settings</Link>
        </div>
    );

    // Channel header
    const channelHeader = (
        <div className={styles['channel-header']}>
            <div className={styles['channel-title']}>Channel Content</div>
        </div>
    );
    const channelHeader2 = (
        <div className={styles['subheader']}>
            <button
                onClick={() => {
                    setShowVideos(true);
                    setShowCreatePlaylist(false); // Hide Create Playlist button when switching to Videos
                }}
                className={showVideos ? styles.active : ''}
            >
                Videos
            </button>
            <div className={styles['subheader-space']}></div>
            <button
                onClick={() => {
                    setShowVideos(false);
                    setShowCreatePlaylist(true); // Show Create Playlist button when switching to Playlists
                }}
                className={!showVideos ? styles.active : ''}
            >
                Playlists
            </button>
        </div>
    );
    
    const createPlaylistButtonClass = showCreatePlaylist ? styles['show-create-playlist-button'] : styles['hide-create-playlist-button'];

    const createPlaylistButton = (
        <div className={`${styles['create-playlist-button']} ${createPlaylistButtonClass}`}>
            <button>Create Playlist</button>
        </div>
    );
    // Subheader 2
    const subheading2 = showVideos && (
        <div className={styles['subheader2']}>
            <div className={styles['subheader2']}>Video</div>
            <div className={styles['subheader2-space']}></div>
            <div className={styles['subheader2-space']}></div>
            <div className={styles['subheader2']}>Date</div>
            <div className={styles['subheader2-space']}></div>
            <div className={styles['subheader2']}>Views</div>
            <div className={styles['subheader2-space']}></div>
            <div className={styles['subheader2']}>Comments</div>
            <div className={styles['subheader2-space']}></div>
            <div className={styles['subheader2']}>Likes</div>
            <div className={styles['subheader2-space']}></div>
        </div>
    );

    // Sample video entry
    const videos = [
        {
            title: 'a day in my life',
            date: 'October 18th, 2022',
            views: 40,
            comments: 5,
            likes: 20,
        },
    ];

    // Video list
    const videoList = showVideos && (
        <div className={styles['video-list']}>
            {videos.map((video) => (
                <div key={video.title} className={styles['video-item']}>
                    <div className={styles['video-stats']}>
                        <span>{video.title}</span>
                        <span>{video.date}</span>
                        <span>{video.views} views</span>
                        <span>{video.comments} comments</span>
                        <span>{video.likes} likes</span>
                    </div>
                </div>
            ))}
        </div>
    );

    const fileInputRef = React.useRef<HTMLInputElement>(null);


// Function to trigger the file input when the Upload button is clicked
    const handleUploadClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    // Function to handle file selection
    const handleFileChange = (event: any) => {
        const file = event.target.files?.item(0);
        if (file.length > 0) {
            // Process the selected file here (e.g., upload to a server)
            console.log("Selected file:", file);
        }

        handleUpload(file); 
    };

    const handleUpload = async (file: File) => {
        try {
            const response = await uploadVideo(file); 
            alert(`Sucessfully uploaded file!`); 
        }catch(error){
            alert(`Failed to upload file: ${error}`); 
        }

    }



    // Upload Button
    const uploadButton = showVideos && (
        <div className={styles['channel-header']}>
            <div className={styles['upload-button-spacing']} onClick={handleUploadClick}>
                <button>Upload</button>
            </div>

            <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    accept="video/*" // Accept only video files
                    onChange={handleFileChange}
            />
            {/* {showPopup && (
                <div className={styles['popup']}>
                    <div className={styles['popup-header']}>
                        <h2>Add Files</h2>
                        <button className={styles['exit-button']} onClick={() => setShowPopup(false)}>
                            Exit
                        </button>
                    </div>
                    <button>+</button>
                </div>
            )} */}
        </div>
    );

    return (
        <div className={styles.app}>
            {sideNav}
            <div className={styles['main-content']}>
                {channelHeader}
                {channelHeader2}
                {subheading2}
                {videoList}
                {uploadButton}
            </div>
        </div>
    );
}
