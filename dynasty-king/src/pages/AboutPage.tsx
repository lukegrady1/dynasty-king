import Metadata from '../seo/MetaData';

export default function AboutPage() {
  return (
    <main id="main-content" className="container">
      <Metadata title="About" />
      <h1 className="section-title" style={{ marginTop: '1.2rem' }}>Our Story</h1>
      <div className="card">
        <p>
          Golden Dragon blends tradition with innovation. From hand‑pleated dumplings to
          farm‑fresh produce, our chefs craft every dish with care and wok‑hei mastery.
        </p>
        <p>
          We’re a family‑owned restaurant proudly serving Worcester since 1996.
        </p>
      </div>

      <h2 className="section-title">Awards</h2>
      <ul className="card" style={{ lineHeight: 1.8 }}>
        <li>Best Chinese Restaurant — Worcester Weekly</li>
        <li>Top 100 Restaurants in MA — Foodie Guide</li>
        <li>TripAdvisor Travelers’ Choice</li>
      </ul>
    </main>
  );
}