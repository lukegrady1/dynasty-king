// src/pages/MenuPage.tsx
import { useEffect, useMemo, useState } from "react";
import { supabase } from "../supabaseClient";
import Metadata from "../seo/MetaData";
import "../styles/index.css";

type Dish = {
  name: string;       // required
  price: number;      // dollars (numeric in Supabase)
  category: string;   // derived from table name
  _order?: string;    // hidden: from `number` column, used for ordering
};

// Configure your category tables here or via env: VITE_MENU_TABLES=appetizers,entrees,dim_sum,...
const DEFAULT_TABLES = [
  "appetizers",
  "soups",
  "fried_rice",
  "lo_mein",
  "chow_fun_mei_fun",
  "chow_mein",
  "chop_suey",
  "egg_foo_young",
  "pork",
  "poultry",
  "beef",
  "seafood",
  "sweet_and_sour",
  "vegetarian_dishes",
  "house_combo",
  "chefs_specialties",
  "sides",
];

const toTitle = (s: string) =>
  s.replace(/_/g, " ").replace(/\b\w/g, (m) => m.toUpperCase());

const usd = (n: number) =>
  new Intl.NumberFormat(undefined, { style: "currency", currency: "USD" }).format(n);

export default function MenuPage() {
  const [items, setItems] = useState<Dish[]>([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState<string[]>([]);
  const [empties, setEmpties] = useState<string[]>([]);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<"menuOrder" | "name" | "priceAsc" | "priceDesc">("menuOrder");

  useEffect(() => {
    let mounted = true;

    async function fetchTable(table: string): Promise<Dish[]> {
      // Expect columns: name (text), price (numeric/float), number (text a-z)
      const { data, error } = await supabase
        .from(table)
        .select("name, price, number")
        .order("number", { ascending: true, nullsFirst: true }); // server-side order by `number` if present

      if (error) throw new Error(`[${table}] ${error.message}`);

      const category = toTitle(table);
      return (data ?? []).map((r: any) => ({
        name: String(r.name ?? "").trim(),
        price: typeof r.price === "number" ? r.price : parseFloat(String(r.price ?? "0")),
        category,
        _order: r.number ? String(r.number) : undefined, // keep for sorting only; not rendered
      }));
    }

    async function load() {
      setLoading(true);
      setErrors([]);
      setEmpties([]);

      const envTables = (import.meta as any)?.env?.VITE_MENU_TABLES as string | undefined;
      const tables = envTables
        ? envTables.split(",").map((t) => t.trim()).filter(Boolean)
        : DEFAULT_TABLES;

      const next: Dish[] = [];
      const errs: string[] = [];
      const zeroes: string[] = [];

      await Promise.all(
        tables.map(async (t) => {
          try {
            const rows = await fetchTable(t);
            if (rows.length === 0) zeroes.push(t);
            next.push(...rows);
          } catch (e: any) {
            errs.push(e?.message ?? String(e));
          }
        })
      );

      if (!mounted) return;
      setItems(next);
      setErrors(errs);
      setEmpties(zeroes);
      setLoading(false);
    }

    load();
    return () => {
      mounted = false;
    };
  }, []);

  const filtered = useMemo(() => {
    let next = items;
    const q = query.trim().toLowerCase();
    if (q) next = next.filter((i) => (i.name + " " + i.category).toLowerCase().includes(q));

    // client-side sort
    next = [...next].sort((a, b) => {
      if (sort === "menuOrder") {
        // primary: `number` (lexicographic), secondary: category, tertiary: name
        const ao = a._order ?? "";
        const bo = b._order ?? "";
        if (ao !== bo) return ao.localeCompare(bo, undefined, { numeric: true, sensitivity: "base" });
        if (a.category !== b.category) return a.category.localeCompare(b.category);
        return a.name.localeCompare(b.name);
      }
      if (sort === "name") return a.name.localeCompare(b.name);
      if (sort === "priceAsc") return a.price - b.price;
      // priceDesc
      return b.price - a.price;
    });

    return next;
  }, [items, query, sort]);

  // Group into sections by category for rendering
  const byCategory = useMemo(() => {
    const m = new Map<string, Dish[]>();
    for (const d of filtered) {
      if (!m.has(d.category)) m.set(d.category, []);
      m.get(d.category)!.push(d);
    }
    return Array.from(m.entries()).sort(([a], [b]) => a.localeCompare(b));
  }, [filtered]);

  return (
    <main id="main-content" className="container" style={{ maxWidth: 900, padding: "1.25rem" }}>
      <Metadata title="Menu" />
      <h1 className="section-title" style={{ marginTop: "1.2rem" }}>Menu</h1>

      {/* Controls */}
      <div className="card" role="region" aria-label="Menu controls">
        <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
          <div>
            <label htmlFor="search">Search</label>
            <input
              id="search"
              placeholder="try: dumplings, noodles…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="sort">Sort</label>
            <select id="sort" value={sort} onChange={(e) => setSort(e.target.value as any)}>
              <option value="menuOrder">Item: Name</option>
              <option value="priceAsc">Price: Low → High</option>
              <option value="priceDesc">Price: High → Low</option>
            </select>
          </div>
        </div>
      </div>

      {loading && <p style={{ color: "var(--muted)" }}>Loading menu…</p>}

      {!loading && (errors.length > 0 || empties.length > 0) && (
        <div
          className="card"
          style={{ marginTop: "1rem", background: "#fefce8", borderColor: "#facc15" }}
        >
          {errors.length > 0 && (
            <>
              <strong>Errors:</strong>
              <ul style={{ marginTop: ".5rem" }}>
                {errors.map((e, i) => (
                  <li key={i} style={{ color: "#713f12" }}>{e}</li>
                ))}
              </ul>
            </>
          )}
          {empties.length > 0 && (
            <p style={{ marginTop: ".5rem", color: "#713f12" }}>
              These tables returned 0 rows: <code>{empties.join(", ")}</code>.
              If they have data, check Row Level Security (public SELECT) and column names.
            </p>
          )}
        </div>
      )}

      {!loading && byCategory.length === 0 && (
        <p style={{ color: "var(--muted)" }}>No dishes found.</p>
      )}

      {/* Text-only menu, grouped by category. `number`/_order is NOT shown. */}
      {!loading &&
        byCategory.map(([category, dishes]) => (
          <section key={category} style={{ marginTop: "1.5rem" }}>
            <h2 className="section-title" style={{ marginBottom: ".25rem" }}>{category}</h2>
            <ul className="card" style={{ listStyle: "none", padding: 0 }}>
              {dishes.map((d, idx) => (
                <li
                  key={category + "-" + idx + "-" + d.name}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr auto",
                    alignItems: "baseline",
                    padding: ".7rem 0",
                    borderBottom: "1px solid #ffffff14",
                  }}
                >
                  <span style={{ fontWeight: 600 }}>{d.name}</span>
                  <span>{usd(d.price)}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
    </main>
  );
}
