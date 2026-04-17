import { motion } from 'framer-motion';
import { HiExternalLink, HiCheck } from 'react-icons/hi';
import { FaGithub } from 'react-icons/fa';
import data from '../data.json';
import { fadeBlurUp, fadeUpItem, staggerContainer } from '../lib/motion';
import '../styles/Projects.css';

const GRADIENT_ACCENTS = [
  { from: '#1e40af', to: '#2563eb' },
  { from: '#1e3a8a', to: '#3b82f6' },
  { from: '#0f766e', to: '#0d9488' },
  { from: '#334155', to: '#64748b' },
  { from: '#0369a1', to: '#0ea5e9' },
  { from: '#1d4ed8', to: '#60a5fa' },
  { from: '#155e75', to: '#0891b2' },
  { from: '#475569', to: '#94a3b8' },
];

const Projects = () => {
  const { projects } = data;

  const containerVariants = staggerContainer(0.1, 0);
  const cardVariants = fadeUpItem;

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
          <h2 className="section-title">Featured Work</h2>
          <p className="section-subtitle">
            A curated selection of projects I've built and contributed to
          </p>
        </motion.div>

        <motion.div
          className="projects__grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {projects.map((project, index) => {
            const accent = GRADIENT_ACCENTS[index % GRADIENT_ACCENTS.length];
            return (
              <motion.div
                key={index}
                className="projects__card glow-card"
                variants={cardVariants}
                style={{
                  '--accent-from': accent.from,
                  '--accent-to': accent.to,
                }}
              >
                <div
                  className="projects__card-rail"
                  style={{
                    background: `linear-gradient(180deg, var(--accent-from), var(--accent-to))`,
                  }}
                  aria-hidden
                />

                <div className="projects__card-content">
                  <div className="projects__card-top">
                    <span className="projects__card-number">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div className="projects__card-links-mini">
                      {project.demoUrl !== '#' && (
                        <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" aria-label="Live demo">
                          <HiExternalLink size={18} />
                        </a>
                      )}
                      {project.githubUrl !== '#' && (
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                          <FaGithub size={18} />
                        </a>
                      )}
                    </div>
                  </div>

                  <h3 className="projects__card-title">{project.title}</h3>
                  <p className="projects__card-description">{project.description}</p>

                  {/* Technologies */}
                  <div className="projects__tech-list">
                    {project.technologies.map((tech, i) => (
                      <span key={i} className="projects__tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Achievements */}
                  <div className="projects__achievements">
                    <h4 className="projects__achievements-title">Key Achievements</h4>
                    <ul className="projects__achievements-list">
                      {project.achievements.slice(0, 3).map((achievement, i) => (
                        <li key={i}>
                          <HiCheck className="projects__check-icon" />
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
