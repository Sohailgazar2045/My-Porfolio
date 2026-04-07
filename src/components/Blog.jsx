import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiClock, HiChevronDown, HiSparkles } from 'react-icons/hi';
import data from '../data.json';
import '../styles/Blog.css';

const Blog = () => {
  const { blogs } = data;
  const [openSlug, setOpenSlug] = useState(null);

  const featured = blogs.find((b) => b.featured) ?? blogs[0];
  const rest = blogs.filter((b) => b.slug !== featured?.slug);

  const toggle = (slug) => {
    setOpenSlug((prev) => (prev === slug ? null : slug));
  };

  return (
    <section id="insights" className="insights section-surface">
      <div className="insights__glow insights__glow--1" aria-hidden />
      <div className="insights__glow insights__glow--2" aria-hidden />
      <div className="container">
        <motion.div
          className="insights__header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
        >
          <span className="section-label">Insights</span>
          <h2 className="section-title insights__title">Engineering notes</h2>
          <p className="section-subtitle insights__subtitle">
            Long-form thinking on the same technologies behind my work—written for builders who care about
            craft, reliability, and product feel.
          </p>
        </motion.div>

        {featured && (
          <motion.article
            className="insights-featured glow-card"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.55 }}
          >
            <div className="insights-featured__ribbon">
              <HiSparkles aria-hidden />
              <span>Featured insight</span>
            </div>
            <div className="insights-featured__body">
              <div className="insights-featured__meta">
                <span className="insights-featured__category">{featured.category}</span>
                <span className="insights-featured__read">
                  <HiClock aria-hidden />
                  {featured.readMinutes} min read
                </span>
              </div>
              <h3 className="insights-featured__headline">{featured.title}</h3>
              <p className="insights-featured__excerpt">{featured.excerpt}</p>
              <ul className="insights-featured__takeaways">
                {featured.takeaways.map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
              </ul>
              <div className="insights-featured__tags">
                {featured.tags.map((tag) => (
                  <span key={tag} className="insights-tag">
                    {tag}
                  </span>
                ))}
              </div>
              <button
                type="button"
                className={`insights-expand ${openSlug === featured.slug ? 'insights-expand--open' : ''}`}
                onClick={() => toggle(featured.slug)}
                aria-expanded={openSlug === featured.slug}
              >
                {openSlug === featured.slug ? 'Hide full article' : 'Read full article'}
                <HiChevronDown className="insights-expand__icon" aria-hidden />
              </button>
              <AnimatePresence initial={false}>
                {openSlug === featured.slug && (
                  <motion.div
                    key="featured-body"
                    className="insights-article"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                  >
                    {featured.paragraphs.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.article>
        )}

        <motion.div
          className="insights-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.08 },
            },
          }}
        >
          {rest.map((post) => (
            <motion.div
              key={post.slug}
              className="insights-card glow-card"
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
              }}
            >
              <div className="insights-card__top">
                <span className="insights-card__category">{post.category}</span>
                <span className="insights-card__read">
                  <HiClock aria-hidden />
                  {post.readMinutes} min
                </span>
              </div>
              <h3 className="insights-card__title">{post.title}</h3>
              <p className="insights-card__excerpt">{post.excerpt}</p>
              <div className="insights-card__tags">
                {post.tags.slice(0, 4).map((tag) => (
                  <span key={tag} className="insights-tag insights-tag--muted">
                    {tag}
                  </span>
                ))}
              </div>
              <button
                type="button"
                className={`insights-expand insights-expand--ghost ${openSlug === post.slug ? 'insights-expand--open' : ''}`}
                onClick={() => toggle(post.slug)}
                aria-expanded={openSlug === post.slug}
              >
                {openSlug === post.slug ? 'Show less' : 'Expand article'}
                <HiChevronDown className="insights-expand__icon" aria-hidden />
              </button>
              <AnimatePresence initial={false}>
                {openSlug === post.slug && (
                  <motion.div
                    key={post.slug}
                    className="insights-article insights-article--compact"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.32, ease: [0.25, 0.46, 0.45, 0.94] }}
                  >
                    <ul className="insights-article__takeaways">
                      {post.takeaways.map((line, i) => (
                        <li key={i}>{line}</li>
                      ))}
                    </ul>
                    {post.paragraphs.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Blog;
