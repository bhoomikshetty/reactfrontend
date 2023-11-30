import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CourseList = () => {
    const [courses, setCourses] = useState([]);
  
    useEffect(() => {
      fetchCourses();
    }, []);
  
    const fetchCourses = () => {
      axios.get('https://happy-deer-pumps.cyclic.app/courses')
        .then(response => setCourses(response.data))
        .catch(error => console.error('Error fetching courses:', error));
    };
  
    const handleDelete = (id) => {
      axios.delete(`https://happy-deer-pumps.cyclic.app/courses/${id}`)
        .then(() => fetchCourses())
        .catch(error => console.error('Error deleting course:', error));
      
        fetchCourses();
    };
  
    const handleEdit = (id, updatedData) => {
      axios.put(`https://happy-deer-pumps.cyclic.appcourses/${id}`, updatedData)
        .then(() => fetchCourses())
        .catch(error => console.error('Error updating course:', error));

        fetchCourses();
      
    };
  
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {courses.map(course => (
          <div key={course.id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px', minWidth: '200px' }}>
            <h3>Course Name : {course.name}</h3>
            <p>Instructor: {course.instructor}</p>
            <button onClick={() => handleDelete(course.id)}>Delete</button>
            <button onClick={() => handleEdit(course.id, { name: 'New Name' })}>Edit</button>
          </div>
        ))}
      </div> 
    );
  };
  
  export default CourseList;