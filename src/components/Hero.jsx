import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { HiArrowDown, HiDownload, HiStatusOnline } from 'react-icons/hi';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import data from '../data.json';
import '../styles/Hero.css';

const Hero = () => {
  const { name, resumeUrl, profileImage, github, linkedin } = data.personalInfo;
  const [displayText, setDisplayText] = useState('');
  const [currentRole, setCurrentRole] = useState(0);

  const roles = useMemo(() => [
    'Full Stack Developer',
    'React Specialist',
    'Node.js Engineer',
    'Problem Solver',
  ], []);

  useEffect(() => {
    let charIndex = 0;
    let isDeleting = false;
    let timeoutId;

    const type = () => {
      const current = roles[currentRole];
      if (!isDeleting) {
        setDisplayText(current.substring(0, charIndex + 1));
        charIndex++;
        if (charIndex === current.length) {
          timeoutId = setTimeout(() => { isDeleting = true; type(); }, 2000);
          return;
        }
      } else {
        setDisplayText(current.substring(0, charIndex - 1));
        charIndex--;
        if (charIndex === 0) {
          isDeleting = false;
          setCurrentRole((prev) => (prev + 1) % roles.length);
          return;
        }
      }
      timeoutId = setTimeout(type, isDeleting ? 40 : 80);
    };

    timeoutId = setTimeout(type, 500);
    return () => clearTimeout(timeoutId);
  }, [currentRole, roles]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
  };

  return (
    <section id="home" className="hero">
      <div className="hero__bg">
        <div className="hero__aurora" />
        <div className="hero__orb hero__orb--1" />
        <div className="hero__orb hero__orb--2" />
        <div className="hero__orb hero__orb--3" />
        <div className="hero__grid" />
        <div className="hero__vignette" />
      </div>

      <div className="container hero__container">
        <motion.div
          className="hero__content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="hero__status" variants={itemVariants}>
            <HiStatusOnline className="hero__status-dot" />
            <span>Available for work</span>
          </motion.div>

          <motion.h1 className="hero__name" variants={itemVariants}>
            <span className="hero__name-first">{name.split(' ')[0]}</span>
            {' '}
            <span className="hero__name-last">{name.split(' ').slice(1).join(' ')}</span>
            <span className="hero__name-dot">.</span>
          </motion.h1>

          <motion.div className="hero__role-wrapper" variants={itemVariants}>
            <span className="hero__role-prefix">I build </span>
            <span className="hero__role-text">{displayText}</span>
            <span className="hero__cursor">|</span>
          </motion.div>

          <motion.p className="hero__description" variants={itemVariants}>
            Crafting high-performance, scalable web applications with clean architecture
            and exceptional user experiences. 3+ years turning complex problems into elegant solutions.
          </motion.p>

          <motion.div className="hero__actions" variants={itemVariants}>
            <a href="#projects" className="btn btn-primary hero__btn-glow">
              View My Work
              <HiArrowDown className="btn-icon" />
            </a>
            <a href={resumeUrl} className="btn btn-secondary" download>
              <HiDownload className="btn-icon" />
              Download CV
            </a>
          </motion.div>

          <motion.div className="hero__socials" variants={itemVariants}>
            <a href={github} target="_blank" rel="noopener noreferrer" className="hero__social-link" aria-label="GitHub">
              <FaGithub size={20} />
            </a>
            <a href={linkedin} target="_blank" rel="noopener noreferrer" className="hero__social-link" aria-label="LinkedIn">
              <FaLinkedinIn size={20} />
            </a>
            <span className="hero__social-line" />
            <span className="hero__social-text">Let&apos;s connect</span>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero__visual"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="hero__image-glow" />
          <div className="hero__image-wrapper">
            <div className="hero__image-ring hero__image-ring--outer" />
            <div className="hero__image-ring hero__image-ring--inner" />
            <img
              src={profileImage}
              alt={`${name} - Profile`}
              className="hero__image"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextElementSibling.style.display = 'flex';
              }}
            />
            <div className="hero__image-placeholder" style={{ display: 'none' }}>
              <span>{name.split(' ').map(n => n[0]).join('')}</span>
            </div>
          </div>

          <div className="hero__badge hero__badge--1">
            <span className="hero__badge-dot" style={{ background: '#61dafb' }} />
            <span>React</span>
          </div>
          <div className="hero__badge hero__badge--2">
            <span className="hero__badge-dot" style={{ background: '#68a063' }} />
            <span>Node.js</span>
          </div>
          <div className="hero__badge hero__badge--3">
            <span className="hero__badge-dot" style={{ background: '#3178c6' }} />
            <span>TypeScript</span>
          </div>
        </motion.div>
      </div>

      <div className="hero__scroll-indicator">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <HiArrowDown size={18} />
        </motion.div>
        <span className="hero__scroll-text">Scroll</span>
      </div>
    </section>
  );
};

export default Hero;
