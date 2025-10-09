import { useEffect } from 'react';

interface MetaProps { title?: string; description?: string; }
export default function Metadata({ title, description }: MetaProps) {
  useEffect(() => {
    const base = 'Dynasty King';
    document.title = title ? `${title} | ${base}` : base;
    const desc = description || 'Dynasty King in Tallman, NY - Authentic Chinese cuisine featuring handmade dim sum, wok-fired stir-fries, and traditional dishes. Call (845) 357-2252 for takeout and delivery.';
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      meta.setAttribute('content', desc);
      document.head.appendChild(meta);
    } else {
      meta.setAttribute('content', desc);
    }
  }, [title, description]);
  return null;
}