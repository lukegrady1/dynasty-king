import Metadata from '../seo/MetaData';

export default function ContactPage() {
  return (
    <main id="main-content" className="container">
      <Metadata title="Contact Us" />
      <h1 className="section-title" style={{ marginTop: '1.2rem' }}>Contact Us</h1>

      <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        <section className="card">
          <h2 style={{ marginTop: 0 }}>Takeout & Delivery Only</h2>
          <p style={{ color: 'var(--muted)' }}>
            Dynasty King does not offer dine-in. Please place your order for takeout or delivery.
          </p>

          <h3>Order by Phone</h3>
          <p>
            Call us at <strong>(845) 357-2252</strong> to place your order.
          </p>

          <h3>Hours</h3>
          <p style={{ color: 'var(--muted)' }}>
            Mon–Thu: 11:30am–9pm<br />
            Fri–Sat: 11:30am–9:30pm<br />
            Sun: 5pm–9pm
          </p>
        </section>

        <aside className="card">
          <h2 style={{ marginTop: 0 }}>Find Us</h2>
          <p style={{ color: 'var(--muted)' }}>
            296 Route 59, Tallman, NY<br/>
            (845) 357-2252<br/>
            hello@dynastyking.example
          </p>
          <iframe
            title="Map to Dynasty King, Tallman NY"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6012.092518601745!2d-74.10340052367998!3d41.111680771336026!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2e741fb7d49df%3A0xa3e09de16e86f48e!2sDynasty%20King!5e0!3m2!1sen!2sus!4v1755544551934!5m2!1sen!2sus"
            width="100%"
            height="260"
            loading="lazy"
            style={{ border: 0, borderRadius: '12px' }}
          />
        </aside>
      </div>
    </main>
  );
}
