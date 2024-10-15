import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ClinicianProfile.css';

const clients = [
  { name: 'Test User', dob: '04/20/1969', username: 'testuser' }, // Works with Flask
  { name: 'Jane Smith', dob: '02/14/1975', username: 'janesmith' }, // Placeholder
  { name: 'Chris Johnson', dob: '03/30/1982', username: 'chrisjohnson' }, // Placeholder
  { name: 'Patricia Brown', dob: '04/25/1990', username: 'patriciabrown' }, // Placeholder
];

const ClinicianProfile = () => {
  const navigate = useNavigate();

  const handleClientClick = (client) => {
    if (client.username === 'testuser') {
      // Only Test User is functional and navigates to the profile
      navigate(`/patient-profile/${client.username}`);
    } else {
      // Placeholder: You can show a message or disable other users for now
      console.log(`${client.name} profile is not available in this demo.`);
    }
  };

  return (
    <div className="clinician-profile">
      {/* Updated title to match Patient Profile */}
      <h1 className="clinician-profile-title">CLINICIAN PROFILE</h1>
      
      <ul className="clients-list">
        {clients.map((client, index) => (
          <li 
            key={index} 
            className={`client-item ${client.username !== 'testuser' ? 'disabled' : ''}`} 
            onMouseDown={() => handleClientClick(client)}
          >
            {`${client.name} (DOB: ${client.dob})`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClinicianProfile;
