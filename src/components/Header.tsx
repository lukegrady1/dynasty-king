import { NavLink } from 'react-router-dom';

export default function Header() {
  return (
    <header className="site">
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.9rem 0' }}>
        <a className="brand" href="/" aria-label="Dynasty King Home">
          <img src="/assets/Dynasty_King.png" alt="Dynasty King Logo" style={{ height: 40, width: "auto" }} />
        </a>

        <div className="hidden md:block text-center text-sm font-medium text-[#940000] tracking-wide">
          Call us at <span className="font-bold">(845) 357-2252</span> - Takeout & Delivery Only
        </div>

        <nav aria-label="Primary">
          <ul style={{ listStyle: 'none', display: 'flex', gap: '1rem', margin: 0, padding: 0 }}>
            <li><NavLink to="/menu">Menu</NavLink></li>
            <li><NavLink to="/about">About</NavLink></li>
            <li><NavLink to="/contact">Contact</NavLink></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}