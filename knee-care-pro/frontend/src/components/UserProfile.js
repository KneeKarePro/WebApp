import React, { useState, useEffect } from 'react';
import loadingGif from '../assets/loadingscreen.gif'; // Ensure the path is correct
import './UserProfile.css';

const UserProfile = () => {
  const [data, setData] = useState([]); // Initialize data as an empty array
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const username = 'testuser'; // Replace with the actual username

    const fetchData = async () => {
      try {
        console.log('Fetching data for:', username); // Debugging line
        const response = await fetch(`http://localhost:5000/data/${username}`);
        console.log('Response:', response); // Debugging line

        if (response.ok) {
          const result = await response.json();
          console.log('Data received:', result); // Log the result to see its structure
          setData(result.data); // Access the array within the data key
          setLoading(false);
        } else {
          console.error('Error fetching data:', response.statusText);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
    
    fetchData();

  }, []);

  return (
    <div className="user-profile">
      <h1>Patient Profile</h1>
      {loading ? (
        <div>
          <p>Loading data...</p>
          <img src={loadingGif} alt="Loading" className="loading-gif" />
        </div>
      ) : data.length > 0 ? (
        <div>
          {data.map((item, index) => (
            <div key={index}>
              <p>Angle: {item.angle}</p>
              <p>Rotation: {item.rotation}</p>
              <p>Timestamp: {new Date(item.timestamp).toLocaleString()}</p>
              <hr />
            </div>
          ))}
        </div>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default UserProfile;