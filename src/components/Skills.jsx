import { motion } from 'framer-motion';
import {
  HiDesktopComputer,
  HiServer,
  HiDatabase,
  HiCode,
  HiCloud,
  HiCog,
  HiLightningBolt,
} from 'react-icons/hi';
import data from '../data.json';
import { getSkillIcon } from '../lib/skillIcons';
import { fadeBlurUp, fadeUpItem, staggerContainer } from '../lib/motion';
import '../styles/Skills.css';

const CATEGORY_META = {
  languages: { icon: <HiCode />, label: 'Languages', color: '#b1552f' },
  frontend: { icon: <HiDesktopComputer />, label: 'Frontend', color: '#c17a3c' },
  backend: { icon: <HiServer />, label: 'Backend', color: '#9c6242' },
  databases: { icon: <HiDatabase />, label: 'Databases & ORMs', color: '#7c7a4a' },
  cloud: { icon: <HiCloud />, label: 'Cloud & DevOps', color: '#6f7d55' },
  integrations: { icon: <HiLightningBolt />, label: 'Integrations & Automation', color: '#be8a3c' },
  other: { icon: <HiCog />, label: 'Other', color: '#a86a5c' },
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
          <h2 className="section-title">What I work with</h2>
          <p className="section-subtitle">
            The stack I've spent the most time in. Strongest in the
            TypeScript, React and Node world — the rest I've used on real
            projects, not just tutorials.
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
                    {items.map((skill, index) => {
                      const Icon = getSkillIcon(skill);
                      return (
                        <span key={index} className="skills__tag">
                          <Icon className="skills__tag-icon" aria-hidden />
                          {skill}
                        </span>
                      );
                    })}
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
