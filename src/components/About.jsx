import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import data from '../data.json';
import { fadeBlurUp, fadeUpItem, staggerContainer } from '../lib/motion';
import '../styles/About.css';

const AnimatedCounter = ({ target, suffix = '' }) => {
  const num = parseInt(target, 10) || 0;
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!isInView) return;
    if (reduce) {
      setCount(num);
      return;
    }
    // rAF ease-out — always lands exactly on `num`, never stalls at 0.
    const duration = 1600;
    let raf = 0;
    let start = null;
    const tick = (t) => {
      if (start === null) start = t;
      const p = Math.min((t - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(num * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isInView, num, reduce]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const About = () => {
  const stats = [
    { number: '3', suffix: '+', label: 'Years experience' },
    { number: '20', suffix: '+', label: 'Projects shipped' },
    { number: '15', suffix: '+', label: 'Technologies' },
    { number: '300', suffix: 'K+', label: 'App downloads' },
  ];

  const highlights = [
    'Comfortable across the stack — React/Next.js on the front, Node/NestJS/FastAPI on the back',
    'Lately focused on automation: AI pipelines (Azure OpenAI, FastAPI) and a TypeScript trading bot',
    'Shipped payments and messaging integrations (Stripe, Twilio, MessageBird)',
    'Care more about code that survives a year than code that demos well',
  ];

  const containerVariants = staggerContainer(0.1, 0.1);
  const itemVariants = fadeUpItem;

  return (
    <section id="about" className="about">
      <div className="container about__container">
        <span className="section-mark" aria-hidden="true">A</span>
        <motion.div
          variants={fadeBlurUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="about__header"
        >
          <span className="section-label section-label--glow">About Me</span>
          <h2 className="section-title">A bit about how I <span className="text-gradient">work</span></h2>
        </motion.div>

        {/* Narrative + capabilities */}
        <div className="about__body">
          <motion.div
            className="about__narrative"
            variants={fadeBlurUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            <p className="about__lead">{data.summary}</p>
          </motion.div>

          <motion.div
            className="about__highlights"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            <span className="about__highlights-title">How I work</span>
            {highlights.map((item, index) => (
              <motion.div key={index} className="about__highlight" variants={itemVariants}>
                <span className="about__highlight-marker" aria-hidden="true" />
                <span>{item}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          className="about__stats"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {stats.map((stat, index) => (
            <motion.div key={index} className="about__stat-card" variants={itemVariants}>
              <span className="about__stat-bar" aria-hidden="true" />
              <span className="about__stat-index">{String(index + 1).padStart(2, '0')}</span>
              <div className="about__stat-number">
                <AnimatedCounter target={stat.number} suffix={stat.suffix} />
              </div>
              <div className="about__stat-label">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;
