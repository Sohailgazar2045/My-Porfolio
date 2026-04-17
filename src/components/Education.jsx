import { motion } from 'framer-motion';
import { HiAcademicCap, HiLocationMarker, HiCalendar } from 'react-icons/hi';
import data from '../data.json';
import { fadeBlurUp, fadeUpItem, staggerContainer } from '../lib/motion';
import '../styles/Education.css';

const Education = () => {
  const { education } = data;

  return (
    <section id="education" className="education">
      <div className="container">
        <motion.div
          variants={fadeBlurUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="education__header"
        >
          <span className="section-label">Education</span>
          <h2 className="section-title">Academic Background</h2>
          <p className="section-subtitle">
            The foundation that shaped my technical journey
          </p>
        </motion.div>

        <motion.div
          className="education__grid"
          variants={staggerContainer(0.12, 0)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {education.map((edu, index) => (
            <motion.div
              key={index}
              className="education__card glow-card"
              variants={fadeUpItem}
            >
              <div className="education__card-icon">
                <HiAcademicCap />
              </div>

              <div className="education__card-content">
                <h3 className="education__degree">{edu.degree}</h3>

                <div className="education__meta">
                  <span className="education__institution">
                    <HiLocationMarker />
                    {edu.institution}
                  </span>
                  <span className="education__period">
                    <HiCalendar />
                    {edu.duration}
                  </span>
                </div>
              </div>

              <div className="education__decoration">
                <div className="education__decoration-line" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Education;
