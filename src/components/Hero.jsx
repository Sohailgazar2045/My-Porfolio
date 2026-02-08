// components/Hero.js
import React from 'react';
import data from '../data.json';
import '../styles/Hero.css';

const Hero = () => {
  const { name, title, resumeUrl, profileImage } = data.personalInfo;

  return (
    <section id="home" className="hero">
      <div className="container">
        <div className="hero-content">
          <h1 className="hero-title">
            Hi, I'm <span className="text-gradient">{name}</span>
          </h1>
          <h2 className="hero-subtitle">{title}</h2>
          <p className="hero-description">
            I build exceptional digital experiences that make an impact.
          </p>
          <div className="hero-buttons">
            <a href="#projects" className="btn btn-primary">
              View My Work
            </a>
            <a href={resumeUrl} className="btn btn-secondary" download>
              Download CV
            </a>
          </div>
        </div>
        <div className="hero-image">
          <img 
            src={profileImage} 
            alt={`${name} - Profile`}
            className="profile-image"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextElementSibling.style.display = 'flex';
            }}
          />
          <div className="image-placeholder" style={{ display: 'none' }}>
            <span>Profile Image</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;