// components/Contact.js
import React, { useState } from 'react';
import data from '../data.json';
import '../styles/Contact.css';

const Contact = () => {
  const { email, phone, linkedin, github } = data.personalInfo;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic would go here
    alert('Message sent! (This is a demo)');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="contact">
      <div className="container">
        <h2 className="section-title">Get In Touch</h2>
        <div className="contact-content">
          <div className="contact-info">
            <h3>Let's talk about your project</h3>
            <p>I'm available for freelance work and new opportunities.</p>
            <div className="contact-details">
              <div className="contact-item">
                <strong>Email:</strong>
                <a href={`mailto:${email}`}>{email}</a>
              </div>
              <div className="contact-item">
                <strong>Phone:</strong>
                <a href={`tel:${phone}`}>{phone}</a>
              </div>
            </div>
            <div className="social-links">
              <a href={linkedin} className="social-link">
                LinkedIn
              </a>
              <a href={github} className="social-link">
                GitHub
              </a>
            </div>
          </div>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;