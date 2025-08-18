import { useState } from 'react';
import Metadata from '../seo/MetaData';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', phone: '', date: '', time: '', partySize: 2, notes: '' });
  const [submitted, setSubmitted] = useState(false);

  function onChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: name === 'partySize' ? Number(value) : value }));
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: send to API / email service
    setSubmitted(true);
  }

  return (
    <main id="main-content" className="container">
      <Metadata title="Contact & Reservations" />
      <h1 className="section-title" style={{ marginTop: '1.2rem' }}>Contact & Reservations</h1>

      <div className="grid" style={{ gridTemplateColumns: '1.2fr .8fr' }}>
        <form className="card" onSubmit={onSubmit} aria-describedby="reserve-desc">
          <p id="reserve-desc" style={{ color: 'var(--muted)', marginTop: 0 }}>
            Book a table — we’ll confirm by phone or email.
          </p>

          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
            <div>
              <label htmlFor="name">Name</label>
              <input id="name" name="name" required value={form.name} onChange={onChange} />
            </div>
            <div>
              <label htmlFor="phone">Phone</label>
              <input id="phone" name="phone" type="tel" required value={form.phone} onChange={onChange} />
            </div>
            <div>
              <label htmlFor="date">Date</label>
              <input id="date" name="date" type="date" required value={form.date} onChange={onChange} />
            </div>
            <div>
              <label htmlFor="time">Time</label>
              <input id="time" name="time" type="time" required value={form.time} onChange={onChange} />
            </div>
            <div>
              <label htmlFor="partySize">Party Size</label>
              <select id="partySize" name="partySize" value={form.partySize} onChange={onChange}>
                {Array.from({ length: 12 }, (_, i) => i + 1).map(n => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>
          </div>

          <div style={{ marginTop: '.75rem' }}>
            <label htmlFor="notes">Notes</label>
            <textarea id="notes" name="notes" rows={4} placeholder="Allergies, occasion, seating preference…" value={form.notes} onChange={onChange} />
          </div>

          <div style={{ marginTop: '1rem' }}>
            <button className="btn primary" type="submit">Request Reservation</button>
            {submitted && <span role="status" style={{ marginLeft: '.75rem' }}>Thanks! We will confirm shortly.</span>}
          </div>
        </form>

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