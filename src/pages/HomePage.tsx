import { Link } from 'react-router-dom';
import { Phone } from 'lucide-react';
import Metadata from '../seo/MetaData';

export default function HomePage() {
  return (
    <main id="main-content" className="container">
      <Metadata title="Home" />

      <section className="hero">
        <div>
          <span className="badge">Family-Owned & Authentic</span>
          <h1 style={{ paddingTop: '0.75rem', paddingBottom: '0.5rem' }}>
            Dynasty King
          </h1>
          <p className="subtitle">Where tradition meets taste</p>
          <p>
            Authentic Chinese cuisine hand-crafted with fresh ingredients and cherished
            family recipes, proudly serving the Tallman, NY community.
          </p>
          <div className="actions">
            <Link to="/menu" className="btn primary">View Our Menu</Link>
            <a href="tel:+18453572252" className="btn ghost">
              <Phone size={16} />
              (845) 357-2252
            </a>
          </div>
        </div>
      </section>

      <div className="divider" />

      <section>
        <h2 className="section-title">Why Dynasty King</h2>
        <div className="highlights">
          <div className="highlight-card">
            <span className="icon" role="img" aria-label="Wok">&#x1F373;</span>
            <h3>Wok-Fired Fresh</h3>
            <p>Every dish is made to order with the freshest ingredients, never pre-cooked or sitting under heat lamps.</p>
          </div>
          <div className="highlight-card">
            <span className="icon" role="img" aria-label="Family">&#x1F46A;</span>
            <h3>Family Recipes</h3>
            <p>Cherished recipes brought from China, perfected over generations and served with love.</p>
          </div>
          <div className="highlight-card">
            <span className="icon" role="img" aria-label="Clock">&#x23F0;</span>
            <h3>Fast & Friendly</h3>
            <p>Quick service with a smile. Order by phone and your food will be ready when you arrive.</p>
          </div>
        </div>
      </section>

      <div className="divider" />

      <section>
        <h2 className="section-title">Visit Us</h2>
        <div className="card">
          <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.7 }}>
            <strong style={{ color: 'var(--text)' }}>296 Route 59, Tallman, NY</strong>
            <br />
            <a href="tel:+18453572252" style={{ color: 'var(--brand-2)', textDecoration: 'none', fontWeight: 600 }}>
              (845) 357-2252
            </a>
            {' '}&mdash; Takeout & Delivery Only
          </p>
          <div style={{ marginTop: '1rem' }}>
            <iframe
              title="Map to Dynasty King, Tallman, NY"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6012.092518601745!2d-74.10340052367998!3d41.111680771336026!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2e741fb7d49df%3A0xa3e09de16e86f48e!2sDynasty%20King!5e0!3m2!1sen!2sus!4v1755544551934!5m2!1sen!2sus"
              width="100%"
              height="320"
              loading="lazy"
              style={{ border: 0, borderRadius: '12px' }}
            />
          </div>
        </div>
      </section>

      <div className="cta-banner">
        <h2>Ready to Order?</h2>
        <p>Call us now or browse our full menu online.</p>
        <Link to="/menu" className="btn">View Full Menu</Link>
      </div>
    </main>
  );
}
