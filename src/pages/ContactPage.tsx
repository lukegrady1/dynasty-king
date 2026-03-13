import { Phone, MapPin, Clock, Instagram } from 'lucide-react';
import { motion } from 'framer-motion';
import Metadata from '../seo/MetaData';

export default function ContactPage() {
  return (
    <motion.main
      id="main-content"
      className="page-content"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Metadata title="Contact Us" />

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '2rem 1.5rem' }}>
        <div className="gold-divider" style={{ marginBottom: '2rem' }} />
        <h1 className="section-heading" style={{ marginBottom: '2rem' }}>Contact &amp; Location</h1>

        <div className="grid contact-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <motion.section
            className="card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <h2 style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '1.25rem' }}>
              Takeout &amp; Delivery Only
            </h2>
            <p style={{ color: 'var(--muted)', lineHeight: 1.7, fontSize: '0.85rem' }}>
              Dynasty King does not offer dine-in. Please place your order for takeout or delivery.
            </p>

            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', marginTop: '1.5rem', marginBottom: '0.5rem' }}>
              <Phone size={13} style={{ color: 'var(--gold)' }} />
              Order by Phone
            </h3>
            <p style={{ fontSize: '0.9rem' }}>
              <a href="tel:+18453572252" style={{ color: 'var(--text)', textDecoration: 'none', fontWeight: 600 }}>
                (845) 357-2252
              </a>
            </p>

            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', marginTop: '1.5rem', marginBottom: '0.5rem' }}>
              <Clock size={13} style={{ color: 'var(--gold)' }} />
              Hours
            </h3>
            <p style={{ color: 'var(--muted)', lineHeight: 1.8, fontSize: '0.85rem' }}>
              Mon&ndash;Thu: 11:30am&ndash;9pm<br />
              Fri&ndash;Sat: 11:30am&ndash;9:30pm<br />
              Sun: 3pm&ndash;9pm
            </p>

            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', marginTop: '1.5rem', marginBottom: '0.5rem' }}>
              <Instagram size={13} style={{ color: 'var(--gold)' }} />
              Follow Us
            </h3>
            <p>
              <a
                href="https://www.instagram.com/dynastykingny"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--muted)', textDecoration: 'none', fontSize: '0.85rem' }}
              >
                @dynastykingny
              </a>
            </p>
          </motion.section>

          <motion.aside
            className="card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <h2 style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <MapPin size={14} />
              Find Us
            </h2>
            <address style={{ color: 'var(--muted)', fontStyle: 'normal', lineHeight: '1.7', fontSize: '0.85rem' }}>
              296 Route 59, Tallman, NY<br />
              <a href="tel:+18453572252" style={{ color: 'var(--text)', textDecoration: 'none' }}>(845) 357-2252</a>
            </address>
            <iframe
              title="Map to Dynasty King, Tallman NY"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6012.092518601745!2d-74.10340052367998!3d41.111680771336026!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2e741fb7d49df%3A0xa3e09de16e86f48e!2sDynasty%20King!5e0!3m2!1sen!2sus!4v1755544551934!5m2!1sen!2sus"
              width="100%"
              height="260"
              loading="lazy"
              style={{ border: 0, marginTop: '1rem' }}
            />
          </motion.aside>
        </div>
      </div>
    </motion.main>
  );
}
