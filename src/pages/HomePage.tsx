import { Link } from 'react-router-dom';
import { Phone } from 'lucide-react';
import Metadata from '../seo/MetaData';

export default function HomePage() {
  return (
    <main id="main-content" className="container">
      <Metadata title="Home" />

      {/* Hero — centered, elegant, Yang's style */}
      <section className="hero">
        <h1>Dynasty King</h1>
        <p className="chinese-text">皇朝美食</p>
        <p className="subtitle">Authentic Chinese Cuisine</p>
        <p>
          Family-owned &amp; proudly serving Tallman, NY with
          cherished recipes brought from China.
        </p>
        <div className="actions">
          <Link to="/menu" className="btn primary">Menu</Link>
          <a href="tel:+18453572252" className="btn outline">
            <Phone size={15} />
            Order Now
          </a>
        </div>
        <div className="scroll-indicator" aria-hidden="true">&darr;</div>
      </section>

      {/* Divider */}
      <div className="divider">
        <span className="divider-icon" aria-hidden="true">&#9674;</span>
      </div>

      {/* Why Us */}
      <section>
        <h2 className="section-title centered">Why Dynasty King</h2>
        <div className="highlights">
          <div className="highlight-card">
            <span className="icon" role="img" aria-label="Wok">&#x1F373;</span>
            <h3>Wok-Fired Fresh</h3>
            <p>Every dish made to order with the freshest ingredients &mdash; never pre-cooked.</p>
          </div>
          <div className="highlight-card">
            <span className="icon" role="img" aria-label="Family">&#x1F46A;</span>
            <h3>Family Recipes</h3>
            <p>Cherished recipes from China, perfected over generations and served with love.</p>
          </div>
          <div className="highlight-card">
            <span className="icon" role="img" aria-label="Clock">&#x23F0;</span>
            <h3>Fast &amp; Friendly</h3>
            <p>Quick service with a smile. Call ahead and your food will be ready on arrival.</p>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="divider">
        <span className="divider-icon" aria-hidden="true">&#9674;</span>
      </div>

      {/* Visit */}
      <section>
        <h2 className="section-title centered">Find Us</h2>
        <div className="card" style={{ maxWidth: 700, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
            <p style={{ color: 'var(--text)', fontWeight: 600, fontSize: '1.05rem' }}>
              296 Route 59, Tallman, NY
            </p>
            <p style={{ color: 'var(--muted)', marginTop: '0.25rem' }}>
              <a href="tel:+18453572252" style={{ color: 'var(--brand)', textDecoration: 'none', fontWeight: 600 }}>
                (845) 357-2252
              </a>
              {' '}&mdash; Takeout &amp; Delivery Only
            </p>
          </div>
          <iframe
            title="Map to Dynasty King, Tallman, NY"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6012.092518601745!2d-74.10340052367998!3d41.111680771336026!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2e741fb7d49df%3A0xa3e09de16e86f48e!2sDynasty%20King!5e0!3m2!1sen!2sus!4v1755544551934!5m2!1sen!2sus"
            width="100%"
            height="300"
            loading="lazy"
            style={{ border: 0, borderRadius: 'var(--radius)' }}
          />
        </div>
      </section>

      {/* CTA */}
      <div className="cta-section">
        <h2>Ready to Order?</h2>
        <p>Browse our full menu or call us directly to place your order.</p>
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/menu" className="btn primary">View Full Menu</Link>
          <a href="tel:+18453572252" className="btn ghost">
            <Phone size={15} />
            (845) 357-2252
          </a>
        </div>
      </div>
    </main>
  );
}
