import React, { useEffect } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      navigate('/'); // Redirect to home if the user is already logged in
    }
  }, [navigate]);

  const handleLoginSuccess = (response) => {
    localStorage.setItem('user', response.credential);
    navigate('/'); // Redirect to the home page after successful login
  };

  const handleLoginError = (error) => {
    console.error('Login Failed:', error);
  };

  return (
    <div className="login">
      <h2>Login to Your Account</h2>
      <GoogleLogin
        onSuccess={handleLoginSuccess}
        onError={handleLoginError}
        useOneTap
      />
    </div>
  );
}

export default Login;
