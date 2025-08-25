// src/pages/MenuPage.tsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { supabase } from "../supabaseClient";
import Metadata from "../seo/MetaData";
import "../styles/index.css";


type Dish = {
  name: string;
  price: number;
  category: string;
  _order?: string;
};

const DEFAULT_TABLES: string[] = [
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

const toTitle = (s: string): string =>
  s.replace(/_/g, " ").replace(/\b\w/g, (m) => m.toUpperCase());

const toTableKey = (categoryTitle: string): string =>
  categoryTitle.toLowerCase().replace(/\s+/g, "_");

const usd = (n: number): string =>
  new Intl.NumberFormat(undefined, { style: "currency", currency: "USD" }).format(n);

export default function MenuPage(): JSX.Element {
  const [items, setItems] = useState<Dish[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [errors, setErrors] = useState<string[]>([]);
  const [empties, setEmpties] = useState<string[]>([]);
  const [query, setQuery] = useState<string>("");
  const [sort, setSort] = useState<"menuOrder" | "name" | "priceAsc" | "priceDesc">("menuOrder");

  const topRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    let mounted = true;

    async function fetchTable(table: string): Promise<Dish[]> {
      const { data, error } = await supabase
        .from(table)
        .select("name, price, number")
        .order("number", { ascending: true, nullsFirst: true });

      if (error) throw new Error(`[${table}] ${error.message}`);

      const category = toTitle(table);
      return (data ?? []).map((r: any): Dish => ({
        name: String(r.name ?? "").trim(),
        price:
          typeof r.price === "number"
            ? (r.price as number)
            : parseFloat(String(r.price ?? "0")),
        category,
        _order: r.number ? String(r.number) : undefined,
      }));
    }

    async function load(): Promise<void> {
      setLoading(true);
      setErrors([]);
      setEmpties([]);

      const envTables = (import.meta as any)?.env?.VITE_MENU_TABLES as string | undefined;
      const tables: string[] = envTables
        ? envTables.split(",").map((t: string) => t.trim()).filter(Boolean)
        : DEFAULT_TABLES;

      const next: Dish[] = [];
      const errs: string[] = [];
      const zeroes: string[] = [];

      await Promise.all(
        tables.map(async (t: string) => {
          try {
            const rows = await fetchTable(t);
            if (rows.length === 0) zeroes.push(t);
            next.push(...rows);
          } catch (e: unknown) {
            errs.push(e instanceof Error ? e.message : String(e));
          }
        })
      );

      if (!mounted) return;
      setItems(next);
      setErrors(errs);
      setEmpties(zeroes);
      setLoading(false);
    }

    void load();
    return () => {
      mounted = false;
    };
  }, []);

  const filtered: Dish[] = useMemo(() => {
    let next = items;
    const q = query.trim().toLowerCase();
    if (q) {
      next = next.filter((i: Dish) =>
        (i.name + " " + i.category).toLowerCase().includes(q)
      );
    }

    next = [...next].sort((a: Dish, b: Dish): number => {
      if (sort === "menuOrder") {
        const ao = a._order ?? "";
        const bo = b._order ?? "";
        if (ao !== bo) return ao.localeCompare(bo, undefined, { numeric: true });

        const orderList: string[] =
          (import.meta as any)?.env?.VITE_MENU_TABLES
            ?.split(",")
            .map((t: string) => t.trim())
            .filter(Boolean) ?? DEFAULT_TABLES;

        const aIdx = orderList.indexOf(toTableKey(a.category));
        const bIdx = orderList.indexOf(toTableKey(b.category));
        return (aIdx === -1 ? 999 : aIdx) - (bIdx === -1 ? 999 : bIdx);
      }
      if (sort === "name") return a.name.localeCompare(b.name);
      if (sort === "priceAsc") return a.price - b.price;
      return b.price - a.price;
    });

    return next;
  }, [items, query, sort]);

  const byCategory: [string, Dish[]][] = useMemo(() => {
    const m = new Map<string, Dish[]>();
    for (const d of filtered) {
      if (!m.has(d.category)) m.set(d.category, []);
      m.get(d.category)!.push(d);
    }

    const orderList: string[] =
      (import.meta as any)?.env?.VITE_MENU_TABLES
        ?.split(",")
        .map((t: string) => t.trim())
        .filter(Boolean) ?? DEFAULT_TABLES;

    return Array.from(m.entries()).sort(
      ([a], [b]) =>
        (orderList.indexOf(toTableKey(a)) === -1 ? 999 : orderList.indexOf(toTableKey(a))) -
        (orderList.indexOf(toTableKey(b)) === -1 ? 999 : orderList.indexOf(toTableKey(b)))
    );
  }, [filtered]);

  const tabs = useMemo(() => {
    const orderList: string[] =
      (import.meta as any)?.env?.VITE_MENU_TABLES
        ?.split(",")
        .map((t: string) => t.trim())
        .filter(Boolean) ?? DEFAULT_TABLES;

    const presentKeys = new Set<string>(
      byCategory.map(([title]) => toTableKey(title))
    );

    return orderList
      .filter((key) => presentKeys.has(key))
      .map((key) => ({
        key,
        title: toTitle(key),
        href: `#cat-${key}`,
      }));
  }, [byCategory]);

  const handleTabClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string): void => {
    e.preventDefault();
    const id = href.replace(/^#/, "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main
      id="main-content"
      className="container"
      style={{ maxWidth: 900, padding: "1.25rem" }}
      ref={topRef}
    >
      <Metadata title="Menu" />
      <h1 className="section-title" style={{ marginTop: "1.2rem" }}>Menu</h1>

      {/* Controls + Tabs */}
      <div className="card" role="region" aria-label="Menu controls and sections">
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
            <select
              id="sort"
              value={sort}
              onChange={(e) =>
                setSort(e.target.value as "menuOrder" | "name" | "priceAsc" | "priceDesc")
              }
            >
              <option value="menuOrder">Item: Name</option>
              <option value="priceAsc">Price: Low → High</option>
              <option value="priceDesc">Price: High → Low</option>
            </select>
          </div>
        </div>

        {/* Tabs */}
        {!loading && tabs.length > 0 && (
          <>
            <hr style={{ border: "none", borderTop: "1px solid var(--border)", margin: "0.75rem 0" }} />
            <div className="tabs-container" role="tablist" aria-label="Menu sections">
              <a
                href="#top"
                onClick={(e) => {
                  e.preventDefault();
                  topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                role="tab"
                className="tab-link"
              >
                All
              </a>
              {tabs.map((t) => (
                <a
                  key={t.key}
                  href={t.href}
                  role="tab"
                  className="tab-link"
                  onClick={(e) => handleTabClick(e, t.href)}
                >
                  {t.title}
                </a>
              ))}
            </div>
          </>
        )}
      </div>

      {loading && <p style={{ color: "var(--muted)" }}>Loading menu…</p>}

      {!loading && byCategory.map(([category, dishes]) => {
        const id = `cat-${toTableKey(category)}`;
        return (
          <section key={category} id={id} style={{ marginTop: "1.5rem", scrollMarginTop: "5.5rem" }}>
            <h2 className="section-title" style={{ marginBottom: ".25rem" }}>{category}</h2>
            <ul className="card" style={{ listStyle: "none", padding: 0 }}>
              {dishes.map((d, idx) => (
                <li
                  key={`${category}-${idx}-${d.name}`}
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
        );
      })}
    </main>
  );
}
