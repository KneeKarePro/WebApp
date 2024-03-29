import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginScreen from './components/LoginScreen';
import UserProfile from './components/UserProfile';
import ClinicianProfile from './components/ClinicianProfile';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/patient-profile" element={<UserProfile />} />
        <Route path="/clinician-profile" element={<ClinicianProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
