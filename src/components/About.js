// src/components/About.js
import React from 'react';

function About() {
  return (
    <div className="about">
      <h2>About This Application</h2>
      <p>This app allows you to subscribe to different plans, manage your shopping cart, and make payments securely using your credit card.</p>
      <p>It integrates Google OAuth for easy login and stores your credit card information securely in local storage (for demonstration purposes).</p>
    </div>
  );
}

export default About;
