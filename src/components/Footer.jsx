import { FaGithub, FaLinkedinIn, FaHeart } from 'react-icons/fa';
import { HiMail } from 'react-icons/hi';
import data from '../data.json';
import '../styles/Footer.css';

const Footer = () => {
  const { name, email, linkedin, github } = data.personalInfo;
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <FaGithub size={18} />, href: github, label: 'GitHub' },
    { icon: <FaLinkedinIn size={18} />, href: linkedin, label: 'LinkedIn' },
    { icon: <HiMail size={18} />, href: `mailto:${email}`, label: 'Email' },
  ];

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Insights', href: '#insights' },
    { label: 'Learn', href: '#learn' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__content">
          {/* Top section */}
          <div className="footer__top">
            <div className="footer__brand">
              <span className="footer__logo">
                MS<span className="footer__logo-dot">.</span>
              </span>
              <p className="footer__tagline">
                Building digital experiences that make an impact.
              </p>
            </div>

            <div className="footer__nav">
              <h4 className="footer__nav-title">Quick Links</h4>
              <ul className="footer__nav-list">
                {navLinks.map((link, index) => (
                  <li key={index}>
                    <a href={link.href} className="footer__nav-link">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer__connect">
              <h4 className="footer__nav-title">Connect</h4>
              <div className="footer__socials">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer__social-link"
                    aria-label={link.label}
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="footer__divider" />

          {/* Bottom section */}
          <div className="footer__bottom">
            <p className="footer__copyright">
              &copy; {currentYear} {name}. All rights reserved.
            </p>
            <p className="footer__made-with">
              Made with <FaHeart className="footer__heart" /> using React
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
