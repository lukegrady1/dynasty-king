import { useEffect } from 'react';

interface MetaProps { title?: string; description?: string; }
export default function Metadata({ title, description }: MetaProps) {
  useEffect(() => {
    const base = 'Golden Dragon — Modern Chinese Kitchen';
    document.title = title ? `${title} | ${base}` : base;
    const desc = description || 'Award‑winning Chinese cuisine in Worcester, MA. Handmade dim sum, wok‑hei stir‑fries, and seasonal specials.';
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', desc);
      document.head.appendChild(meta);
    } else {
      meta.setAttribute('content', desc);
    }
  }, [title, description]);
  return null;
}