// src/components/CreditCard.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // To handle redirect after form submission
import './CreditCard.css';

function CreditCard() {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [isCardValid, setIsCardValid] = useState(true);

  const navigate = useNavigate();

  const handleCardNumberChange = (event) => {
    let value = event.target.value.replace(/\D/g, ''); // Remove non-numeric characters
    if (value.length <= 16) {
      value = value.replace(/(\d{4})(\d{1,4})?(\d{1,4})?(\d{1,4})?/, '$1 $2 $3 $4'); // Format as 1234 5678 9012 3456
      setCardNumber(value);
    }
  };

  const handleExpiryDateChange = (event) => {
    let value = event.target.value.replace(/\D/g, ''); // Remove non-numeric characters
    if (value.length <= 4) {
      value = value.replace(/(\d{2})(\d{1,2})?/, '$1/$2'); // Format as MM/YY
      setExpiryDate(value);
    }
  };

  const handleCvvChange = (event) => {
    const value = event.target.value.replace(/\D/g, ''); // Remove non-numeric characters
    if (value.length <= 3) {
      setCvv(value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Validate the card number, expiry date, and CVV
    if (cardNumber.replace(/\D/g, '').length === 16 && expiryDate.replace(/\D/g, '').length === 4 && cvv.length === 3) {
      localStorage.setItem('creditCard', JSON.stringify({ cardNumber, expiryDate, cvv }));
      alert('Card details saved successfully!');
      navigate('/cart'); // Redirect to cart or another page
    } else {
      setIsCardValid(false);
    }
  };

  return (
    <div className="credit-card">
      <h2>Enter Your Credit Card Information</h2>
      {!isCardValid && <p className="error-message">Please enter valid card details.</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Card Number
          <input
            type="text"
            value={cardNumber}
            onChange={handleCardNumberChange}
            maxLength={19} // Because of spaces in the format
            placeholder="1234 5678 9012 3456"
          />
        </label>
        <label>
          Expiry Date
          <input
            type="text"
            value={expiryDate}
            onChange={handleExpiryDateChange}
            maxLength={5} // Format MM/YY has 5 characters
            placeholder="MM/YY"
          />
        </label>
        <label>
          CVV
          <input
            type="text"
            value={cvv}
            onChange={handleCvvChange}
            maxLength={3}
            placeholder="123"
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default CreditCard;
