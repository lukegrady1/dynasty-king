// src/pages/AboutPage.tsx
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Metadata from '../seo/MetaData';

function StarRating({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating);
  const emptyStars = 5 - fullStars;

  return (
    <span className="stars">
      {Array.from({ length: fullStars }).map((_, i) => (
        <span key={`full-${i}`}>&#9733;</span>
      ))}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <span key={`empty-${i}`} style={{ opacity: 0.2 }}>&#9733;</span>
      ))}
    </span>
  );
}

const reviews = [
  {
    name: 'Eric B.',
    rating: 5,
    text: 'Best Chinese food in Rockland! Always fast service and high quality food. All the workers are so friendly and pleasant. I go all the time 10/10',
  },
  {
    name: 'David N.',
    rating: 5,
    text: 'Nothing short of a top tier restaurant. Some of the best tasting Chinese food around! What helpful staff and amazing cooks as well as service. Go to take out every single time.',
  },
  {
    name: 'Adam M.',
    rating: 5,
    text: "I've been eating at this place since I was maybe 12, and it never disappoints. Pork fried rice, sesame chicken and a snapple *chefs kiss*",
  },
];

export default function AboutPage() {
  return (
    <motion.main
      id="main-content"
      className="page-content"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="our-story" style={{ paddingTop: '2rem' }}>
        <div className="gold-divider" style={{ marginBottom: '2rem' }} />
        <h2>Our Story</h2>
        <Metadata title="About" />
        <p>
          Dynasty King is a family-owned Chinese restaurant proudly serving the Tallman, NY community. Founded by
          immigrants from China, our story is one of tradition, perseverance, and passion for authentic cuisine.
        </p>
        <p>
          From humble beginnings, the owners brought with them cherished family recipes and the dedication to
          recreate the flavors of home. Every dish we serve reflects the rich culinary heritage of
          China&mdash;hand-crafted with care and fresh ingredients that defines true Chinese cooking.
        </p>
        <p>
          For us, Dynasty King is more than just a restaurant. It is a place where family, friends, and
          neighbors can gather, share a meal, and feel at home. Our mission has always been to bring people
          together through food that celebrates culture, honors tradition, and creates lasting memories.
        </p>
      </div>

      <div className="gold-divider" />

      <motion.div
        className="container"
        style={{ maxWidth: 650, padding: '3rem 1.5rem' }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="section-heading">Reviews</h2>
        <div className="card">
          {reviews.map((review, idx) => (
            <div className="review-card" key={idx}>
              <div className="reviewer">{review.name}</div>
              <StarRating rating={review.rating} />
              <blockquote>&ldquo;{review.text}&rdquo;</blockquote>
            </div>
          ))}
        </div>
      </motion.div>

      <div style={{ textAlign: 'center', paddingBottom: '3rem' }}>
        <Link to="/menu" className="btn primary">View Our Menu</Link>
      </div>
    </motion.main>
  );
}
