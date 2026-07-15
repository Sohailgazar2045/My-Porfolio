import { motion } from 'framer-motion';
import { HiAcademicCap, HiLocationMarker, HiCalendar } from 'react-icons/hi';
import data from '../data.json';
import { fadeBlurUp, fadeUpItem, staggerContainer } from '../lib/motion';
import '../styles/Education.css';

const Education = () => {
  const { education } = data;

  return (
    <section id="education" className="education">
      <div className="container education__container">
        <span className="section-mark" aria-hidden="true">Ed</span>
        <motion.div
          variants={fadeBlurUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="education__header"
        >
          <span className="section-label section-label--glow">Education</span>
          <h2 className="section-title">Where I <span className="text-gradient">studied</span></h2>
          <p className="section-subtitle">
            My formal background — most of the day-to-day I picked up on the job.
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
                <span className="education__tag">Degree</span>
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

              <span className="education__watermark" aria-hidden="true">
                {edu.duration.split(' - ')[1] || ''}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Education;
