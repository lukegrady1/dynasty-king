import type { Dish } from '../types';

function formatPrice(cents: number) {
  return new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD' }).format(cents / 100);
}

export default function DishCard({ dish }: { dish: Dish }) {
  // Image removed per request — text‑only presentation
  return (
    <article className="card" aria-labelledby={`dish-${dish.id}-title`}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '.5rem' }}>
        <h3 id={`dish-${dish.id}-title`} style={{ margin: 0 }}>{dish.name}</h3>
        <strong>{formatPrice(dish.priceCents)}</strong>
      </div>
    </article>
  );
}