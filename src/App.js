// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Cart from './components/Cart';
import Subscription from './components/Subscription';  // Import Subscription
import CreditCard from './components/CreditCard';
import ProtectedRoute from './components/ProtectedRoute';
import { CartProvider } from './context/CartContext';  // Import CartProvider
import './App.css';

function App() {
  const isLoggedIn = localStorage.getItem('user'); // Check if the user is logged in

  return (
    <GoogleOAuthProvider clientId="5277011479-e9tof3thm3hsd6aa0crtl2aho7joiqph.apps.googleusercontent.com">
      <CartProvider>  {/* Wrap your app with CartProvider */}
        <Router>
          <Navbar />
          <div className="app-content">
            <Routes>
              <Route path="/" element={<Home />} />
              
              {/* Protected routes */}
              <Route path="/cart" element={
                isLoggedIn ? <Cart /> : <Navigate to="/login" />
              } />
              <Route path="/subscriptions" element={
                isLoggedIn ? <Subscription /> : <Navigate to="/login" />
              } />
              <Route path="/credit-card" element={
                isLoggedIn ? <CreditCard /> : <Navigate to="/login" />
              } />
              
              {/* Login route */}
              <Route path="/login" element={
                isLoggedIn ? (
                  <Navigate to="/" /> // Redirect to home if already logged in
                ) : (
                  <GoogleLogin
                    onSuccess={(response) => {
                      localStorage.setItem('user', response.credential);
                      const redirectPath = localStorage.getItem('redirectPath') || '/cart'; // Redirect after login
                      localStorage.removeItem('redirectPath'); // Remove the redirect path after use
                      window.location.href = redirectPath; // Redirect to the saved path
                    }}
                    onError={(error) => console.log('Login Failed:', error)}
                  />
                )
              } />
            </Routes>
          </div>
        </Router>
      </CartProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
