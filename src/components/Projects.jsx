import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiChevronDown, HiExternalLink } from 'react-icons/hi';
import { FaGithub } from 'react-icons/fa';
import data from '../data.json';
import { fadeBlurUp, fadeUpItem, staggerContainer } from '../lib/motion';
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

const Projects = () => {
  const { projects } = data;
  const [showAll, setShowAll] = useState(false);
  const [openIndex, setOpenIndex] = useState(0);

  const hasMore = projects.length > PREVIEW_COUNT;
  const visible = showAll ? projects : projects.slice(0, PREVIEW_COUNT);
  const hiddenCount = projects.length - PREVIEW_COUNT;

  const toggle = (i) => setOpenIndex((prev) => (prev === i ? null : i));

  return (
    <section id="projects" className="projects">
      <div className="container">
        <motion.div
          variants={fadeBlurUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="projects__header"
        >
          <span className="section-label">Projects</span>
          <h2 className="section-title">Selected work</h2>
          <p className="section-subtitle">
            A few of the projects I&apos;ve built or worked on recently. Open any
            one for the details.
          </p>
        </motion.div>

        <motion.div
          className="projects__list"
          variants={staggerContainer(0.07, 0)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {visible.map((project, index) => {
            const isOpen = openIndex === index;
            const type = PROJECT_TYPES[project.title];
            const hasLinks = project.demoUrl !== '#' || project.githubUrl !== '#';
            return (
              <motion.div
                key={project.title}
                className={`projects__row ${isOpen ? 'is-open' : ''}`}
                variants={fadeUpItem}
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
        </motion.div>

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
