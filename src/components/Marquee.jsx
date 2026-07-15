import '../styles/Marquee.css';

/**
 * Marquee — a seamless, infinitely-scrolling band. The track is
 * duplicated so the CSS animation can translate exactly one copy's
 * width and loop with no visible seam. Pauses on hover and honours
 * reduced-motion (handled in CSS). Purely decorative → aria-hidden.
 */
const Marquee = ({ items, speed = 38, reverse = false, separator = '·' }) => {
  const track = (
    <div className="marquee__group" aria-hidden="true">
      {items.map((item, i) => (
        <span className="marquee__item" key={i}>
          <span className="marquee__text">{item}</span>
          <span className="marquee__sep">{separator}</span>
        </span>
      ))}
    </div>
  );

  return (
    <div className="marquee" data-reverse={reverse ? 'true' : 'false'}>
      <div className="marquee__track" style={{ '--marquee-duration': `${speed}s` }}>
        {track}
        {track}
      </div>
      <div className="marquee__fade marquee__fade--left" aria-hidden="true" />
      <div className="marquee__fade marquee__fade--right" aria-hidden="true" />
    </div>
  );
};

export default Marquee;
