import { motion } from 'framer-motion';
import { HiBriefcase, HiCalendar, HiChevronRight } from 'react-icons/hi';
import data from '../data.json';
import '../styles/Experience.css';

const Experience = () => {
  const { experience } = data;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <section id="experience" className="experience">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="experience__header"
        >
          <span className="section-label">Experience</span>
          <h2 className="section-title">Where I've Worked</h2>
          <p className="section-subtitle">
            My professional journey building web applications at scale
          </p>
        </motion.div>

        <motion.div
          className="experience__timeline"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          <div className="experience__line" />

          {experience.map((exp, index) => (
            <motion.div
              key={index}
              className="experience__item"
              variants={itemVariants}
            >
              <div className="experience__marker">
                <div className="experience__marker-dot">
                  <HiBriefcase />
                </div>
                {index < experience.length - 1 && (
                  <div className="experience__marker-line" />
                )}
              </div>

              <div className="experience__card">
                <div className="experience__card-top">
                  <div>
                    <h3 className="experience__position">{exp.position}</h3>
                    <p className="experience__company">{exp.company}</p>
                  </div>
                  <span className="experience__duration">
                    <HiCalendar />
                    {exp.duration}
                  </span>
                </div>

                <ul className="experience__responsibilities">
                  {exp.responsibilities.map((item, i) => (
                    <li key={i} className="experience__responsibility">
                      <HiChevronRight className="experience__bullet" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
