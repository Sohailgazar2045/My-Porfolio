import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  HiMail,
  HiPhone,
  HiLocationMarker,
  HiPaperAirplane,
} from 'react-icons/hi';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import data from '../data.json';
import '../styles/Contact.css';

const Contact = () => {
  const { email, phone, location, linkedin, github } = data.personalInfo;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      alert('Message sent! (This is a demo)');
      setFormData({ name: '', email: '', message: '' });
      setIsSubmitting(false);
    }, 1000);
  };

  const contactInfo = [
    { icon: <HiMail />, label: 'Email', value: email, href: `mailto:${email}` },
    { icon: <HiPhone />, label: 'Phone', value: phone, href: `tel:${phone}` },
    { icon: <HiLocationMarker />, label: 'Location', value: location || 'Multan, Pakistan', href: null },
  ];

  const socialLinks = [
    { icon: <FaGithub size={20} />, href: github, label: 'GitHub' },
    { icon: <FaLinkedinIn size={20} />, href: linkedin, label: 'LinkedIn' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <section id="contact" className="contact">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="contact__header"
        >
          <span className="section-label">Contact</span>
          <h2 className="section-title">Let's Work Together</h2>
          <p className="section-subtitle">
            Have a project in mind? I'd love to hear about it. Let's build something great.
          </p>
        </motion.div>

        <div className="contact__grid">
          {/* Info Side */}
          <motion.div
            className="contact__info"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
          >
            <motion.div className="contact__info-intro" variants={itemVariants}>
              <h3>Get in touch</h3>
              <p>
                I'm always open to discussing new projects, creative ideas,
                or opportunities to be part of your vision.
              </p>
            </motion.div>

            <div className="contact__info-list">
              {contactInfo.map((item, index) => (
                <motion.div
                  key={index}
                  className="contact__info-item"
                  variants={itemVariants}
                >
                  <div className="contact__info-icon">{item.icon}</div>
                  <div className="contact__info-text">
                    <span className="contact__info-label">{item.label}</span>
                    {item.href ? (
                      <a href={item.href} className="contact__info-value">
                        {item.value}
                      </a>
                    ) : (
                      <span className="contact__info-value">{item.value}</span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div className="contact__socials" variants={itemVariants}>
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact__social-link"
                  aria-label={link.label}
                >
                  {link.icon}
                </a>
              ))}
            </motion.div>
          </motion.div>

          {/* Form Side */}
          <motion.form
            className="contact__form glow-card"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
          >
            <div className="contact__form-group">
              <label htmlFor="name" className="contact__label">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="contact__input"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="contact__form-group">
              <label htmlFor="email" className="contact__label">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="contact__input"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="contact__form-group">
              <label htmlFor="message" className="contact__label">
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                className="contact__input contact__textarea"
                placeholder="Tell me about your project..."
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary contact__submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                'Sending...'
              ) : (
                <>
                  Send Message
                  <HiPaperAirplane className="btn-icon" />
                </>
              )}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
