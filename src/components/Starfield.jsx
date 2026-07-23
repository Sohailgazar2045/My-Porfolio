import { useEffect, useRef } from 'react';

/**
 * Starfield — a deep field of drifting stars behind the whole page.
 *
 * A cube of points is rotated slowly on two axes and projected to 2D
 * with a real perspective divide, so near stars are large and bright
 * and far ones shrink into the ink. The pointer adds a parallax tilt
 * that eases back to rest when the cursor returns to centre.
 *
 * What sells it as space rather than "dots on black": stars carry a
 * range of colour temperatures the way real ones do, each breathes on
 * its own twinkle phase, a handful burn bright enough to throw
 * diffraction spikes, and every few seconds a meteor cuts across.
 *
 * Deliberately canvas-2D rather than WebGL: the whole effect is a few
 * hundred bytes of trig, and it avoids pulling a 3D engine into the
 * bundle for a background layer.
 */

// --- world ---
const CUBE = 100;     // stars are scattered in a CUBE³ box around the origin
const CAM_Z = 20;     // camera sits on +z looking back toward the origin
const FOV = 75;       // degrees, vertical
const NEAR = 0.6;     // cull stars that pass behind/through the camera
const FAR = 78;       // and ones that fall out the back of the box
const STAR_SIZE = 0.14; // world units; screen size follows the perspective divide

// --- motion ---
// Rates are per *second*, not per frame, so the field turns at the same
// speed on a 60Hz laptop and a 144Hz monitor. The drift never stops: with
// the pointer still, the whole cube keeps tumbling on its own.
const DRIFT_Y = 0.07;     // radians/sec — a full turn in roughly 90s
const DRIFT_X = 0.032;    // slower second axis, so the motion never loops flat
const PARALLAX = 0.55;    // how far the pointer tilts the field, radians at the edge
const EASE = 2.8;         // pointer response, higher = snappier
const MAX_STEP = 0.05;    // clamp dt so a stalled frame can't jolt the field

// --- stars ---
// Real starfields aren't white. Weighted so cool blue-white and silver
// dominate, with a few warm ones and the odd lime to tie into the palette.
const TINTS = [
  { rgb: '198, 216, 255', weight: 0.30 },  // blue-white
  { rgb: '226, 232, 240', weight: 0.38 },  // silver
  { rgb: '255, 241, 214', weight: 0.18 },  // warm white
  { rgb: '255, 214, 170', weight: 0.09 },  // amber
  { rgb: '204, 255, 0', weight: 0.05 },    // acid lime — the site's accent
];
const BRIGHT_RATIO = 0.05;   // stars big enough to throw spikes
const BRIGHT_SCALE = 2.4;
const TWINKLE_MIN = 0.4;     // rad/sec
const TWINKLE_MAX = 1.9;
const TWINKLE_DEPTH = 0.42;  // how much of the brightness the twinkle swings

// --- meteors ---
const METEOR_MIN_GAP = 2.6;  // seconds between streaks
const METEOR_MAX_GAP = 7.5;
const METEOR_SPEED = [620, 1150];   // px/sec
const METEOR_LEN = [140, 300];      // px of tail

/** Soft round star: a radial gradient falling to fully transparent. */
function makeStarSprite(rgb) {
  const size = 32;
  const c = document.createElement('canvas');
  c.width = size;
  c.height = size;
  const ctx = c.getContext('2d');
  const mid = size / 2;
  const g = ctx.createRadialGradient(mid, mid, 0, mid, mid, mid - 2);
  g.addColorStop(0, `rgba(${rgb}, 1)`);
  g.addColorStop(0.5, `rgba(${rgb}, 0.8)`);
  g.addColorStop(1, `rgba(${rgb}, 0)`);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  return c;
}

/** Bright star: the same core plus four diffraction spikes. */
function makeFlareSprite(rgb) {
  const size = 64;
  const c = document.createElement('canvas');
  c.width = size;
  c.height = size;
  const ctx = c.getContext('2d');
  const mid = size / 2;

  // halo
  const halo = ctx.createRadialGradient(mid, mid, 0, mid, mid, mid);
  halo.addColorStop(0, `rgba(${rgb}, 0.95)`);
  halo.addColorStop(0.22, `rgba(${rgb}, 0.45)`);
  halo.addColorStop(1, `rgba(${rgb}, 0)`);
  ctx.fillStyle = halo;
  ctx.fillRect(0, 0, size, size);

  // spikes — two tapered bars fading from the core outward
  const spike = (w, h) => {
    const g = ctx.createLinearGradient(mid - w / 2, mid - h / 2, mid + w / 2, mid + h / 2);
    g.addColorStop(0, `rgba(${rgb}, 0)`);
    g.addColorStop(0.5, `rgba(${rgb}, 0.55)`);
    g.addColorStop(1, `rgba(${rgb}, 0)`);
    ctx.fillStyle = g;
    ctx.fillRect(mid - w / 2, mid - h / 2, w, h);
  };
  spike(size, 1.6);
  spike(1.6, size);

  // hot core
  const core = ctx.createRadialGradient(mid, mid, 0, mid, mid, 4);
  core.addColorStop(0, 'rgba(255, 255, 255, 1)');
  core.addColorStop(1, `rgba(${rgb}, 0)`);
  ctx.fillStyle = core;
  ctx.fillRect(mid - 5, mid - 5, 10, 10);

  return c;
}

/** Pick a tint index from the weighted table. */
function pickTint() {
  let r = Math.random();
  for (let i = 0; i < TINTS.length; i++) {
    r -= TINTS[i].weight;
    if (r <= 0) return i;
  }
  return TINTS.length - 1;
}

const rand = (min, max) => min + Math.random() * (max - min);

/** Scale the population to the viewport so phones don't pay desktop cost. */
function starCount(w, h) {
  return Math.round(Math.min(1600, Math.max(380, (w * h) / 1600)));
}

const Starfield = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarse = window.matchMedia('(hover: none)').matches;

    const starSprites = TINTS.map((t) => makeStarSprite(t.rgb));
    const flareSprites = TINTS.map((t) => makeFlareSprite(t.rgb));

    let w = 0;
    let h = 0;
    let cx = 0;
    let cy = 0;
    let focal = 0;
    let stars = [];

    const seed = () => {
      const n = starCount(w, h);
      stars = new Array(n);
      for (let i = 0; i < n; i++) {
        stars[i] = {
          x: (Math.random() - 0.5) * CUBE,
          y: (Math.random() - 0.5) * CUBE,
          z: (Math.random() - 0.5) * CUBE,
          a: 0.35 + Math.random() * 0.65,   // base brightness
          t: pickTint(),
          bright: Math.random() < BRIGHT_RATIO,
          ph: Math.random() * Math.PI * 2,  // twinkle phase
          tw: rand(TWINKLE_MIN, TWINKLE_MAX),
        };
      }
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cx = w / 2;
      cy = h / 2;
      // vertical FOV -> focal length in pixels
      focal = (h / 2) / Math.tan((FOV * Math.PI) / 360);
      seed();
    };

    // base* is the endless drift; par* is the pointer tilt layered on top.
    let baseX = 0;
    let baseY = 0;
    let parX = 0;
    let parY = 0;
    let targetX = 0;
    let targetY = 0;
    let elapsed = 0;

    const onMove = (e) => {
      targetY = ((e.clientX - w / 2) / (w / 2)) * PARALLAX;
      targetX = ((e.clientY - h / 2) / (h / 2)) * PARALLAX;
    };

    // --- meteors -------------------------------------------------------
    const meteors = [];
    let nextMeteor = rand(1.2, 3.5);

    const spawnMeteor = () => {
      // enter from the top edge or the left edge, travelling down-right-ish
      const fromTop = Math.random() < 0.65;
      const angle = rand(Math.PI * 0.16, Math.PI * 0.42); // down and to the right
      meteors.push({
        x: fromTop ? rand(-w * 0.1, w * 0.9) : -60,
        y: fromTop ? rand(-60, h * 0.25) : rand(0, h * 0.6),
        angle,
        speed: rand(METEOR_SPEED[0], METEOR_SPEED[1]),
        len: rand(METEOR_LEN[0], METEOR_LEN[1]),
        life: 0,
        ttl: rand(0.55, 1.1),
        tint: Math.random() < 0.22 ? '204, 255, 0' : '226, 240, 255',
      });
    };

    const drawMeteors = (dt) => {
      nextMeteor -= dt;
      if (nextMeteor <= 0) {
        spawnMeteor();
        nextMeteor = rand(METEOR_MIN_GAP, METEOR_MAX_GAP);
      }

      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        m.life += dt;
        if (m.life > m.ttl) {
          meteors.splice(i, 1);
          continue;
        }

        const dx = Math.cos(m.angle);
        const dy = Math.sin(m.angle);
        m.x += dx * m.speed * dt;
        m.y += dy * m.speed * dt;

        if (m.x - m.len > w || m.y - m.len > h) {
          meteors.splice(i, 1);
          continue;
        }

        // fade in fast, out slow
        const p = m.life / m.ttl;
        const alpha = p < 0.15 ? p / 0.15 : 1 - (p - 0.15) / 0.85;

        const tailX = m.x - dx * m.len;
        const tailY = m.y - dy * m.len;
        const g = ctx.createLinearGradient(m.x, m.y, tailX, tailY);
        g.addColorStop(0, `rgba(${m.tint}, ${0.9 * alpha})`);
        g.addColorStop(0.35, `rgba(${m.tint}, ${0.28 * alpha})`);
        g.addColorStop(1, `rgba(${m.tint}, 0)`);

        ctx.strokeStyle = g;
        ctx.lineWidth = 1.7;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();

        // hot head
        ctx.globalAlpha = alpha;
        ctx.fillStyle = `rgba(255, 255, 255, 0.95)`;
        ctx.beginPath();
        ctx.arc(m.x, m.y, 1.6, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    };

    // --- stars ---------------------------------------------------------
    const draw = (dt) => {
      const rotY = baseY + parY;
      const rotX = baseX + parX;
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);

      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'lighter'; // stars add light, they don't stack mud

      for (let i = 0; i < stars.length; i++) {
        const st = stars[i];

        // rotate about Y, then about X
        const x1 = st.x * cosY - st.z * sinY;
        const z1 = st.x * sinY + st.z * cosY;
        const y1 = st.y * cosX - z1 * sinX;
        const z2 = st.y * sinX + z1 * cosX;

        const depth = CAM_Z - z2;
        if (depth < NEAR || depth > FAR) continue;

        const scale = focal / depth;
        const sx = cx + x1 * scale;
        const sy = cy - y1 * scale;
        let size = STAR_SIZE * scale;
        if (size < 0.4) continue;
        if (st.bright) size *= BRIGHT_SCALE;

        const r = size / 2;
        if (sx < -r || sx > w + r || sy < -r || sy > h + r) continue;

        // fade into the far plane so stars dissolve instead of popping
        const fade = depth > FAR - 24 ? (FAR - depth) / 24 : 1;
        // each star breathes on its own phase and rate
        const twinkle = 1 - TWINKLE_DEPTH * (0.5 + 0.5 * Math.sin(elapsed * st.tw + st.ph));

        ctx.globalAlpha = Math.min(1, st.a * fade * twinkle * 0.85);
        const sprite = st.bright ? flareSprites[st.t] : starSprites[st.t];
        ctx.drawImage(sprite, sx - r, sy - r, size, size);
      }

      ctx.globalAlpha = 1;
      drawMeteors(dt);
      ctx.globalCompositeOperation = 'source-over';
    };

    let raf = 0;
    let last = 0;

    const tick = (now) => {
      // seconds since the previous frame, clamped
      const dt = last ? Math.min((now - last) / 1000, MAX_STEP) : 1 / 60;
      last = now;
      elapsed += dt;

      baseY += DRIFT_Y * dt;
      baseX += DRIFT_X * dt;

      // frame-rate independent exponential ease toward the pointer target
      const k = 1 - Math.exp(-EASE * dt);
      parY += (targetY - parY) * k;
      parX += (targetX - parX) * k;

      draw(dt);
      raf = requestAnimationFrame(tick);
    };

    const start = () => {
      if (raf) return;
      last = 0; // resume without a jump after a pause
      raf = requestAnimationFrame(tick);
    };
    const stop = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };

    const onVisibility = () => {
      if (document.hidden) stop();
      else if (!reduce) start();
    };

    let resizeTimer = 0;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        resize();
        if (reduce) draw(0);
      }, 150);
    };

    resize();

    if (reduce) {
      // honour the preference but still show the field — one static frame
      draw(0);
    } else {
      if (!coarse) window.addEventListener('pointermove', onMove, { passive: true });
      document.addEventListener('visibilitychange', onVisibility);
      start();
    }

    window.addEventListener('resize', onResize, { passive: true });

    return () => {
      stop();
      clearTimeout(resizeTimer);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} className="starfield" aria-hidden="true" />;
};

export default Starfield;
