import { useRef, useState } from 'react';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from 'framer-motion';
import { HiChevronDown, HiExternalLink } from 'react-icons/hi';
import { HiArrowUpRight } from 'react-icons/hi2';
import { FaGithub } from 'react-icons/fa';
import data from '../data.json';
import { fadeBlurUp, fadeUpItem } from '../lib/motion';
import '../styles/Projects.css';

const PREVIEW_COUNT = 6;

// A short domain label per project — meaningful categorisation
// instead of decorative colour. Keyed by title.
const PROJECT_TYPES = {
  'Mail Flow Agent — AI Document Pipeline': 'AI · Automation',
  'Dual-Market Arbitrage Bot (Kalshi + Polymarket)': 'Trading · Realtime',
  'SMS-Auto — Community Weft': 'Payments · Automation',
  'Growth Genie — Growth Platform': 'AI · Full-stack',
  'Order Pickup Dashboard — WynShop': 'Full-stack · PWA',
  QualityShopMarketplace: 'Frontend',
  'Contract Management System — Blitzy': 'Frontend',
  'E-Commerce Platform': 'Full-stack',
  'Company Portfolio Website': 'Full-stack',
  'Pakistan Petrol Price App — Backend (300K+ downloads)': 'Backend API',
  'Pakistani Brands App — Aggregation Backend': 'Backend · Scraping',
  'Currency Converter App — Backend': 'Backend API',
};

// A deep graphite-to-bronze accent per project — tints the floating
// "plate" preview so each project reads as its own object while the
// palette stays a restrained, matte, champagne-metallic family.
const PROJECT_ACCENTS = [
  ['#211f1c', '#4a3d2a'], ['#1d1c1a', '#3f3527'], ['#262320', '#554330'],
  ['#1c1b19', '#463a28'], ['#232019', '#5a4a30'], ['#1f1d1a', '#41372a'],
  ['#252017', '#5a4830'], ['#1b1a18', '#4d3f2b'], ['#211d17', '#50412c'],
  ['#1e1c19', '#463a29'], ['#242019', '#584727'], ['#1c1b18', '#4a3d2a'],
];

const Projects = () => {
  const { projects } = data;
  const [showAll, setShowAll] = useState(false);
  const [openIndex, setOpenIndex] = useState(0);
  const [hovered, setHovered] = useState(null);
  const reduce = useReducedMotion();
  const listRef = useRef(null);

  // Floating preview follows the cursor with a soft spring lag.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 260, damping: 28, mass: 0.6 });
  const sy = useSpring(py, { stiffness: 260, damping: 28, mass: 0.6 });

  const canPreview =
    !reduce &&
    typeof window !== 'undefined' &&
    window.matchMedia('(hover: hover) and (min-width: 900px)').matches;

  const handleListMove = (e) => {
    if (!canPreview) return;
    px.set(e.clientX);
    py.set(e.clientY);
  };

  const hasMore = projects.length > PREVIEW_COUNT;
  const visible = showAll ? projects : projects.slice(0, PREVIEW_COUNT);
  const hiddenCount = projects.length - PREVIEW_COUNT;

  const toggle = (i) => setOpenIndex((prev) => (prev === i ? null : i));
  const hoveredProject = hovered != null ? projects[hovered] : null;
  const hoveredAccent = PROJECT_ACCENTS[(hovered ?? 0) % PROJECT_ACCENTS.length];

  return (
    <section id="projects" className="projects">
      <div className="container projects__container">
        <span className="section-mark" aria-hidden="true">W</span>
        <motion.div
          variants={fadeBlurUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="projects__header"
        >
          <span className="section-label section-label--glow">Projects</span>
          <h2 className="section-title">Selected <span className="text-gradient">work</span></h2>
          <p className="section-subtitle">
            A few of the projects I&apos;ve built or worked on recently. Open any
            one for the details.
          </p>
        </motion.div>

        <div
          className="projects__list"
          ref={listRef}
          onPointerMove={handleListMove}
        >
          {visible.map((project, index) => {
            const isOpen = openIndex === index;
            const type = PROJECT_TYPES[project.title];
            const hasLinks = project.demoUrl !== '#' || project.githubUrl !== '#';
            return (
              <motion.div
                key={project.title}
                className={`projects__row ${isOpen ? 'is-open' : ''} ${hovered === index ? 'is-hovered' : ''}`}
                variants={fadeUpItem}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                onMouseEnter={() => canPreview && setHovered(index)}
                onMouseLeave={() => canPreview && setHovered((h) => (h === index ? null : h))}
              >
                <button
                  type="button"
                  className="projects__row-head"
                  onClick={() => toggle(index)}
                  aria-expanded={isOpen}
                >
                  <span className="projects__row-num">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="projects__row-main">
                    <span className="projects__row-titleline">
                      <span className="projects__row-title">{project.title}</span>
                      {type && <span className="projects__row-type">{type}</span>}
                    </span>
                    <span className="projects__row-desc">{project.description}</span>
                    <span className="projects__row-tech">
                      {project.technologies.map((tech, i) => (
                        <span key={i} className="projects__row-tech-item">{tech}</span>
                      ))}
                    </span>
                  </span>
                  <span className="projects__row-icon" aria-hidden>
                    <HiChevronDown />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      className="projects__row-detail"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.34, ease: [0.25, 0.46, 0.45, 0.94] }}
                    >
                      <div className="projects__row-detail-inner">
                        <h4 className="projects__row-detail-title">What I worked on</h4>
                        <ul className="projects__row-achievements">
                          {project.achievements.map((achievement, i) => (
                            <li key={i}>{achievement}</li>
                          ))}
                        </ul>
                        {hasLinks && (
                          <div className="projects__row-links">
                            {project.demoUrl !== '#' && (
                              <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                                <HiExternalLink /> Live
                              </a>
                            )}
                            {project.githubUrl !== '#' && (
                              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                                <FaGithub /> Code
                              </a>
                            )}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Floating "plate" preview — tracks the cursor over the list.
            A bespoke magazine plate stands in for a screenshot. */}
        <AnimatePresence>
          {canPreview && hoveredProject && (
            <motion.div
              className="projects__preview"
              style={{ x: sx, y: sy }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              aria-hidden="true"
            >
              <div
                className="projects__preview-plate"
                style={{
                  '--a': hoveredAccent[0],
                  '--b': hoveredAccent[1],
                }}
              >
                <div className="projects__preview-glow" />
                <span className="projects__preview-num">
                  {String((hovered ?? 0) + 1).padStart(2, '0')}
                </span>
                <div className="projects__preview-foot">
                  <span className="projects__preview-type">
                    {PROJECT_TYPES[hoveredProject.title]}
                  </span>
                  <span className="projects__preview-title">{hoveredProject.title}</span>
                  <span className="projects__preview-cue">
                    Open details <HiArrowUpRight />
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {hasMore && (
          <div className="projects__more">
            <button
              type="button"
              className="btn btn-secondary projects__more-btn"
              onClick={() => setShowAll((prev) => !prev)}
              aria-expanded={showAll}
            >
              {showAll ? 'Show fewer' : `See all `}
              <HiChevronDown
                className={`projects__more-icon ${showAll ? 'projects__more-icon--up' : ''}`}
              />
            </button>
            {!showAll && <span className="projects__more-hint">+{hiddenCount} more</span>}
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
