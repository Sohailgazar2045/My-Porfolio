import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import data from '../data.json';
import '../styles/SystemBoot.css';

const LOG_LINES = [
  '## Initializing Telemetry...',
  '> handshake :: portfolio-core :: OK',
  '> loading design tokens... OK',
  '> mounting viewport grid... OK',
  '> sync scroll observers... OK',
  '> rendering interface...',
];

const bootTitle = `${data.personalInfo.name} | ${data.personalInfo.title} Portfolio`;

/**
 * Boot overlay: system check + telemetry log (HUD / terminal style).
 */
const SystemBoot = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const autoFinishScheduled = useRef(false);

  const dismiss = useCallback(() => {
    setProgress(100);
    setVisible(false);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Enter' || e.key === 'Escape') dismiss();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [dismiss]);

  useEffect(() => {
    if (!visible) return undefined;
    const tick = () => {
      setProgress((p) => {
        if (p >= 100) return 100;
        return p + 2 + Math.random() * 6;
      });
    };
    const id = window.setInterval(tick, 72);
    return () => window.clearInterval(id);
  }, [visible]);

  useEffect(() => {
    if (!visible || progress < 100 || autoFinishScheduled.current) return undefined;
    autoFinishScheduled.current = true;
    const t = window.setTimeout(() => setVisible(false), 380);
    return () => window.clearTimeout(t);
  }, [progress, visible]);

  const pct = Math.min(100, Math.floor(progress));
  const logCount = Math.min(LOG_LINES.length, Math.max(1, Math.ceil((pct / 100) * LOG_LINES.length)));

  return (
    <AnimatePresence onExitComplete={() => onComplete?.()}>
      {visible && (
        <motion.div
          key="system-boot"
          className="system-boot"
          role="dialog"
          aria-modal="true"
          aria-label="System initialization"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } }}
        >
          <div className="system-boot__scan" aria-hidden />
          <div className="system-boot__inner">
            <p className="system-boot__eyebrow">Portfolio // System Terminal</p>
            <h1 className="system-boot__title">{bootTitle}</h1>
            <p className="system-boot__hint">Press Enter or Esc to skip</p>

            <div className="system-boot__row">
              <span className="system-boot__label">System Check</span>
              <span className="system-boot__pct">{pct}%</span>
            </div>
            <div className="system-boot__bar" aria-hidden>
              <div className="system-boot__bar-fill" style={{ width: `${pct}%` }} />
            </div>

            <div className="system-boot__log" aria-live="polite">
              {LOG_LINES.slice(0, logCount).map((line, i) => (
                <div key={i} className="system-boot__log-line">
                  {line}
                </div>
              ))}
            </div>

            <button type="button" className="system-boot__skip" onClick={dismiss}>
              Skip initialization
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SystemBoot;
