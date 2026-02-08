// components/Footer.js
import React from 'react';
import data from '../data.json';
import '../styles/Footer.css';

const Footer = () => {
  const { name } = data.personalInfo;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <p>&copy; {currentYear} {name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;