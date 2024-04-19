import React, { useState, useEffect } from 'react';
import loadingGif from '../assets/loadingscreen.gif'; // Ensure the path is correct
import './UserProfile.css';

const UserProfile = () => {
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Adjust this URL to match your WebSocket server
    const ws = new WebSocket('ws://localhost:80');

    ws.onopen = () => {
      console.log('WebSocket Connected');
      setLoading(false); // Connection open, hide loading screen
    };

    ws.onmessage = (event) => {
      console.log('Data received:', event.data);
      setData(event.data);
      setLoading(false); // Data received, hide loading screen
    };

    ws.onerror = (error) => {
      console.error('WebSocket Error:', error);
      setLoading(true); // Error occurred, show loading screen
    };

    ws.onclose = () => {
      console.error('WebSocket Disconnected');
      setLoading(true); // Connection closed, show loading screen
      // Optionally implement reconnection logic here
    };

    // Cleanup function to close WebSocket when component unmounts
    return () => {
      ws.close();
    };
  }, []);

  return (
    <div className="user-profile">
      <h1>Patient Profile</h1>
      {loading ? (
        <div>
          <p>Looking for Trinket device...</p>
          <img src={loadingGif} alt="Loading" className="loading-gif" />
        </div>
      ) : (
        <div>
          <p>Potentiometer value: {data}</p>
          {/* Optionally render more data/details here */}
        </div>
      )}
    </div>
  );
};

export default UserProfile;

