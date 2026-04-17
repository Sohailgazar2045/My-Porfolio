import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { HiCode, HiBriefcase, HiLightningBolt, HiChip } from 'react-icons/hi';
import data from '../data.json';
import { fadeBlurUp, fadeUpItem, staggerContainer } from '../lib/motion';
import '../styles/About.css';

const AnimatedCounter = ({ target, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!isInView) return;
    const num = parseInt(target, 10);
    const duration = 2000;
    const steps = 60;
    const increment = num / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= num) {
        setCount(num);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const About = () => {
  const stats = [
    { icon: <HiBriefcase />, number: '3', suffix: '+', label: 'Years Experience' },
    { icon: <HiCode />, number: '20', suffix: '+', label: 'Projects Delivered' },
    { icon: <HiChip />, number: '15', suffix: '+', label: 'Technologies' },
    { icon: <HiLightningBolt />, number: '300', suffix: 'K+', label: 'App Downloads' },
  ];

  const highlights = [
    'Building scalable SaaS products & trading bots',
    'Expert in React, Next.js, Node.js & NestJS ecosystems',
    'Experience with payment integrations (Stripe, Braintree)',
    'Strong focus on clean architecture & code quality',
  ];

  const containerVariants = staggerContainer(0.1, 0.15);
  const itemVariants = fadeUpItem;

  return (
    <section id="about" className="about">
      <div className="container">
        <motion.div
          variants={fadeBlurUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="about__header"
        >
          <span className="section-label">About Me</span>
          <h2 className="section-title">Passionate About Building<br />Digital Experiences</h2>
          <p className="section-subtitle">
            {data.summary}
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="about__stats"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {stats.map((stat, index) => (
            <motion.div key={index} className="about__stat-card glow-card" variants={itemVariants}>
              <div className="about__stat-icon">{stat.icon}</div>
              <div className="about__stat-number">
                <AnimatedCounter target={stat.number} suffix={stat.suffix} />
              </div>
              <div className="about__stat-label">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Highlights */}
        <motion.div
          className="about__highlights"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {highlights.map((item, index) => (
            <motion.div key={index} className="about__highlight" variants={itemVariants}>
              <span className="about__highlight-marker" />
              <span>{item}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;
