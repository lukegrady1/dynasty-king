import { useMemo } from 'react';
import type { Dish, Category } from '../types';

export interface MenuFilterProps {
  items: Dish[];
  query: string;
  setQuery: (s: string) => void;
  category: Category | 'All';
  setCategory: (c: Category | 'All') => void;
  sort: 'name' | 'priceAsc' | 'priceDesc';
  setSort: (s: 'name' | 'priceAsc' | 'priceDesc') => void;
}

export function useFilteredMenu({ items, query, category, sort }: Omit<MenuFilterProps, 'setQuery' | 'setCategory' | 'setSort'>) {
  return useMemo(() => {
    let next = items;
    if (category !== 'All') next = next.filter(i => i.category === category);
    if (query.trim()) {
      const q = query.toLowerCase();
      next = next.filter(i => i.name.toLowerCase().includes(q));
    }
    next = [...next].sort((a, b) => {
      if (sort === 'name') return a.name.localeCompare(b.name);
      if (sort === 'priceAsc') return a.price - b.price;
      return b.price - a.price;
    });
    return next;
  }, [items, query, category, sort]);
}

export default function MenuFilter(props: MenuFilterProps) {
  const { query, setQuery, category, setCategory, sort, setSort, items } = props;
  const categories: (Category | 'All')[] = ['All', 'Appetizers', 'Dim Sum', 'Noodles', 'Rice', 'Entrees', 'Vegetables', 'Desserts', 'Beverages'];
  const count = useMemo(() => items.length, [items.length]);

  return (
    <div className="card" role="region" aria-label="Menu filters">
      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))' }}>
        <div>
          <label htmlFor="search">Search ({count})</label>
          <input id="search" placeholder="try: dumplings, tofu…" value={query} onChange={e => setQuery(e.target.value)} />
        </div>
        <div>
          <label htmlFor="category">Category</label>
          <select id="category" value={category} onChange={e => setCategory(e.target.value as any)}>
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
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
  );
}