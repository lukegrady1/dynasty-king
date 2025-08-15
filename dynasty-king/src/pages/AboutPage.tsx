

import "../styles.css";
import { Link } from "react-router-dom";

function DynastyLogo({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="currentColor" aria-label="Dynasty King dragon-crown logo">
      <path d="M32 6c8 0 14 4 18 10-5-1-8 1-10 4 3 0 7 1 9 5-5 0-8 2-10 4 2 1 4 3 4 6 0 6-5 11-11 11S21 35 21 29c0-3 1-5 4-6-2-2-5-4-10-4 2-4 7-8 17-13ZM17 50c3 5 9 8 15 8s12-3 15-8H17Z" />
    </svg>
  );
}

function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-200/40" style={{ background: '#FDF9E9' }}>
      <div className="mx-auto flex h-18 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-3 font-serif text-xl tracking-wide transition-transform duration-200 hover:scale-105">
          <img src="/assets/Dynasty_King.png" alt="Dynasty King" style={{ height: 40, width: "auto" }} />
        </Link>
        <nav className="hidden gap-8 sm:flex">
          <Link to="/" className="text-sm font-medium text-[#940000] transition-colors duration-200 tracking-wide">Home</Link>
          <Link to="/menu" className="text-sm font-medium text-neutral-700 hover:text-[#940000] transition-colors duration-200 tracking-wide">Menu</Link>
          <Link to="/about" className="text-sm font-medium text-neutral-700 hover:text-[#940000] transition-colors duration-200 tracking-wide">About</Link>
          <Link to="/contact" className="text-sm font-medium text-neutral-700 hover:text-[#940000] transition-colors duration-200 tracking-wide">Contact</Link>
        </nav>
      </div>
    </header>
  );
}

export default function AboutPage() {
  return (
    <div className="min-h-dvh bg-white text-neutral-900 antialiased">
      <Navbar />
      <section className="bg-gradient-to-b from-neutral-100 to-white py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 text-center">
          <h1 className="font-serif text-4xl leading-tight text-neutral-900 sm:text-5xl md:text-6xl mb-4">About Dynasty King</h1>
          <p className="max-w-2xl mx-auto text-balance text-neutral-600 mb-8">
            Dynasty King is a modern Chinese restaurant blending tradition and innovation. Our menu features classic favorites and creative new dishes, all crafted with fresh ingredients and authentic flavors.
          </p>
          <div className="prose prose-lg mx-auto text-neutral-700 text-left">
            <p>
              We believe in hospitality, community, and sharing the joy of great food. Whether you’re here for a family dinner, a quick lunch, or a special celebration, our team is dedicated to making your experience memorable.
            </p>
            <p>
              <strong>Location:</strong> 123 Dragon Street, Food City, USA<br/>
              <strong>Hours:</strong> Mon-Sun, 11am – 10pm
            </p>
            <p>
              Thank you for choosing Dynasty King. We look forward to serving you!
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
