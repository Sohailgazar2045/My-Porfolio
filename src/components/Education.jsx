// components/Education.js
import React from 'react';
import data from '../data.json';
import '../styles/Education.css';

const Education = () => {
  const { education } = data;

  return (
    <section id="education" className="education">
      <div className="container">
        <h2 className="section-title">Education</h2>
        <div className="education-container">
          {education.map((edu, index) => (
            <div key={index} className="education-item">
              <h3 className="education-degree">{edu.degree}</h3>
              <p className="education-institution">{edu.institution}</p>
              <span className="education-period">{edu.duration}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;