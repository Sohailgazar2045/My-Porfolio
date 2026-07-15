import { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useReducedMotion,
} from 'framer-motion';
import { HiArrowDown, HiDownload } from 'react-icons/hi';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import data from '../data.json';
import { staggerContainer, fadeUpItem, revealContainer, revealLine } from '../lib/motion';
import Magnetic from './Magnetic';
import '../styles/Hero.css';

// Middots (not em-dashes) keep the phrase short enough to sit on the
// seal's circumference with a clear gap — em-dashes are ~1em wide each
// and pushed the text into itself.
const SEAL_TEXT = 'AVAILABLE FOR WORK · FULL-STACK ENGINEER · ';

const Hero = () => {
  const { name, email, resumeUrl, profileImage, github, linkedin, location } = data.personalInfo;
  const [firstName, lastName] = name.split(' ');
  const city = location?.split(',')[0] || 'Lahore';
  const reduce = useReducedMotion();

  const sectionRef = useRef(null);
  const portraitRef = useRef(null);

  // Scroll parallax — portrait and seal drift at different rates as
  // the hero leaves the viewport, giving the composition real depth.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 90]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -40]);

  // Cursor tilt on the portrait — subtle, spring-damped 3D.
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 150, damping: 16 });
  const sry = useSpring(ry, { stiffness: 150, damping: 16 });

  const handleTilt = (e) => {
    if (reduce || !portraitRef.current) return;
    const rect = portraitRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    ry.set(px * 12);
    rx.set(-py * 12);
  };
  const resetTilt = () => {
    rx.set(0);
    ry.set(0);
  };

  const container = staggerContainer(0.08, 0.5);
  const item = fadeUpItem;

  return (
    <section id="home" className="hero" ref={sectionRef}>
      <div className="hero__aurora" aria-hidden="true" />

      <motion.div className="container hero__layout">
        <motion.div className="hero__copy" style={{ y: copyY }}>
          <motion.p
            className="hero__meta"
            variants={container}
            initial="hidden"
            animate="visible"
          >
            <motion.span variants={item}>Full-stack developer</motion.span>
            <motion.span className="hero__meta-dot" variants={item} aria-hidden="true" />
            <motion.span variants={item}>{location}</motion.span>
            <motion.span className="hero__meta-dot" variants={item} aria-hidden="true" />
            <motion.span className="hero__meta-status" variants={item}>
              <span className="hero__meta-live" aria-hidden="true" />
              Open to work
            </motion.span>
          </motion.p>

          <motion.h1
            className="hero__title"
            variants={revealContainer(0.12, 0.15)}
            initial="hidden"
            animate="visible"
            aria-label={name}
          >
            <span className="hero__title-clip" aria-hidden="true">
              <motion.span className="hero__title-line" variants={revealLine}>
                {firstName}
              </motion.span>
            </span>
            <span className="hero__title-clip" aria-hidden="true">
              <motion.span
                className="hero__title-line hero__title-line--accent"
                variants={revealLine}
              >
                {lastName}
              </motion.span>
            </span>
          </motion.h1>

          <motion.div variants={container} initial="hidden" animate="visible">
            <motion.p className="hero__statement" variants={item}>
              I build the <em>quiet machinery</em> behind the product — web apps
              end&nbsp;to&nbsp;end, and the <em>automation</em> that runs on its own.
            </motion.p>

            <motion.p className="hero__lead" variants={item}>
              Three years in, {city}-based — mostly across React, Next.js and Node.
              Lately: AI pipelines, a TypeScript trading bot, and payment &amp;
              messaging flows that mostly run themselves.
            </motion.p>

            <motion.div className="hero__actions" variants={item}>
              <Magnetic strength={0.4}>
                <a href="#projects" className="btn btn-primary hero__cta">
                  View work
                  <HiArrowDown className="btn-icon" />
                </a>
              </Magnetic>
              <Magnetic strength={0.3}>
                <a href={resumeUrl} className="btn btn-secondary" download>
                  <HiDownload className="btn-icon" />
                  Résumé
                </a>
              </Magnetic>
            </motion.div>

            <motion.div className="hero__socials" variants={item}>
              <Magnetic strength={0.5}>
                <a href={github} target="_blank" rel="noopener noreferrer" className="hero__social-link" aria-label="GitHub">
                  <FaGithub size={19} />
                </a>
              </Magnetic>
              <Magnetic strength={0.5}>
                <a href={linkedin} target="_blank" rel="noopener noreferrer" className="hero__social-link" aria-label="LinkedIn">
                  <FaLinkedinIn size={19} />
                </a>
              </Magnetic>
              <span className="hero__social-line" aria-hidden="true" />
              <a href={`mailto:${email}`} className="hero__social-text">Say hi</a>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.figure
          className="hero__portrait"
          style={{ y: portraitY }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            className="hero__photo"
            ref={portraitRef}
            onPointerMove={handleTilt}
            onPointerLeave={resetTilt}
            style={{ rotateX: srx, rotateY: sry, transformPerspective: 900 }}
          >
            <div className="hero__photo-inner">
              <img
                src={profileImage}
                alt={`Portrait of ${name}`}
                className="hero__image"
                loading="eager"
                onError={(e) => {
                  // Fall back to the previous photo, then to initials.
                  if (!e.target.dataset.fallback) {
                    e.target.dataset.fallback = '1';
                    e.target.src = '/sohail.jpeg';
                    return;
                  }
                  e.target.style.display = 'none';
                  const next = e.target.nextElementSibling;
                  if (next) next.style.display = 'flex';
                }}
              />
              <div className="hero__image-fallback" style={{ display: 'none' }}>
                <span>{name.split(' ').map((n) => n[0]).join('')}</span>
              </div>
            </div>

            {/* Rotating wax-seal badge — a signature focal detail */}
            <div className="hero__seal" aria-hidden="true">
              <svg viewBox="0 0 100 100" className="hero__seal-svg">
                <defs>
                  <path
                    id="seal-path"
                    d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                  />
                </defs>
                <text className="hero__seal-text">
                  <textPath href="#seal-path" startOffset="0">
                    {SEAL_TEXT}
                  </textPath>
                </text>
              </svg>
              <span className="hero__seal-mark">
                <HiArrowDown />
              </span>
            </div>
          </motion.div>

          <figcaption className="hero__photo-caption">
            <span className="hero__photo-caption-mark" aria-hidden="true" />
            Currently in {city}
          </figcaption>
        </motion.figure>
      </motion.div>

      <a href="#about" className="hero__scroll" aria-label="Scroll to about">
        <span>Scroll</span>
        <HiArrowDown size={15} aria-hidden="true" />
      </a>
    </section>
  );
};

export default Hero;
