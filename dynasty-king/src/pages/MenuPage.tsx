import { useEffect, useMemo, useState } from 'react';
import Metadata from '../seo/MetaData';
import type { Dish } from '../types';
import { supabase } from '../supabaseClient';

function formatPrice(cents: number) {
  return new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD' }).format(cents / 100);
}

export default function MenuPage() {
  const [items, setItems] = useState<Dish[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<'name' | 'priceAsc' | 'priceDesc'>('name');

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      setError(null);
      // Adjust table/column names to match your Supabase schema
      // expected columns: id (uuid), name (text), price_cents (int)
      const { data, error } = await supabase
        .from('menu')
        .select('id, name, price_cents')
        .order('name', { ascending: true });
      if (!mounted) return;
      if (error) {
        setError(error.message);
      } else {
        const mapped: Dish[] = (data ?? []).map((r: any) => ({
          id: String(r.id),
          name: r.name,
          priceCents: Number(r.price_cents),
        }));
        setItems(mapped);
      }
      setLoading(false);
    }
    load();
    return () => { mounted = false; };
  }, []);

  const filtered = useMemo(() => {
    let next = items;
    if (query.trim()) {
      const q = query.toLowerCase();
      next = next.filter(i => i.name.toLowerCase().includes(q));
    }
    next = [...next].sort((a, b) => {
      if (sort === 'name') return a.name.localeCompare(b.name);
      if (sort === 'priceAsc') return a.priceCents - b.priceCents;
      return b.priceCents - a.priceCents;
    });
    return next;
  }, [items, query, sort]);

  return (
    <main id="main-content" className="container">
      <Metadata title="Menu" />
      <h1 className="section-title" style={{ marginTop: '1.2rem' }}>Menu</h1>

      <div className="card" role="region" aria-label="Menu controls">
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
          <div>
            <label htmlFor="search">Search ({items.length})</label>
            <input id="search" placeholder="try: dumplings, tofu…" value={query} onChange={e => setQuery(e.target.value)} />
          </div>
          <div>
            <label htmlFor="sort">Sort</label>
            <select id="sort" value={sort} onChange={e => setSort(e.target.value as any)}>
              <option value="name">Name</option>
              <option value="priceAsc">Price: Low → High</option>
              <option value="priceDesc">Price: High → Low</option>
            </select>
          </div>
        </div>
      </div>

      {loading && <p style={{ color: 'var(--muted)' }}>Loading menu…</p>}
      {error && <p role="alert">Error: {error}</p>}

      {!loading && !error && (
        <ul className="card" style={{ listStyle: 'none', padding: 0 }}>
          {filtered.map(item => (
            <li key={item.id} style={{
              display: 'grid',
              gridTemplateColumns: '1fr auto',
              alignItems: 'baseline',
              padding: '.75rem 0',
              borderBottom: '1px solid #ffffff14'
            }}>
              <span style={{ fontWeight: 600 }}>{item.name}</span>
              <span>{formatPrice(item.priceCents)}</span>
            </li>
          ))}
          {filtered.length === 0 && (
            <li style={{ color: 'var(--muted)', padding: '.75rem 0' }}>No dishes match your search.</li>
          )}
        </ul>
      )}
    </main>
  );
}