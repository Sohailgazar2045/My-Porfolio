import { useRef, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { HiCalendar, HiChevronDown } from 'react-icons/hi';
import data from '../data.json';
import { fadeBlurUp, fadeUpItem, staggerContainer } from '../lib/motion';
import '../styles/Experience.css';

const RAIL_PAIRS = [
  ['#b1552f', '#c9713f'],
  ['#7c7a4a', '#9a9a5e'],
  ['#9c6242', '#bd8a5a'],
];

const PREVIEW = 2;

const Experience = () => {
  const { experience } = data;
  const [expanded, setExpanded] = useState(null);
  const gridRef = useRef(null);

  // Draw the timeline spine in as the section scrolls through view.
  const { scrollYProgress } = useScroll({
    target: gridRef,
    offset: ['start 75%', 'end 55%'],
  });
  const spineScale = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.5 });

  const containerVariants = staggerContainer(0.1, 0.05);
  const cardVariants = fadeUpItem;

  return (
    <section id="experience" className="experience">
      <div className="experience__ambient" aria-hidden />
      <div className="container experience__container">
        <span className="section-mark" aria-hidden="true">E</span>
        <motion.div
          variants={fadeBlurUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="experience__header"
        >
          <span className="section-label section-label--glow">Experience</span>
          <h2 className="section-title">Where I&apos;ve <span className="text-gradient">worked</span></h2>
          <p className="section-subtitle">
            Three roles over about three years. Expand any one to see what I
            actually worked on.
          </p>
        </motion.div>

        <motion.div
          className="experience__grid"
          ref={gridRef}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
        >
          <motion.span
            className="experience__spine"
            style={{ scaleY: spineScale }}
            aria-hidden="true"
          />
          {experience.map((exp, index) => {
            const isOpen = expanded === index;
            const hasMore = exp.responsibilities.length > PREVIEW;
            const items = isOpen ? exp.responsibilities : exp.responsibilities.slice(0, PREVIEW);
            const [from, to] = RAIL_PAIRS[index % RAIL_PAIRS.length];
            const extraCount = exp.responsibilities.length - PREVIEW;

            return (
              <motion.article
                key={index}
                className="experience__card glow-card"
                variants={cardVariants}
              >
                <div
                  className="experience__rail"
                  style={{ background: `linear-gradient(180deg, ${from}, ${to})` }}
                  aria-hidden
                />
                <div className="experience__inner">
                  <div className="experience__meta">
                    <span className="experience__index">{String(index + 1).padStart(2, '0')}</span>
                    <span className="experience__duration">
                      <HiCalendar aria-hidden />
                      {exp.duration}
                    </span>
                  </div>

                  <p className="experience__org">{exp.company}</p>
                  <h3 className="experience__position">{exp.position}</h3>

                  <div className="experience__divider" aria-hidden />

                  <div className="experience__highlights">
                    <span className="experience__highlights-label">Highlights</span>
                    <motion.ul layout className="experience__list">
                      {items.map((item, i) => (
                        <li key={i} className="experience__list-item">
                          <span className="experience__marker" aria-hidden />
                          <span>{item}</span>
                        </li>
                      ))}
                    </motion.ul>
                  </div>

                  {hasMore && (
                    <button
                      type="button"
                      className="experience__expand"
                      onClick={() => setExpanded(isOpen ? null : index)}
                      aria-expanded={isOpen}
                    >
                      <span className="experience__expand-text">
                        {isOpen
                          ? 'Collapse'
                          : `View ${extraCount} more highlight${extraCount === 1 ? '' : 's'}`}
                      </span>
                      <motion.span
                        className="experience__expand-icon"
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <HiChevronDown aria-hidden />
                      </motion.span>
                    </button>
                  )}
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
