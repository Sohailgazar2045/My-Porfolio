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

// One champagne-gold family, shifted subtly per category so each
// card's rail reads as its own without breaking the restraint.
const CATEGORY_META = {
  languages: { icon: <HiCode />, label: 'Languages', color: '#d8bf9a' },
  frontend: { icon: <HiDesktopComputer />, label: 'Frontend', color: '#c5a880' },
  backend: { icon: <HiServer />, label: 'Backend', color: '#b39268' },
  databases: { icon: <HiDatabase />, label: 'Databases & ORMs', color: '#a88a63' },
  cloud: { icon: <HiCloud />, label: 'Cloud & DevOps', color: '#9a938a' },
  integrations: { icon: <HiLightningBolt />, label: 'Integrations & Automation', color: '#cdb185' },
  other: { icon: <HiCog />, label: 'Other', color: '#bfa377' },
};

const Skills = () => {
  const { skills } = data;

  const containerVariants = staggerContainer(0.08, 0);
  const cardVariants = fadeUpItem;

  return (
    <section id="skills" className="skills">
      <div className="container skills__container">
        <span className="section-mark" aria-hidden="true">S</span>
        <motion.div
          variants={fadeBlurUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="skills__header"
        >
          <span className="section-label section-label--glow">Skills</span>
          <h2 className="section-title">What I <span className="text-gradient">work</span> with</h2>
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
            const meta = CATEGORY_META[category] || { icon: <HiCode />, label: category, color: '#c5a880' };
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
