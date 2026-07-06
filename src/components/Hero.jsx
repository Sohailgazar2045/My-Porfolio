import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { HiArrowDown, HiDownload } from 'react-icons/hi';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import data from '../data.json';
import { staggerContainer, fadeUpItem } from '../lib/motion';
import '../styles/Hero.css';

const Hero = () => {
  const { name, resumeUrl, profileImage, github, linkedin, location } = data.personalInfo;
  const [displayText, setDisplayText] = useState('');
  const [currentRole, setCurrentRole] = useState(0);

  const roles = useMemo(() => [
    'web apps end to end',
    'APIs with Node & NestJS',
    'AI-assisted automation',
    'things that stay maintainable',
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
          timeoutId = setTimeout(() => { isDeleting = true; type(); }, 2200);
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
      timeoutId = setTimeout(type, isDeleting ? 40 : 85);
    };

    timeoutId = setTimeout(type, 500);
    return () => clearTimeout(timeoutId);
  }, [currentRole, roles]);

  const containerVariants = staggerContainer(0.1, 0.08);
  const itemVariants = fadeUpItem;

  return (
    <section id="home" className="hero">
      <div className="container hero__layout">
        <motion.div
          className="hero__copy"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="hero__status" variants={itemVariants}>
            <span className="hero__status-dot" aria-hidden />
            <span>Available for new work</span>
          </motion.div>

          <motion.h1 className="hero__title" variants={itemVariants}>
            {name}
          </motion.h1>

          <motion.p className="hero__role" variants={itemVariants}>
            I build&nbsp;
            <span className="hero__role-text">{displayText}</span>
            <span className="hero__cursor" aria-hidden />
          </motion.p>

          <motion.p className="hero__lead" variants={itemVariants}>
            I&apos;m a full-stack developer in {location?.split(',')[0] || 'Lahore'}. I build
            web apps end to end — mostly with React, Next.js and Node — and
            lately a lot of automation: AI pipelines, bots, and payment and
            messaging flows that run on their own.
          </motion.p>

          <motion.div className="hero__actions" variants={itemVariants}>
            <a href="#projects" className="btn btn-primary">
              View work
              <HiArrowDown className="btn-icon" />
            </a>
            <a href={resumeUrl} className="btn btn-secondary" download>
              <HiDownload className="btn-icon" />
              Résumé
            </a>
          </motion.div>

          <motion.div className="hero__socials" variants={itemVariants}>
            <a href={github} target="_blank" rel="noopener noreferrer" className="hero__social-link" aria-label="GitHub">
              <FaGithub size={19} />
            </a>
            <a href={linkedin} target="_blank" rel="noopener noreferrer" className="hero__social-link" aria-label="LinkedIn">
              <FaLinkedinIn size={19} />
            </a>
            <span className="hero__social-line" aria-hidden />
            <span className="hero__social-text">Say hi</span>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero__portrait"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="hero__photo">
            <img
              src={profileImage}
              alt={name}
              className="hero__image"
              onError={(e) => {
                e.target.style.display = 'none';
                const next = e.target.nextElementSibling;
                if (next) next.style.display = 'flex';
              }}
            />
            <div className="hero__image-fallback" style={{ display: 'none' }}>
              <span>{name.split(' ').map((n) => n[0]).join('')}</span>
            </div>
          </div>
          <span className="hero__photo-caption">{location}</span>
        </motion.div>
      </div>

      <a href="#about" className="hero__scroll" aria-label="Scroll to about">
        <span>Scroll</span>
        <HiArrowDown size={15} />
      </a>
    </section>
  );
};

export default Hero;
