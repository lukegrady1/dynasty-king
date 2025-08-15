import { motion } from "framer-motion";
import "../styles.css";
import { useState, useEffect, useMemo } from "react";
import { Flame, Leaf, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Switch } from "../components/ui/switch";
import { ScrollArea } from "../components/ui/scroll-area";

// ---------- Types ----------
export type MenuItem = {
  id: string;
  name: string;
  description?: string;
  price: number;
  category: string;
  spicy?: boolean;
  vegetarian?: boolean;
  featured?: boolean;
  photoUrl?: string;
};

// ---------- Utility ----------
const formatCurrency = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);

// ---------- Sample Data (fallback when no API) ----------
const sampleMenu: MenuItem[] = [
  {
    id: "1",
    name: "Kung Pao Chicken",
    description: "Diced chicken with peanuts, chili peppers, and vegetable.",
    price: 14.5,
    category: "Wok",
    spicy: true,
    featured: true,
    photoUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "2",
    name: "Ma Po Tofu",
    description: "Spicy dish with Tofu and ground pork in Sichuan peppercorn sauce",
    price: 12,
    category: "Vegetarian",
    spicy: true,
    vegetarian: true,
    featured: true,
    photoUrl: "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "3",
    name: "Wonton Soup",
    description: "Delicate wontons in savory broth",
    price: 9,
    category: "Soup",
    featured: true,
    photoUrl: "https://images.unsplash.com/photo-1604909052743-88aa8fba64c9?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "4",
    name: "Sweet and Sour Pork",
    description: "Crispy pork with a sweet-tangy sauce",
    price: 13,
    category: "Wok",
    featured: true,
    photoUrl: "https://images.unsplash.com/photo-1606787366850-de6330128bfc?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "5",
    name: "Turnip Cake",
    description: "Pan-fried daikon with dried shrimp.",
    price: 8,
    category: "Dim Sum",
    vegetarian: true,
    photoUrl: "https://images.unsplash.com/photo-1612198181464-54f3192d9e5a?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "6",
    name: "Dan Dan Noodles",
    description: "Springy noodles, sesame, chili oil, scallion.",
    price: 11.5,
    category: "Noodles",
    spicy: true,
    photoUrl: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?q=80&w=1200&auto=format&fit=crop",
  },
];

// ---------- Logo (inline SVG) ----------
function DynastyLogo({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      fill="currentColor"
      aria-label="Dynasty King dragon-crown logo"
    >
      <path d="M32 6c8 0 14 4 18 10-5-1-8 1-10 4 3 0 7 1 9 5-5 0-8 2-10 4 2 1 4 3 4 6 0 6-5 11-11 11S21 35 21 29c0-3 1-5 4-6-2-2-5-4-10-4 2-4 7-8 17-13ZM17 50c3 5 9 8 15 8s12-3 15-8H17Z" />
    </svg>
  );
}

// ---------- Menu Navbar ----------
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

// ---------- Filters Bar ----------
function FiltersBar({
  categories,
  active,
  onChange,
}: {
  categories: string[];
  active: {
    category: string;
    vegOnly: boolean;
    spicyOnly: boolean;
    query: string;
  };
  onChange: (next: Partial<typeof active>) => void;
}) {
  return (
    <div className="sticky top-16 z-40 border-b border-neutral-200/70 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto flex max-w-6xl items-center justify-center gap-3 px-4 py-3 sm:px-6">
        <div className="relative flex-1 max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
          <Input
            value={active.query}
            onChange={(e) => onChange({ query: e.target.value })}
            placeholder="Search dishes..."
            className="h-10 rounded-2xl pl-10"
          />
        </div>
        <ScrollArea className="hidden sm:block">
          <div className="flex items-center gap-2">
            {["All", ...categories].map((c) => (
              <Button
                key={c}
                variant={active.category === c ? "default" : "outline"}
                className={`rounded-2xl ${active.category === c ? "bg-[#940000] hover:bg-[#7a0000]" : ""}`}
                onClick={() => onChange({ category: c })}
              >
                {c}
              </Button>
            ))}
          </div>
        </ScrollArea>
        <div className="hidden items-center gap-4 sm:flex">
          <div className="flex items-center gap-2">
            <Switch
              id="veg"
              checked={active.vegOnly}
              onCheckedChange={(checked) => onChange({ vegOnly: !!checked })}
            />
            <Label htmlFor="veg" className="text-sm">Vegetarian</Label>
          </div>
          <div className="flex items-center gap-2">
            <Switch
              id="spicy"
              checked={active.spicyOnly}
              onCheckedChange={(checked) => onChange({ spicyOnly: !!checked })}
            />
            <Label htmlFor="spicy" className="text-sm">Spicy</Label>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------- Menu Grid ----------
function MenuGrid({ items }: { items: MenuItem[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 justify-items-center max-w-5xl mx-auto">
      {items.map((item) => (
        <motion.div key={item.id} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <Card className="overflow-hidden rounded-2xl">
            {item.photoUrl ? (
              <img
                src={item.photoUrl}
                alt={item.name}
                className="aspect-[4/3] w-full object-cover"
                loading="lazy"
              />
            ) : (
              <div className="aspect-[4/3] w-full bg-neutral-100" />
            )}
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-serif text-xl text-neutral-900">{item.name}</h3>
                  <p className="mt-1 text-sm text-neutral-600">{item.description}</p>
                </div>
                <div className="whitespace-nowrap font-medium text-neutral-900">{formatCurrency(item.price)}</div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex flex-wrap gap-2">
                {item.spicy && (
                  <Badge variant="secondary" className="gap-1"><Flame className="h-3 w-3" /> Spicy</Badge>
                )}
                {item.vegetarian && (
                  <Badge variant="secondary" className="gap-1"><Leaf className="h-3 w-3" /> Veg</Badge>
                )}
                <Badge variant="outline" className="capitalize">{item.category}</Badge>
              </div>
            </CardContent>
            <CardFooter className="justify-end">
              <Button variant="outline" className="rounded-2xl">Details</Button>
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}

// ---------- Data Hook ----------
function useMenuData() {
  const [data, setData] = useState<MenuItem[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const api = (import.meta as any)?.env?.VITE_MENU_API as string | undefined;
      try {
        if (api) {
          const res = await fetch(api);
          if (!res.ok) throw new Error(`Menu fetch failed: ${res.status}`);
          const json = await res.json();
          setData(json.items as MenuItem[]);
        } else {
          // No API configured — use sample data
          await new Promise((r) => setTimeout(r, 400));
          setData(sampleMenu);
        }
      } catch (e: any) {
        setError(e?.message || "Unknown error");
        setData(sampleMenu); // fallback so the UI still works
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return { data, loading, error } as const;
}

// ---------- Menu Page ----------
export default function MenuPage() {
  const { data, loading, error } = useMenuData();

  const [filters, setFilters] = useState({
    category: "All",
    vegOnly: false,
    spicyOnly: false,
    query: "",
  });

  const categories = useMemo(() => {
    const set = new Set<string>();
    (data ?? []).forEach((i) => set.add(i.category));
    return Array.from(set).sort();
  }, [data]);

  const filtered = useMemo(() => {
    const q = filters.query.trim().toLowerCase();
    return (data ?? [])
      .filter((i) => (filters.category === "All" ? true : i.category === filters.category))
      .filter((i) => (filters.vegOnly ? i.vegetarian : true))
      .filter((i) => (filters.spicyOnly ? i.spicy : true))
      .filter((i) => (q ? `${i.name} ${i.description ?? ""}`.toLowerCase().includes(q) : true));
  }, [data, filters]);

  return (
  <div className="menu-root">
      <Navbar />
      
      {/* Menu Header */}
      <section className="menu-header-section">
        <div className="menu-header-container">
          <h1 className="font-serif text-4xl leading-tight text-neutral-900 sm:text-5xl md:text-6xl mb-4">
            Our Complete Menu
          </h1>
          <p className="max-w-2xl mx-auto text-balance text-neutral-600 text-center">
            Discover all our authentic Chinese dishes, crafted with traditional recipes and modern techniques.
          </p>
        </div>
      </section>

      {/* Menu Section */}
  <section className="menu-content-section">
        <FiltersBar
          categories={categories}
          active={filters}
          onChange={(next) => setFilters((prev) => ({ ...prev, ...next }))}
        />

        <div className="mt-6">
          {error && (
            <div className="mb-4 rounded-xl border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900">
              Using sample data (API error: {error}). Configure <code>VITE_MENU_API</code> to load live data.
            </div>
          )}
          {loading ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 justify-items-center max-w-5xl mx-auto">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="animate-pulse rounded-2xl border border-neutral-200">
                  <div className="aspect-[4/3] w-full bg-neutral-200" />
                  <div className="p-4">
                    <div className="mb-2 h-5 w-2/3 rounded bg-neutral-200" />
                    <div className="h-4 w-full rounded bg-neutral-200" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <MenuGrid items={filtered} />
          )}
        </div>
      </section>
    </div>
  );
}