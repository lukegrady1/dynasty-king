import { Instagram, Phone, MapPin } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site">
      <div className="container" style={{ padding: "2.5rem 0" }}>
        <div className="cols">
          <div>
            <h3 style={{ marginTop: 0, fontFamily: "'Playfair Display', serif", color: 'var(--brand-2)' }}>Dynasty King</h3>
            <p style={{ color: "var(--muted)", lineHeight: 1.7, marginTop: '0.5rem' }}>
              <MapPin size={14} style={{ verticalAlign: 'middle', marginRight: '0.3rem' }} />
              296 Route 59, Tallman, NY<br />
              <Phone size={14} style={{ verticalAlign: 'middle', marginRight: '0.3rem' }} />
              <a href="tel:+18453572252" style={{ color: 'var(--muted)', textDecoration: 'none' }}>
                (845) 357-2252
              </a>
            </p>
          </div>
          <div>
            <h4 style={{ color: 'var(--brand-2)', marginBottom: '0.4rem' }}>Hours</h4>
            <p style={{ color: "var(--muted)", lineHeight: 1.7 }}>
              Mon&ndash;Thu: 11:30am&ndash;9pm<br />
              Fri&ndash;Sat: 11:30am&ndash;9:30pm<br />
              Sun: 3pm&ndash;9pm
            </p>
          </div>
          <div>
            <h4 style={{ color: 'var(--brand-2)', marginBottom: '0.4rem' }}>Follow Us</h4>
            <p>
              <a
                href="https://www.instagram.com/dynastykingny"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "var(--muted)", textDecoration: 'none', transition: 'color 0.2s' }}
              >
                <Instagram size={18} />
                <span>@dynastykingny</span>
              </a>
            </p>
          </div>
        </div>
        <div style={{ marginTop: "1.5rem", paddingTop: '1rem', borderTop: '1px solid #ffffff08' }}>
          <small>&copy; {year} Dynasty King. All rights reserved.</small>
        </div>
      </div>
    </footer>
  );
}
