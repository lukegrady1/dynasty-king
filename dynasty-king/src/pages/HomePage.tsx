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
          <span className="badge">Since 1996</span>
          <h1>Hand‑crafted dim sum & modern classics</h1>
          <p>Experience wok‑hei perfection, premium ingredients, and a cozy dining room right in Worcester.</p>
          <div className="actions">
            <Link to="/menu" className="btn primary">View Menu</Link>
            <Link to="/contact" className="btn ghost">Reserve</Link>
          </div>
        </div>
      </section>

      <section>
        <h2 className="section-title">Chef’s Picks</h2>
        <div className="grid cols-3">
          {featured.map(d => <DishCard key={d.id} dish={d} />)}
        </div>
      </section>

      <section>
        <h2 className="section-title">Visit Us</h2>
        <div className="card">
          <p style={{ margin: 0 }}>88 Lucky Street, Worcester, MA • (508) 555‑0133</p>
          <div style={{ marginTop: '1rem' }}>
            <iframe
              title="Map to Golden Dragon, Worcester MA"
              src="https://www.google.com/maps?q=Worcester%20MA&output=embed"
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