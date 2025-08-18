import { NavLink } from 'react-router-dom';
import { useState } from 'react';

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site">
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.9rem 0' }}>
        <a className="brand" href="/" aria-label="Golden Dragon Home">
          <span className="dot" aria-hidden />
          <span>Golden&nbsp;Dragon</span>
        </a>

        <button
          aria-label="Toggle navigation"
          aria-expanded={open}
          onClick={() => setOpen(v => !v)}
          className="btn ghost"
          style={{ display: 'inline-flex' }}
        >
          <span>{open ? 'Close' : 'Menu'}</span>
        </button>

        <nav aria-label="Primary" style={{ display: open ? 'block' : 'none' }}>
          <ul style={{ listStyle: 'none', display: 'flex', gap: '1rem', margin: 0, padding: 0 }}>
            <li><NavLink to="/" end>Home</NavLink></li>
            <li><NavLink to="/menu">Menu</NavLink></li>
            <li><NavLink to="/about">About</NavLink></li>
            <li><NavLink to="/contact">Contact</NavLink></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}