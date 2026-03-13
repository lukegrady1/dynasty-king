import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Metadata from '../seo/MetaData';

const tileHover = {
  whileHover: { scale: 1.02, filter: 'brightness(1.05)' },
  transition: { duration: 0.3 },
};

const IMG = {
  hero: 'https://images.unsplash.com/photo-1526318896980-cf78c088247c?w=1200&h=600&fit=crop&q=80',
  dumplings: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800&h=600&fit=crop&q=80',
  noodles: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&h=800&fit=crop&q=80',
  spread: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=800&h=600&fit=crop&q=80',
  wok: 'https://images.unsplash.com/photo-1625398407796-82650a8c135f?w=800&h=600&fit=crop&q=80',
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
        {/* Hero image spanning 8 cols */}
        <motion.div
          className="mosaic-tile"
          style={{ gridColumn: 'span 8', gridRow: 'span 3' }}
          {...tileHover}
        >
          <img src={IMG.hero} alt="Chinese cuisine spread" loading="eager" />
          <div className="tile-overlay" />
          <div style={{
            position: 'absolute', zIndex: 2, bottom: '2rem', left: '2rem',
          }}>
            <h1 style={{
              fontSize: 'clamp(1.8rem, 4vw, 3rem)',
              fontWeight: 700,
              letterSpacing: '0.05em',
              color: '#fff',
              textShadow: '0 2px 12px rgba(0,0,0,0.5)',
            }}>
              Dynasty King
            </h1>
            <p style={{
              fontSize: '0.7rem',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.85)',
              textShadow: '0 1px 6px rgba(0,0,0,0.4)',
            }}>
              Authentic Chinese Cuisine &middot; Tallman, NY
            </p>
          </div>
        </motion.div>

        {/* Order tile */}
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

        {/* Noodles image */}
        <motion.div
          className="mosaic-tile"
          style={{ gridColumn: 'span 4', gridRow: 'span 1' }}
          {...tileHover}
        >
          <img src={IMG.noodles} alt="Noodle dish" loading="lazy" />
          <div className="tile-overlay" />
        </motion.div>

        {/* Menu tile with image */}
        <Link to="/menu" style={{ textDecoration: 'none', display: 'contents' }}>
          <motion.div
            className="mosaic-tile"
            style={{ gridColumn: 'span 4', gridRow: 'span 2' }}
            {...tileHover}
          >
            <img src={IMG.dumplings} alt="Dumplings" loading="lazy" />
            <div className="tile-overlay" />
            <span className="tile-label" style={{ textShadow: '0 1px 8px rgba(0,0,0,0.6)', color: '#fff' }}>Menu</span>
          </motion.div>
        </Link>

        {/* About tile with image */}
        <Link to="/about" style={{ textDecoration: 'none', display: 'contents' }}>
          <motion.div
            className="mosaic-tile"
            style={{ gridColumn: 'span 4', gridRow: 'span 2' }}
            {...tileHover}
          >
            <img src={IMG.spread} alt="Chinese food spread" loading="lazy" />
            <div className="tile-overlay" />
            <span className="tile-label" style={{ textShadow: '0 1px 8px rgba(0,0,0,0.6)', color: '#fff' }}>About</span>
          </motion.div>
        </Link>

        {/* Contact tile with image */}
        <Link to="/contact" style={{ textDecoration: 'none', display: 'contents' }}>
          <motion.div
            className="mosaic-tile"
            style={{ gridColumn: 'span 4', gridRow: 'span 2' }}
            {...tileHover}
          >
            <img src={IMG.wok} alt="Wok cooking" loading="lazy" />
            <div className="tile-overlay" />
            <span className="tile-label" style={{ textShadow: '0 1px 8px rgba(0,0,0,0.6)', color: '#fff' }}>Contact &amp; Location</span>
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
