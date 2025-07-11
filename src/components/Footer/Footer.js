import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Antoree</h3>
            <p>Bài test thực tập Antoree.</p>
          </div>
          <div className="footer-section">
            <h4>Contact Info</h4>
            <p>Email: info@reactapp.com</p>
            <p>Phone: +1 234 567 890</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 React App. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 