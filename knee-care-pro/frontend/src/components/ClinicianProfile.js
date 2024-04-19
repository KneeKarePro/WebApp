import React, { useState } from 'react';
import './ClinicianProfile.css'; // Ensure this path is correct based on your file structure

// Sample client data
const clients = [
  { name: 'John Doe', dob: '01/18/1969' },
  { name: 'Jane Smith', dob: '02/14/1975' },
  { name: 'Chris Johnson', dob: '03/30/1982' },
  { name: 'Patricia Brown', dob: '04/25/1990' },
  { name: 'Michael Davis', dob: '05/16/1985' },
  // Add more as needed
];

const ClinicianProfile = () => {

  const handleClientClick = (client) => {
    // Simulate navigation to client's detailed profile
    console.log("Navigating to the profile of: ", client.name);
    // Here you would typically navigate to another component
    // For example: navigate(`/client-profile/${client.name}`);
  };

  return (
    <div className="clinician-profile">
      <h1>Clinician Profile</h1>
      <ul className="clients-list">
        {clients.map((client, index) => (
          <li key={index} className="client-item" onMouseDown={() => handleClientClick(client)}>
            {`${client.name} DOB: ${client.dob}`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClinicianProfile;
