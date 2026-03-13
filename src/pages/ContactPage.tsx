import { Phone, MapPin, Clock, Instagram } from 'lucide-react';
import Metadata from '../seo/MetaData';

export default function ContactPage() {
  return (
    <main id="main-content" className="container">
      <Metadata title="Contact Us" />

      <section className="hero" style={{ paddingBottom: '1rem' }}>
        <div>
          <span className="badge">Get In Touch</span>
          <h1 style={{ paddingTop: '0.75rem' }}>Contact Us</h1>
          <p>
            Ready to order? Give us a call or stop by for pickup.
            We&rsquo;re here to serve you.
          </p>
        </div>
      </section>

      <div className="grid contact-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        <section className="card">
          <h2 style={{ marginTop: 0, fontFamily: "'Playfair Display', serif" }}>Takeout & Delivery Only</h2>
          <p style={{ color: 'var(--muted)', lineHeight: 1.7, marginTop: '0.75rem' }}>
            Dynasty King does not offer dine-in. Please place your order for takeout or delivery.
          </p>

          <h3 style={{ color: 'var(--brand-2)', marginTop: '1.5rem', marginBottom: '0.5rem' }}>
            <Phone size={16} style={{ verticalAlign: 'middle', marginRight: '0.4rem' }} />
            Order by Phone
          </h3>
          <p>
            Call us at{' '}
            <strong>
              <a href="tel:+18453572252" style={{ color: 'var(--brand)', textDecoration: 'none' }}>
                (845) 357-2252
              </a>
            </strong>{' '}
            to place your order.
          </p>

          <h3 style={{ color: 'var(--brand-2)', marginTop: '1.5rem', marginBottom: '0.5rem' }}>
            <Clock size={16} style={{ verticalAlign: 'middle', marginRight: '0.4rem' }} />
            Hours
          </h3>
          <p style={{ color: 'var(--muted)', lineHeight: 1.8 }}>
            Mon&ndash;Thu: 11:30am&ndash;9pm<br />
            Fri&ndash;Sat: 11:30am&ndash;9:30pm<br />
            Sun: 3pm&ndash;9pm
          </p>

          <h3 style={{ color: 'var(--brand-2)', marginTop: '1.5rem', marginBottom: '0.5rem' }}>
            <Instagram size={16} style={{ verticalAlign: 'middle', marginRight: '0.4rem' }} />
            Follow Us
          </h3>
          <p>
            <a
              href="https://www.instagram.com/dynastykingny"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--text)', textDecoration: 'none' }}
            >
              @dynastykingny
            </a>
          </p>
        </section>

        <aside className="card">
          <h2 style={{ marginTop: 0, fontFamily: "'Playfair Display', serif" }}>
            <MapPin size={18} style={{ verticalAlign: 'middle', marginRight: '0.4rem' }} />
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
            style={{ border: 0, borderRadius: '12px', marginTop: '1rem' }}
          />
        </aside>
      </div>
    </main>
  );
}
