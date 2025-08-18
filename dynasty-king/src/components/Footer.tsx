export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site">
      <div className="container" style={{ padding: '2rem 0' }}>
        <div className="cols">
          <div>
            <h3 style={{ marginTop: 0 }}>Golden Dragon</h3>
            <p style={{ color: 'var(--muted)' }}>
              88 Lucky Street, Worcester, MA<br />
              (508) 555‑0133
            </p>
          </div>
          <div>
            <h4>Hours</h4>
            <p style={{ color: 'var(--muted)' }}>
              Mon–Thu: 11am–9pm<br />
              Fri–Sat: 11am–10pm<br />
              Sun: 12pm–8pm
            </p>
          </div>
          <div>
            <h4>Follow</h4>
            <p style={{ color: 'var(--muted)' }}>
              <a href="#" aria-label="Instagram">Instagram</a> · <a href="#" aria-label="Facebook">Facebook</a>
            </p>
          </div>
        </div>
        <div style={{ marginTop: '1rem' }}>
          <small>© {year} Golden Dragon. All rights reserved.</small>
        </div>
      </div>
    </footer>
  );
}