import React from 'react';
import loadingGif from '../assets/loadingscreen.gif'; // Update the path if needed
import './UserProfile.css'; // Ensure this path is correct

const UserProfile = () => {
  return (
    <div className="user-profile">
      <h1>Patient Profile</h1>
      <p>Looking for Trinket device...</p>
      <img src={loadingGif} alt="Loading" className="loading-gif" />
      {/* Rest of your component */}
    </div>
  );
};

export default UserProfile;
