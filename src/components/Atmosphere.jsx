import { useEffect, useRef } from 'react';

/**
 * Atmosphere — the fixed light stage behind the whole page.
 * Two drifting warm blooms + film grain give depth and a "room"
 * feel, and a soft spotlight tracks the pointer. All pointer work
 * is rAF-throttled and writes only CSS custom properties, so it
 * stays on the compositor and never triggers React re-renders.
 */
const Atmosphere = () => {
  const spotRef = useRef(null);

  useEffect(() => {
    const spot = spotRef.current;
    if (!spot) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarse = window.matchMedia('(hover: none)').matches;
    if (reduce || coarse) return;

    let raf = 0;
    let px = window.innerWidth / 2;
    let py = window.innerHeight * 0.4;

    const paint = () => {
      raf = 0;
      spot.style.setProperty('--mx', `${px}px`);
      spot.style.setProperty('--my', `${py}px`);
    };

    const onMove = (e) => {
      px = e.clientX;
      py = e.clientY;
      spot.classList.add('is-active');
      if (!raf) raf = requestAnimationFrame(paint);
    };

    const onLeave = () => spot.classList.remove('is-active');

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);
    return () => {
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div className="atmosphere" aria-hidden="true">
        <div className="atmosphere__bloom atmosphere__bloom--1" />
        <div className="atmosphere__bloom atmosphere__bloom--2" />
        <div className="atmosphere__bloom atmosphere__bloom--3" />
        <div className="atmosphere__grain" />
      </div>
      <div className="spotlight" ref={spotRef} aria-hidden="true" />
    </>
  );
};

export default Atmosphere;
