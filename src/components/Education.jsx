import { motion } from 'framer-motion';
import { HiAcademicCap, HiLocationMarker, HiCalendar } from 'react-icons/hi';
import data from '../data.json';
import '../styles/Education.css';

const Education = () => {
  const { education } = data;

  return (
    <section id="education" className="education">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="education__header"
        >
          <span className="section-label">Education</span>
          <h2 className="section-title">Academic Background</h2>
          <p className="section-subtitle">
            The foundation that shaped my technical journey
          </p>
        </motion.div>

        <div className="education__grid">
          {education.map((edu, index) => (
            <motion.div
              key={index}
              className="education__card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
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
        </div>
      </div>
    </section>
  );
};

export default Education;
