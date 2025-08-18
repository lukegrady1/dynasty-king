import { Link } from 'react-router-dom';
import DishCard from '../components/DishCard';
import { MENU } from '../data/menu';
import Metadata from '../seo/MetaData';

export default function HomePage() {
  const featured = MENU.slice(0, 3);
  return (
    <main id="main-content" className="container">
      <Metadata title="Home" />
      <section className="hero">
        <div>
          <h1>Dynasty King</h1>
          <p>Where tradition meets taste - authentic Chinese cuisine made with care.</p>
          <div className="actions">
            <Link to="/menu" className="btn primary">View Menu</Link>
          </div>
        </div>
      </section>

      <section>
        <h2 className="section-title">Customer's Favorites</h2>
        <div className="grid cols-3">
          {featured.map(d => <DishCard key={d.name} dish={d} />)}
        </div>
      </section>

      <section>
        <h2 className="section-title">Visit Us</h2>
        <div className="card">
          <p style={{ margin: 0 }}>296 Route 59, Tallman, NY • (845) 357‑2252</p>
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
    </main>
  );
}