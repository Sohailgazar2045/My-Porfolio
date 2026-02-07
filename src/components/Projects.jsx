import { motion } from 'framer-motion';
import { HiExternalLink, HiCheck } from 'react-icons/hi';
import { FaGithub } from 'react-icons/fa';
import data from '../data.json';
import '../styles/Projects.css';

const GRADIENT_ACCENTS = [
  { from: '#6366f1', to: '#8b5cf6' },
  { from: '#ec4899', to: '#f43f5e' },
  { from: '#06b6d4', to: '#3b82f6' },
  { from: '#10b981', to: '#14b8a6' },
  { from: '#f59e0b', to: '#ef4444' },
  { from: '#8b5cf6', to: '#06b6d4' },
  { from: '#f43f5e', to: '#fb923c' },
  { from: '#14b8a6', to: '#6366f1' },
];

const Projects = () => {
  const { projects } = data;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <section id="projects" className="projects">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
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
                className="projects__card"
                variants={cardVariants}
                style={{
                  '--accent-from': accent.from,
                  '--accent-to': accent.to,
                }}
              >
                {/* Card accent line */}
                <div className="projects__card-accent" />

                <div className="projects__card-content">
                  {/* Top section */}
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
