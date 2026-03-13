import { Instagram } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site">
      <div className="footer-content">
        <div className="gold-divider" style={{ marginBottom: '2rem' }} />

        <div className="footer-phone">
          <a href="tel:+18453572252">(845) 357-2252</a>
        </div>

        <div className="footer-address">
          296 Route 59, Tallman, NY
        </div>

        <div className="footer-hours">
          Mon&ndash;Thu: 11:30am&ndash;9pm<br />
          Fri&ndash;Sat: 11:30am&ndash;9:30pm<br />
          Sun: 3pm&ndash;9pm
        </div>

        <a
          href="https://www.instagram.com/dynastykingny"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-social"
          aria-label="Instagram"
          style={{ display: 'inline-flex' }}
        >
          <Instagram size={14} />
          <span>@dynastykingny</span>
        </a>

        <div className="footer-copyright">
          &copy; {year} Dynasty King. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
