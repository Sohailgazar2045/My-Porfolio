import { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/**
 * Magnetic — pulls its child toward the cursor while hovered, then
 * springs home on leave. Used sparingly on the few elements worth
 * making feel "alive": primary CTAs, the logo, social chips.
 *
 * `strength` scales the pull (0–1). Disabled automatically on
 * touch / reduced-motion via CSS-media-free guards in the handlers.
 */
const Magnetic = ({ children, strength = 0.35, className = '', as = 'div', ...rest }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const spring = { stiffness: 220, damping: 18, mass: 0.6 };
  const sx = useSpring(x, spring);
  const sy = useSpring(y, spring);

  const canMagnetize = () =>
    typeof window !== 'undefined' &&
    window.matchMedia('(hover: hover)').matches &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const handleMove = (e) => {
    if (!canMagnetize() || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set(relX * strength);
    y.set(relY * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const MotionTag = motion[as] || motion.div;

  return (
    <MotionTag
      ref={ref}
      className={`magnetic ${className}`.trim()}
      style={{ x: sx, y: sy }}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      {...rest}
    >
      {children}
    </MotionTag>
  );
};

export default Magnetic;
