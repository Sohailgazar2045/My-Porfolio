import { useState, useEffect, useMemo, useRef } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import { HiArrowDown, HiDownload, HiStatusOnline } from 'react-icons/hi';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import data from '../data.json';
import { springSnappy, staggerContainer, fadeUpItem } from '../lib/motion';
import '../styles/Hero.css';

const MARQUEE_ITEMS = [
  'React', 'Next.js', 'Node.js', 'NestJS', 'TypeScript', 'PostgreSQL',
  'GraphQL', 'AWS', 'Docker', 'Framer Motion',
];

const Hero = () => {
  const { name, resumeUrl, profileImage, github, linkedin } = data.personalInfo;
  const [displayText, setDisplayText] = useState('');
  const [currentRole, setCurrentRole] = useState(0);
  const stageRef = useRef(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 120, damping: 18 });
  const sy = useSpring(my, { stiffness: 120, damping: 18 });
  const rotateX = useTransform(sy, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(sx, [-0.5, 0.5], [-10, 10]);

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

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return undefined;

    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      mx.set(px);
      my.set(py);
    };

    const onLeave = () => {
      mx.set(0);
      my.set(0);
    };

    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    return () => {
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
    };
  }, [mx, my]);

  const nameParts = name.split(' ');
  const firstName = nameParts[0] || '';
  const restName = nameParts.slice(1).join(' ');

  const containerVariants = staggerContainer(0.11, 0.08);
  const itemVariants = fadeUpItem;

  return (
    <section id="home" className="hero">
      <div className="hero__canvas" aria-hidden>
        <div className="hero__mesh" />
        <div className="hero__rings" />
        <div className="hero__grid" />
        <div className="hero__noise" />
      </div>

      <div className="hero__marquee" aria-hidden>
        <div className="hero__marquee-track">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((label, i) => (
            <span key={i} className="hero__marquee-item">{label}</span>
          ))}
        </div>
      </div>

      <div className="container hero__layout">
        <motion.div
          className="hero__copy"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >

          <motion.div className="hero__status" variants={itemVariants}>
            <HiStatusOnline className="hero__status-dot" />
            <span>Available for work</span>
          </motion.div>

          <motion.h1 className="hero__title" variants={itemVariants}>
            <span className="hero__title-row">
              <motion.span
                className="hero__title-word hero__title-word--1"
                initial={{ opacity: 0, y: 48, rotate: -2 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                transition={{ ...springSnappy, delay: 0.12 }}
              >
                {firstName}
              </motion.span>
            </span>
            <span className="hero__title-row">
              <motion.span
                className="hero__title-word hero__title-word--2"
                initial={{ opacity: 0, y: 48, rotate: 2 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                transition={{ ...springSnappy, delay: 0.22 }}
              >
                {restName}
              </motion.span>
              <motion.span
                className="hero__title-dot"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15, delay: 0.45 }}
              >
                .
              </motion.span>
            </span>
          </motion.h1>

          <motion.div className="hero__role" variants={itemVariants}>
            <span className="hero__role-prefix">I build </span>
            <span className="hero__role-text">{displayText}</span>
            <span className="hero__cursor">|</span>
          </motion.div>

          <motion.p className="hero__lead" variants={itemVariants}>
            High-performance web products — clean architecture, sharp UX,
            and 3+ years shipping full-stack systems end to end.
          </motion.p>

          <motion.div className="hero__actions" variants={itemVariants}>
            <motion.a
              href="#projects"
              className="btn btn-primary hero__btn-primary"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              View work
              <HiArrowDown className="btn-icon" />
            </motion.a>
            <motion.a
              href={resumeUrl}
              className="btn btn-secondary"
              download
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <HiDownload className="btn-icon" />
              Résumé
            </motion.a>
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
          ref={stageRef}
          className="hero__stage"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.85, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          style={{
            rotateX,
            rotateY,
            transformPerspective: 1100,
            transformStyle: 'preserve-3d',
          }}
        >
          <div className="hero__stage-glow" />
          <div className="hero__frame">
            <div className="hero__frame-corner hero__frame-corner--tl" />
            <div className="hero__frame-corner hero__frame-corner--br" />
            <div className="hero__image-wrap">
              <img
                src={profileImage}
                alt={`${name} — profile`}
                className="hero__image"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextElementSibling.style.display = 'flex';
                }}
              />
              <div className="hero__image-fallback" style={{ display: 'none' }}>
                <span>{name.split(' ').map((n) => n[0]).join('')}</span>
              </div>
            </div>
          </div>

          <motion.div
            className="hero__chip hero__chip--1"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span className="hero__chip-dot" style={{ background: '#38bdf8' }} />
            React
          </motion.div>
          <motion.div
            className="hero__chip hero__chip--2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 5.1, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
          >
            <span className="hero__chip-dot" style={{ background: '#4ade80' }} />
            Node
          </motion.div>
          <motion.div
            className="hero__chip hero__chip--3"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
          >
            <span className="hero__chip-dot" style={{ background: '#c084fc' }} />
            TypeScript
          </motion.div>
        </motion.div>
      </div>

      <div className="hero__scroll">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <HiArrowDown size={18} />
        </motion.div>
        <span>Scroll</span>
      </div>
    </section>
  );
};

export default Hero;
