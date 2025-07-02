import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserFromToken } from '../utils/auth'; // assuming this exists
import './Auth.css';

const Account = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userEmail = localStorage.getItem('email');
    if (!token || !userEmail) {
      navigate('/login');
    } else {
      setEmail(userEmail);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    navigate('/');
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>My Account</h2>
        <p><strong>Email:</strong> {email}</p>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Account;
