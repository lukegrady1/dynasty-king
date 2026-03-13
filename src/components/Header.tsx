import { NavLink } from 'react-router-dom';

export default function Header() {
  return (
    <header className="site">
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem 0' }}>
        <a href="/dynasty-king/" aria-label="Dynasty King Home">
          <img
            src="./assets/Dynasty_King.png"
            alt="Dynasty King Logo"
            width="120"
            height="40"
            style={{ height: 36, width: "auto" }}
            fetchPriority="high"
            decoding="async"
          />
        </a>

        <nav aria-label="Primary">
          <ul style={{ listStyle: 'none', display: 'flex', gap: '1.5rem', margin: 0, padding: 0, flexWrap: 'wrap', alignItems: 'center' }}>
            <li><NavLink to="/" end style={{ minHeight: '44px', display: 'flex', alignItems: 'center' }}>Home</NavLink></li>
            <li><NavLink to="/menu" style={{ minHeight: '44px', display: 'flex', alignItems: 'center' }}>Menu</NavLink></li>
            <li><NavLink to="/about" style={{ minHeight: '44px', display: 'flex', alignItems: 'center' }}>About</NavLink></li>
            <li><NavLink to="/contact" style={{ minHeight: '44px', display: 'flex', alignItems: 'center' }}>Contact</NavLink></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
