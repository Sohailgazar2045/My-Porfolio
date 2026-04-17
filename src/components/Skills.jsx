import { motion } from 'framer-motion';
import {
  HiDesktopComputer,
  HiServer,
  HiDatabase,
  HiCode,
  HiCloud,
  HiCog,
} from 'react-icons/hi';
import data from '../data.json';
import { fadeBlurUp, fadeUpItem, staggerContainer } from '../lib/motion';
import '../styles/Skills.css';

const CATEGORY_META = {
  frontend: { icon: <HiDesktopComputer />, label: 'Frontend', color: '#2563eb' },
  backend: { icon: <HiServer />, label: 'Backend', color: '#475569' },
  databases: { icon: <HiDatabase />, label: 'Databases', color: '#0d9488' },
  other: { icon: <HiCode />, label: 'Core', color: '#059669' },
  apis: { icon: <HiCloud />, label: 'APIs & Services', color: '#0369a1' },
  tools: { icon: <HiCog />, label: 'Tools & DevOps', color: '#334155' },
};

const Skills = () => {
  const { skills } = data;

  const containerVariants = staggerContainer(0.08, 0);
  const cardVariants = fadeUpItem;

  return (
    <section id="skills" className="skills">
      <div className="container">
        <motion.div
          variants={fadeBlurUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="skills__header"
        >
          <span className="section-label">Skills</span>
          <h2 className="section-title">Technical Arsenal</h2>
          <p className="section-subtitle">
            Technologies and tools I use to bring products to life
          </p>
        </motion.div>

        <motion.div
          className="skills__grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {Object.entries(skills).map(([category, items]) => {
            const meta = CATEGORY_META[category] || { icon: <HiCode />, label: category, color: '#2563eb' };
            return (
              <motion.div
                key={category}
                className="skills__card glow-card"
                variants={cardVariants}
                style={{ '--accent': meta.color }}
              >
                <div
                  className="skills__rail"
                  style={{
                    background: `linear-gradient(180deg, var(--accent), color-mix(in srgb, var(--accent) 35%, transparent))`,
                  }}
                  aria-hidden
                />
                <div className="skills__card-glow" aria-hidden />
                <div className="skills__card-inner">
                  <div className="skills__card-header">
                    <div className="skills__card-icon">
                      {meta.icon}
                    </div>
                    <div className="skills__card-heading">
                      <h3 className="skills__card-title">{meta.label}</h3>
                      <span className="skills__card-count">{items.length}</span>
                    </div>
                  </div>
                  <div className="skills__tags">
                    {items.map((skill, index) => (
                      <span key={index} className="skills__tag">
                        {skill}
                      </span>
                    ))}
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

export default Skills;
