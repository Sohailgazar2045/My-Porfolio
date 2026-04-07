import { motion } from 'framer-motion';
import { HiBookOpen, HiLightningBolt } from 'react-icons/hi';
import data from '../data.json';
import '../styles/LearningHub.css';

const LearningHub = () => {
  const { learningHub } = data;

  return (
    <section id="learn" className="learn section-surface">
      <div className="learn__mesh" aria-hidden />
      <div className="container">
        <motion.div
          className="learn__header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
        >
          <span className="section-label">For visitors</span>
          <h2 className="section-title learn__title">{learningHub.headline}</h2>
          <p className="section-subtitle learn__subtitle">{learningHub.subhead}</p>
        </motion.div>

        <motion.div
          className="learn__grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1 },
            },
          }}
        >
          {learningHub.tracks.map((track, index) => (
            <motion.article
              key={track.id}
              className="learn-track glow-card"
              style={{ '--track-accent': track.accent }}
              variants={{
                hidden: { opacity: 0, y: 28 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
            >
              <div className="learn-track__accent-bar" aria-hidden />
              <div className="learn-track__head">
                <span className="learn-track__index">
                  <HiBookOpen aria-hidden />
                  Track {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="learn-track__title">{track.title}</h3>
                <p className="learn-track__summary">{track.summary}</p>
              </div>
              <ol className="learn-track__steps">
                {track.steps.map((step, i) => (
                  <li key={step.title} className="learn-step">
                    <div className="learn-step__marker">
                      <HiLightningBolt aria-hidden />
                    </div>
                    <div className="learn-step__body">
                      <span className="learn-step__label">Step {i + 1}</span>
                      <h4 className="learn-step__title">{step.title}</h4>
                      <p className="learn-step__detail">{step.detail}</p>
                      <div className="learn-step__skills">
                        {step.skills.map((skill) => (
                          <span key={skill} className="learn-skill-pill">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default LearningHub;
