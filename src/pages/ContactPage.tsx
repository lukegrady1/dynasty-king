import { Phone, MapPin, Clock, Instagram } from 'lucide-react';
import Metadata from '../seo/MetaData';

export default function ContactPage() {
  return (
    <main id="main-content" className="container">
      <Metadata title="Contact Us" />

      <section className="hero" style={{ paddingBottom: '1.5rem' }}>
        <span className="badge">Get In Touch</span>
        <h1 style={{ marginTop: '0.75rem' }}>Contact Us</h1>
        <p>
          Ready to order? Give us a call or stop by for pickup.
        </p>
      </section>

      <div className="grid contact-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '1.5rem', maxWidth: 900, margin: '0 auto' }}>
        <section className="card">
          <h2 style={{ marginTop: 0, fontFamily: "'Playfair Display', serif", fontSize: '1.3rem' }}>Takeout &amp; Delivery</h2>
          <p style={{ color: 'var(--muted)', lineHeight: 1.7, marginTop: '0.75rem' }}>
            Dynasty King does not offer dine-in. Please place your order for takeout or delivery.
          </p>

          <h3 style={{ color: 'var(--text)', marginTop: '1.5rem', marginBottom: '0.5rem', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Phone size={15} style={{ color: 'var(--brand)' }} />
            Order by Phone
          </h3>
          <p>
            <a href="tel:+18453572252" style={{ color: 'var(--brand)', textDecoration: 'none', fontWeight: 600 }}>
              (845) 357-2252
            </a>
          </p>

          <h3 style={{ color: 'var(--text)', marginTop: '1.5rem', marginBottom: '0.5rem', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Clock size={15} style={{ color: 'var(--brand)' }} />
            Hours
          </h3>
          <p style={{ color: 'var(--muted)', lineHeight: 1.8 }}>
            Mon&ndash;Thu: 11:30am&ndash;9pm<br />
            Fri&ndash;Sat: 11:30am&ndash;9:30pm<br />
            Sun: 3pm&ndash;9pm
          </p>

          <h3 style={{ color: 'var(--text)', marginTop: '1.5rem', marginBottom: '0.5rem', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Instagram size={15} style={{ color: 'var(--brand)' }} />
            Follow Us
          </h3>
          <p>
            <a
              href="https://www.instagram.com/dynastykingny"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--text)', textDecoration: 'none', fontWeight: 500 }}
            >
              @dynastykingny
            </a>
          </p>
        </section>

        <aside className="card">
          <h2 style={{ marginTop: 0, fontFamily: "'Playfair Display', serif", fontSize: '1.3rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <MapPin size={18} style={{ color: 'var(--brand)' }} />
            Find Us
          </h2>
          <address style={{ color: 'var(--muted)', fontStyle: 'normal', lineHeight: '1.7', marginTop: '0.75rem' }}>
            296 Route 59, Tallman, NY<br />
            <a href="tel:+18453572252" style={{ color: 'var(--brand)', textDecoration: 'none' }}>(845) 357-2252</a>
          </address>
          <iframe
            title="Map to Dynasty King, Tallman NY"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6012.092518601745!2d-74.10340052367998!3d41.111680771336026!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2e741fb7d49df%3A0xa3e09de16e86f48e!2sDynasty%20King!5e0!3m2!1sen!2sus!4v1755544551934!5m2!1sen!2sus"
            width="100%"
            height="280"
            loading="lazy"
            style={{ border: 0, borderRadius: 'var(--radius)', marginTop: '1rem' }}
          />
        </aside>
      </div>
    </main>
  );
}
