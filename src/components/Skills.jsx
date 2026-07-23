import { motion } from 'framer-motion';
import {
  HiDesktopComputer,
  HiServer,
  HiDatabase,
  HiCode,
  HiCloud,
  HiCog,
  HiLightningBolt,
  HiShieldCheck,
} from 'react-icons/hi';
import data from '../data.json';
import { getSkillIcon } from '../lib/skillIcons';
import { fadeBlurUp, fadeUpItem, staggerContainer } from '../lib/motion';
import '../styles/Skills.css';

// Acid-lime and muted-steel alternating per category — the card
// rails read like channels on an instrument panel, not a rainbow.
const CATEGORY_META = {
  languages: { icon: <HiCode />, label: 'Languages', color: '#ccff00' },
  frontend: { icon: <HiDesktopComputer />, label: 'Frontend', color: '#a6d000' },
  backend: { icon: <HiServer />, label: 'Backend', color: '#64748b' },
  databases: { icon: <HiDatabase />, label: 'Databases & ORMs', color: '#475569' },
  cloud: { icon: <HiCloud />, label: 'Cloud & DevOps', color: '#94a3b8' },
  integrations: { icon: <HiLightningBolt />, label: 'Integrations & Automation', color: '#dbff4d' },
  security: { icon: <HiShieldCheck />, label: 'Security & Blockchain', color: '#ccff00' },
  other: { icon: <HiCog />, label: 'Other', color: '#7c8ba0' },
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
            const meta = CATEGORY_META[category] || { icon: <HiCode />, label: category, color: '#ccff00' };
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
