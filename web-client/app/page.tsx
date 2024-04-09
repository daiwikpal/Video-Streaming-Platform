"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import styles from './myCoursesPage.module.css';

interface Course {
    id: number;
    image: string;
    courseNumber: string;
    courseName: string;
    professorName: string;
}
 
// Sample course data
const courses: Course[] = [
    {
        id: 1,
        image: 'course1.jpg',
        courseNumber: 'CS3600',
        courseName: 'Intro to AI',
        professorName: 'Dr. Thad Starner',
    },
    {
        id: 2,
        image: 'course2.jpg',
        courseNumber: 'CS3451',
        courseName: 'Computer Graphics',
        professorName: 'Prof. Bo Zhu',
    },
    // Add more sample course data as needed
];

// Course card component
const CourseCard: React.FC<Course> = ({ id, image, courseNumber, courseName, professorName }) => {
    return (
        // Wrap the card content with Link
        <Link href={`/course/${id}`} passHref>
            <div className={styles['course-card']}>
                <img src={image} alt={courseName} />
                <div className={styles['course-details']}>
                    <h2>{courseNumber}</h2>
                    <h3>{courseName}</h3>
                    <p>{professorName}</p>
                </div>
            </div>
        </Link>
    );
};
// Grid view component
const GridView: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [courseCode, setCourseCode] = useState('');

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleJoinCourse = () => {
        // Implement join course functionality here
        console.log('Joining course with code:', courseCode);
        // Reset the input
        setCourseCode('');
        // Close the modal
        closeModal();
    };

    return (
        <>
            <div className={styles['grid-view']}>
                {courses.map(course => (
                    <CourseCard key={course.id} {...course} />
                ))}
            </div>
            <button className={styles['add-course-btn']} onClick={openModal}>Add Course</button>

            {/* Popup/modal */}
            {isModalOpen && (
                <div className={styles['popup']}>
                    <button className={styles['close-btn']} onClick={closeModal}>×</button>
                    <h2>Enter Course Code</h2>
                    <input
                        type="text"
                        value={courseCode}
                        onChange={(e) => setCourseCode(e.target.value)}
                        placeholder="Enter course code"
                    />
                    <button className={styles['join-course-btn']} onClick={handleJoinCourse}>Join Course</button>
                </div>
            )}
        </>
    );
};

export default GridView;
