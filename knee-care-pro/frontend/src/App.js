import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginScreen from './components/LoginScreen';
import ClinicianProfile from './components/ClinicianProfile';
import UserProfile from './components/UserProfile'; // Ensure this import is correct

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/clinician-profile" element={<ClinicianProfile />} />
        {/* Handle both routes for Patient Profile */}
        <Route path="/patient-profile" element={<UserProfile />} />  {/* For direct patient login */}
        <Route path="/patient-profile/:username" element={<UserProfile />} />  {/* For clinician navigation */}
      </Routes>
    </Router>
  );
};

export default App;

