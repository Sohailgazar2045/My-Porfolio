import { useEffect, useRef } from 'react';

/**
 * Cursor — a starship flying where the pointer goes.
 *
 * Chosen to sit with the starfield behind it: the pointer reads as a craft
 * moving through the field rather than a dot laid over it.
 *
 * The ship is drawn at the exact pointer position (no positional lag, so
 * the thing you aim with is the thing you click with); only its *heading*
 * eases, which is what makes it bank into turns. Engines light while it's
 * under way and cut out when it holds station, and an ion trail of fading
 * dots follows in its wake.
 *
 * Only mounts on real pointer hardware. Touch devices and anyone with
 * reduced-motion set keep their native cursor untouched.
 */

const TRAIL = 6;          // ion trail dots
const TRAIL_LAG = 0.26;   // how far each dot lags the one ahead of it
const TURN_EASE = 9;      // heading response; higher = sharper banking
const MIN_SPEED = 0.35;   // px/frame below which we keep the last heading
const BURN_SPEED = 1.1;   // px/frame above which the engines light

// Interactive things that should make the ship flare up.
const HOT = 'a, button, [role="button"], input, textarea, select, label, summary, [tabindex]:not([tabindex="-1"])';
const TEXTUAL = 'input:not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]';

const Cursor = () => {
  const shipRef = useRef(null);
  const trailRef = useRef([]);

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduce) return;

    const ship = shipRef.current;
    const dots = trailRef.current.filter(Boolean);
    if (!ship) return;

    // Opt the page into hiding the native cursor. Driven from JS so that
    // no-JS and touch visitors never lose their pointer.
    const root = document.documentElement;
    root.classList.add('has-ship-cursor');

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let prevX = x;
    let prevY = y;
    let angle = 0;        // current heading, radians
    let target = 0;       // heading we're easing toward
    let raf = 0;
    let last = 0;
    let moved = false;

    const trail = Array.from({ length: dots.length }, () => ({ x, y }));

    const onMove = (e) => {
      x = e.clientX;
      y = e.clientY;

      if (!moved) {
        moved = true;
        ship.classList.add('is-visible');
      }

      const t = e.target;
      const hot = t instanceof Element ? t.closest(HOT) : null;
      ship.classList.toggle('is-hot', Boolean(hot));
      // let real text fields show a real caret
      const text = t instanceof Element ? t.closest(TEXTUAL) : null;
      root.classList.toggle('is-text-target', Boolean(text));
    };

    const onDown = () => ship.classList.add('is-down');
    const onUp = () => ship.classList.remove('is-down');
    const onLeave = () => ship.classList.remove('is-visible');
    const onEnter = () => { if (moved) ship.classList.add('is-visible'); };

    const tick = (now) => {
      const dt = last ? Math.min((now - last) / 1000, 0.05) : 1 / 60;
      last = now;

      // heading from travel direction; hold the last one when nearly still
      const dx = x - prevX;
      const dy = y - prevY;
      const speed = Math.hypot(dx, dy);
      if (speed > MIN_SPEED) {
        target = Math.atan2(dy, dx) + Math.PI / 2; // art points up, +90° to face travel
      }
      prevX = x;
      prevY = y;

      // shortest way round the circle, so it never unwinds the long way
      let delta = target - angle;
      delta = Math.atan2(Math.sin(delta), Math.cos(delta));
      angle += delta * (1 - Math.exp(-TURN_EASE * dt));

      ship.style.transform =
        `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) rotate(${angle}rad)`;
      ship.classList.toggle('is-burning', speed > BURN_SPEED);

      // ion trail: each dot chases the one in front of it
      for (let i = 0; i < trail.length; i++) {
        const lead = i === 0 ? { x, y } : trail[i - 1];
        trail[i].x += (lead.x - trail[i].x) * TRAIL_LAG;
        trail[i].y += (lead.y - trail[i].y) * TRAIL_LAG;
        dots[i].style.transform =
          `translate3d(${trail[i].x}px, ${trail[i].y}px, 0) translate(-50%, -50%)`;
      }

      raf = requestAnimationFrame(tick);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', onDown, { passive: true });
    window.addEventListener('pointerup', onUp, { passive: true });
    document.addEventListener('pointerleave', onLeave);
    document.addEventListener('pointerenter', onEnter);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      root.classList.remove('has-ship-cursor', 'is-text-target');
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      document.removeEventListener('pointerleave', onLeave);
      document.removeEventListener('pointerenter', onEnter);
    };
  }, []);

  return (
    <>
      <div className="ship-trail" aria-hidden="true">
        {Array.from({ length: TRAIL }).map((_, i) => (
          <span
            key={i}
            className="ship-trail__dot"
            ref={(el) => { trailRef.current[i] = el; }}
            style={{ '--i': i }}
          />
        ))}
      </div>

      <div className="ship-cursor" ref={shipRef} aria-hidden="true">
        <svg viewBox="0 0 24 24" width="28" height="28">
          {/* engine burn, drawn under the hull so it reads as coming out of it */}
          <path className="ship-cursor__thrust" d="M9.9 18 L12 23.6 L14.1 18 Z" />

          {/* swept delta wings */}
          <path className="ship-cursor__wing" d="M9.3 12.4 L1.9 19 L1.9 21.5 L9.3 18.2 Z" />
          <path className="ship-cursor__wing" d="M14.7 12.4 L22.1 19 L22.1 21.5 L14.7 18.2 Z" />

          {/* fuselage — pointed nose tapering back to the engine block */}
          <path
            className="ship-cursor__hull"
            d="M12 1.2 C13.7 4.6 14.7 8.6 14.9 12.6 L14.9 18.4 L9.1 18.4 L9.1 12.6 C9.3 8.6 10.3 4.6 12 1.2 Z"
          />

          {/* canopy */}
          <path
            className="ship-cursor__canopy"
            d="M12 4.4 C12.9 6.4 13.4 8.8 13.5 11.1 L10.5 11.1 C10.6 8.8 11.1 6.4 12 4.4 Z"
          />

          {/* twin engine bells */}
          <rect className="ship-cursor__engine" x="9.5" y="17.2" width="2" height="1.9" rx="0.4" />
          <rect className="ship-cursor__engine" x="12.5" y="17.2" width="2" height="1.9" rx="0.4" />
        </svg>
      </div>
    </>
  );
};

export default Cursor;
