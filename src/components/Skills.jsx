// components/Skills.js
import React from 'react';
import data from '../data.json';
import '../styles/Skills.css';

const Skills = () => {
  const { skills } = data;

  return (
    <section id="skills" className="skills">
      <div className="container">
        <h2 className="section-title">Technical Skills</h2>
        <div className="skills-container">
          {Object.entries(skills).map(([category, items]) => (
            <div key={category} className="skill-category">
              <h3 className="skill-category-title">
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </h3>
              <div className="skill-items">
                {items.map((skill, index) => (
                  <span key={index} className="skill-item">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;