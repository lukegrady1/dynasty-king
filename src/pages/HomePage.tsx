import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Metadata from '../seo/MetaData';

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.6 },
};

const tileHover = {
  whileHover: { scale: 1.02, filter: 'brightness(1.1)' },
  transition: { duration: 0.3 },
};

export default function HomePage() {
  return (
    <motion.main
      id="main-content"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Metadata title="Home" />

      {/* Spacer for fixed navbar */}
      <div style={{ height: 60 }} />

      {/* Photo Mosaic Grid */}
      <div className="photo-mosaic" style={{ minHeight: '60vh' }}>
        {/* Row 1: Large hero tile spanning 8 cols */}
        <motion.div
          className="mosaic-tile"
          style={{ gridColumn: 'span 8', gridRow: 'span 3', background: 'linear-gradient(135deg, #1a1a1a, #0d0d0d)' }}
          {...tileHover}
        >
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <h1 style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 700,
              letterSpacing: '0.05em',
              marginBottom: '0.5rem',
            }}>
              Dynasty King
            </h1>
            <p style={{
              fontSize: '0.7rem',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: 'var(--gold)',
              marginBottom: '0.25rem',
            }}>
              皇朝美食
            </p>
            <p style={{
              fontSize: '0.75rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--muted)',
            }}>
              Authentic Chinese Cuisine &middot; Tallman, NY
            </p>
          </div>
          <div className="tile-overlay" />
        </motion.div>

        {/* Right column: Order tile */}
        <motion.a
          href="tel:+18453572252"
          className="mosaic-tile gold-tile"
          style={{ gridColumn: 'span 4', gridRow: 'span 2', textDecoration: 'none' }}
          {...tileHover}
        >
          <div style={{ textAlign: 'center', padding: '1.5rem' }}>
            <span className="tile-label" style={{ position: 'static', fontSize: '0.8rem' }}>
              Order Now
            </span>
            <p style={{ fontSize: '1.1rem', fontWeight: 700, marginTop: '0.5rem', color: 'var(--bg)' }}>
              (845) 357-2252
            </p>
          </div>
        </motion.a>

        {/* Right column bottom: Takeout label */}
        <motion.div
          className="mosaic-tile placeholder"
          style={{ gridColumn: 'span 4', gridRow: 'span 1' }}
          {...tileHover}
        >
          <span className="tile-label" style={{ position: 'static', color: 'var(--muted)' }}>
            Takeout &amp; Delivery
          </span>
        </motion.div>

        {/* Row 2: Three tiles */}
        <Link to="/menu" style={{ textDecoration: 'none', display: 'contents' }}>
          <motion.div
            className="mosaic-tile placeholder"
            style={{ gridColumn: 'span 4', gridRow: 'span 2', background: 'linear-gradient(135deg, #161616, #0e0e0e)' }}
            {...tileHover}
          >
            <div style={{ textAlign: 'center' }}>
              <span className="tile-label" style={{ position: 'static' }}>Menu</span>
            </div>
            <div className="tile-overlay" />
          </motion.div>
        </Link>

        <Link to="/about" style={{ textDecoration: 'none', display: 'contents' }}>
          <motion.div
            className="mosaic-tile placeholder"
            style={{ gridColumn: 'span 4', gridRow: 'span 2', background: 'linear-gradient(180deg, #141414, #0c0c0c)' }}
            {...tileHover}
          >
            <div style={{ textAlign: 'center' }}>
              <span className="tile-label" style={{ position: 'static' }}>About</span>
            </div>
            <div className="tile-overlay" />
          </motion.div>
        </Link>

        <Link to="/contact" style={{ textDecoration: 'none', display: 'contents' }}>
          <motion.div
            className="mosaic-tile placeholder"
            style={{ gridColumn: 'span 4', gridRow: 'span 2', background: 'linear-gradient(135deg, #131313, #0b0b0b)' }}
            {...tileHover}
          >
            <div style={{ textAlign: 'center' }}>
              <span className="tile-label" style={{ position: 'static' }}>Contact &amp; Location</span>
            </div>
            <div className="tile-overlay" />
          </motion.div>
        </Link>
      </div>

      {/* Our Story Section */}
      <motion.div
        className="our-story"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="gold-divider" style={{ marginBottom: '2rem' }} />
        <h2>Our Story</h2>
        <p>
          Dynasty King is a family-owned Chinese restaurant proudly serving the Tallman, NY
          community. Founded by immigrants from China, we bring cherished family recipes and
          the dedication to recreate the authentic flavors of home.
        </p>
        <p>
          Every dish reflects the rich culinary heritage of China &mdash; hand-crafted with
          care and the freshest ingredients.
        </p>
        <Link to="/about" className="read-more">Read More &rsaquo;</Link>
      </motion.div>
    </motion.main>
  );
}
