import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginScreen.css';
import logo from '../assets/KneeKare_Pro_Logo.jpg';

const LoginScreen = () => {
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);
  const [loginAs, setLoginAs] = useState('');
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');

  // Hardcoded credentials
  const validCredentials = {
    patient: { username: 'testpatient', password: 'patient123' },
    clinician: { username: 'testclinician', password: 'clinician123' },
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prevCredentials => ({
      ...prevCredentials,
      [name]: value
    }));
  };

  const handleLogin = () => {
    const validUser = validCredentials[loginAs];
    if (credentials.username === validUser.username && credentials.password === validUser.password) {
      let profilePath = loginAs === 'patient' ? '/patient-profile' : '/clinician-profile';
      navigate(profilePath);
    } else {
      setErrorMessage('Invalid username or password. Please try again.');
    }
  };

  const initiateLogin = (role) => {
    setShowLogin(true);
    setLoginAs(role);
    setCredentials({ username: '', password: '' }); // Reset credentials on role change
    setErrorMessage(''); // Reset error message
  };

  return (
    <div className="login-container">
      <img src={logo} alt="KneeKare Pro Logo" className="logo" />
      {showLogin ? (
        <div className="login-section">
          <h2>Login as {loginAs.charAt(0).toUpperCase() + loginAs.slice(1)}</h2>
          <input 
            type="text" 
            placeholder="Username" 
            name="username" 
            value={credentials.username} 
            onChange={handleInputChange} 
            className="login-input" 
          />
          <input 
            type="password" 
            placeholder="Password" 
            name="password" 
            value={credentials.password} 
            onChange={handleInputChange} 
            className="login-input" 
          />
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button className="login-button" onClick={handleLogin}>Login</button>
          <button className="login-button cancel" onClick={() => setShowLogin(false)}>Cancel</button>
        </div>
      ) : (
        <>
          <p className="motto">Empowering Movement, Enhancing Recovery.</p>
          <button className="role-button" onClick={() => initiateLogin('patient')}>Login as Patient</button>
          <button className="role-button" onClick={() => initiateLogin('clinician')}>Login as Clinician</button>
        </>
      )}
    </div>
  );
};

export default LoginScreen;
