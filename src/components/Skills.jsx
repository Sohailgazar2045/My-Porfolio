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
import '../styles/Skills.css';

const CATEGORY_META = {
  frontend: { icon: <HiDesktopComputer />, label: 'Frontend', color: '#818cf8' },
  backend: { icon: <HiServer />, label: 'Backend', color: '#c084fc' },
  databases: { icon: <HiDatabase />, label: 'Databases', color: '#22d3ee' },
  other: { icon: <HiCode />, label: 'Core', color: '#34d399' },
  apis: { icon: <HiCloud />, label: 'APIs & Services', color: '#fb923c' },
  tools: { icon: <HiCog />, label: 'Tools & DevOps', color: '#f472b6' },
};

const Skills = () => {
  const { skills } = data;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <section id="skills" className="skills">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
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
            const meta = CATEGORY_META[category] || { icon: <HiCode />, label: category, color: '#818cf8' };
            return (
              <motion.div
                key={category}
                className="skills__card"
                variants={cardVariants}
                style={{ '--accent': meta.color }}
              >
                <div className="skills__card-header">
                  <div className="skills__card-icon">
                    {meta.icon}
                  </div>
                  <h3 className="skills__card-title">{meta.label}</h3>
                  <span className="skills__card-count">{items.length}</span>
                </div>
                <div className="skills__tags">
                  {items.map((skill, index) => (
                    <span key={index} className="skills__tag">
                      {skill}
                    </span>
                  ))}
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
