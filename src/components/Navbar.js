// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const isLoggedIn = localStorage.getItem('user'); // Check if the user is logged in

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <h1>EZTechMovie</h1> {/* App logo */}
        </Link>
        <ul className="navbar-links">
          <li>
            <Link to="/" className="navbar-link">Home</Link>
          </li>
          <li>
            <Link to="/subscriptions" className="navbar-link">Subscriptions</Link>
          </li>
          <li>
            <Link to="/cart" className="navbar-link">Cart</Link>
          </li>
          {isLoggedIn ? (
            <li>
              <button 
                className="navbar-button logout" 
                onClick={() => {
                  localStorage.removeItem('user'); // Log out
                  window.location.href = '/'; // Redirect to home
                }}>
                Logout
              </button>
            </li>
          ) : (
            <li>
              <Link to="/login" className="navbar-link">Login</Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
