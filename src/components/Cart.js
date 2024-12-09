// src/components/Cart.js
import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';  // Assuming you're using CartContext
import { useNavigate } from 'react-router-dom';  // For navigation after login
import './Cart.css';

function Cart() {
  const { cartItems, removeFromCart, addToCart } = useCart();
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('user') !== null);
  const [totalPrice, setTotalPrice] = useState(0);  // State for total price
  const navigate = useNavigate();

  useEffect(() => {
    // Calculate total price whenever cartItems change
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotalPrice(total);
  }, [cartItems]);  // This effect runs when cartItems change

  const handleRemove = (item) => {
    removeFromCart(item);
  };

  const handleQuantityChange = (item, change) => {
    if (item.quantity + change >= 1) {
      addToCart({ ...item, quantity: item.quantity + change });
    }
  };

  const handleProceedToCheckout = () => {
    if (!isLoggedIn) {
      alert('Please log in to proceed to checkout.');
      navigate('/login'); // Redirect to login page if not logged in
    } else {
      // Redirect to credit card page
      window.location.href = '/credit-card';
    }
  };

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {cartItems.length > 0 ? (
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <p>${item.price}</p>

              <div className="quantity">
                <button onClick={() => handleQuantityChange(item, -1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => handleQuantityChange(item, 1)}>+</button>
              </div>

              <button onClick={() => handleRemove(item)}>Remove</button>
            </div>
          ))}
        </div>
      ) : (
        <p>Your cart is empty.</p>
      )}

      {/* Total Price */}
      {cartItems.length > 0 && (
        <div className="total-price">
          <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
        </div>
      )}

      {/* Proceed to checkout */}
      {cartItems.length > 0 && (
        <div className="checkout">
          <button onClick={handleProceedToCheckout}>Proceed to Checkout</button>
        </div>
      )}

      {/* Login Button */}
      {!isLoggedIn && (
        <div className="login">
          <button onClick={() => window.location.href = '/login'}>Login</button>
        </div>
      )}
    </div>
  );
}

export default Cart;
