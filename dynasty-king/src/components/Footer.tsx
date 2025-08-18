export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site">
      <div className="container" style={{ padding: '2rem 0' }}>
        <div className="cols">
          <div>
            <h3 style={{ marginTop: 0 }}>Dynasty King</h3>
            <p style={{ color: 'var(--muted)' }}>
              296 Route 59, Tallman, NY<br />
              (845) 357‑2252
            </p>
          </div>
          <div>
            <h4>Hours</h4>
            <p style={{ color: 'var(--muted)' }}>
              Mon–Thu: 11:30am–9pm<br />
              Fri–Sat: 11:30am–9:30pm<br />
              Sun: 5pm–9pm
            </p>
          </div>
          <div>
            <h4>Follow us on Instagram!</h4>
            <p style={{ color: 'var(--muted)' }}>
              <a href="#" aria-label="Instagram">Instagram</a> · <a href="#" aria-label="Facebook">Facebook</a>
            </p>
          </div>
        </div>
        <div style={{ marginTop: '1rem' }}>
          <small>© {year} Dynasty King. All rights reserved.</small>
        </div>
      </div>
    </footer>
  );
}