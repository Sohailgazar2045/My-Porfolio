/** Shared Framer Motion tuning for scroll reveals */
export const springSnappy = { type: 'spring', stiffness: 120, damping: 22, mass: 0.85 };

export const springSoft = { type: 'spring', stiffness: 70, damping: 20 };

export const fadeBlurUp = {
  hidden: { opacity: 0, y: 36, filter: 'blur(14px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: springSoft,
  },
};

export const staggerContainer = (stagger = 0.08, delay = 0) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: stagger, delayChildren: delay },
  },
});

export const fadeUpItem = {
  hidden: { opacity: 0, y: 28, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: springSnappy,
  },
};

export const fadeSlideLeft = {
  hidden: { opacity: 0, x: -36, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: springSoft,
  },
};

export const fadeSlideRight = {
  hidden: { opacity: 0, x: 36, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: springSoft,
  },
};
