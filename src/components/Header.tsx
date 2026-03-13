import { NavLink } from 'react-router-dom';
import { Phone } from 'lucide-react';

export default function Header() {
  return (
    <header className="site">
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.9rem 0' }}>
        <a className="brand" href="/dynasty-king/" aria-label="Dynasty King Home">
          <img
            src="./assets/Dynasty_King.png"
            alt="Dynasty King Logo"
            width="120"
            height="40"
            style={{ height: 40, width: "auto" }}
            fetchPriority="high"
            decoding="async"
          />
        </a>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          fontSize: '0.85rem',
          fontWeight: 600,
          color: 'var(--brand-2)',
        }}>
          <Phone size={14} />
          <a href="tel:+18453572252" style={{ color: 'inherit', textDecoration: 'none' }}>
            (845) 357-2252
          </a>
        </div>

        <nav aria-label="Primary">
          <ul style={{ listStyle: 'none', display: 'flex', gap: '1rem', margin: 0, padding: 0, flexWrap: 'wrap' }}>
            <li><NavLink to="/menu" style={{ minHeight: '44px', display: 'flex', alignItems: 'center' }}>Menu</NavLink></li>
            <li><NavLink to="/about" style={{ minHeight: '44px', display: 'flex', alignItems: 'center' }}>About</NavLink></li>
            <li><NavLink to="/contact" style={{ minHeight: '44px', display: 'flex', alignItems: 'center' }}>Contact</NavLink></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
