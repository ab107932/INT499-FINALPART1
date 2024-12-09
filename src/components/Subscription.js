// src/components/Subscription.js
import React, { useState, useEffect } from 'react';
import { subscriptionItems } from '../Data'; // Ensure data is imported
import { useCart } from '../context/CartContext'; // Assuming you have a CartContext
import { GoogleLogin } from '@react-oauth/google'; // Import GoogleLogin
import { useNavigate } from 'react-router-dom'; // Import for redirection
import './Subscription.css';

function Subscription() {
  const { cartItems, addToCart } = useCart();
  const [warning, setWarning] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('user') !== null); // Check login status
  const navigate = useNavigate(); // For redirection

  useEffect(() => {
    // Check if subscription is already in the cart
    const subscriptionInCart = cartItems.some((item) => item.price > 0);
    setWarning(subscriptionInCart);
  }, [cartItems]);

  const handleAddToCart = (item) => {
    if (warning) return; // Prevent adding more than one subscription

    addToCart(item);
    setWarning(true); // Disable adding more subscriptions
  };

  const handleLoginSuccess = (response) => {
    // Store the user information after successful login
    localStorage.setItem('user', response.credential);
    setIsLoggedIn(true); // Set the login state to true
    navigate('/subscriptions'); // Navigate to subscriptions after login
  };

  const handleLoginFailure = (error) => {
    console.log('Login Failed:', error);
  };

  if (!isLoggedIn) {
    return (
      <div className="subscription">
        <h2>Please sign in to view subscriptions</h2>
        <GoogleLogin
          onSuccess={handleLoginSuccess}
          onError={handleLoginFailure}
        />
      </div>
    );
  }

  return (
    <div className="subscription">
      <h2>Choose Your Subscription</h2>
      {warning && <p className="warning">You can only add one subscription at a time.</p>}

      <div className="subscription-items">
        {subscriptionItems.length > 0 ? (
          subscriptionItems.map((item) => (
            <div key={item.id} className="subscription-item">
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <p>${item.price}</p>
              <button onClick={() => handleAddToCart(item)} disabled={warning}>
                {warning ? 'Already Added' : 'Add to Cart'}
              </button>
            </div>
          ))
        ) : (
          <p>No subscriptions available.</p>
        )}
      </div>
    </div>
  );
}

export default Subscription;
