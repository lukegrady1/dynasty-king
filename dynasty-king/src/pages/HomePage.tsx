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
  },
  {
    id: "2",
    name: "Ma Po Tofu",
    description: "Spicy dish with Tofu and ground pork in Sichuan peppercorn sauce",
    price: 12,
    category: "Vegetarian",
    spicy: true,
    vegetarian: true,
    featured: true,},
  {
    id: "3",
    name: "Wonton Soup",
    description: "Delicate wontons in savory broth",
    price: 9,
    category: "Soup",
    featured: true,
  },
  {
    id: "4",
    name: "Sweet and Sour Pork",
    description: "Crispy pork with a sweet-tangy sauce",
    price: 13,
    category: "Wok",
    featured: true,
  }
];
import { motion } from "framer-motion";
import "../styles.css";
import { useState, useEffect, useMemo } from "react";
import { Flame, Leaf } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { ScrollArea } from "../components/ui/scroll-area";

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

  // ---------- Types ----------

// ---------- Hero ----------
function Hero() {
  return (
    <section className="relative isolate bg-zinc-900 text-white">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 w-full">
        <div className="flex flex-col items-center text-center">
          <h1 className="font-serif text-5xl leading-none tracking-tight sm:text-6xl md:text-7xl font-light mb-6">
            AUTHENTIC<br />CHINESE CUISINE
          </h1>
          <p className="max-w-xl text-neutral-300 text-base leading-relaxed mb-8">
            Experience the finest flavors of China in an elegant setting.
          </p>
          <div>
            <Link to="/menu">
              <Button className="rounded-sm bg-yellow-600 px-8 py-3 text-base hover:bg-yellow-700 text-black font-medium tracking-wide transition-all duration-300 hover:scale-105">View Menu</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- Data Hook ----------
function useMenuData() {
  const [data, setData] = useState<MenuItem[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      await new Promise((r) => setTimeout(r, 400));
      setData(sampleMenu);
      setLoading(false);
    };
    load();
  }, []);

  return { data, loading } as const;
}

// ---------- Home Page ----------
export default function HomePage() {
  const [data, setData] = useState<MenuItem[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      await new Promise((r) => setTimeout(r, 400));
      setData(sampleMenu);
      setLoading(false);
    };
    load();
  }, []);

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
      .filter((i) =>
        q.length > 0
          ? i.name.toLowerCase().includes(q) || (i.description ?? "").toLowerCase().includes(q)
          : true
      );
  }, [data, filters]);

  return (
    <div className="home-root">
      <Navbar />
      <section className="home-header-section">
        <div className="home-header-container">
          <h1 className="mb-8 font-serif text-5xl text-neutral-900 tracking-wide font-light">Dynasty King</h1>
          <p className="mb-12 text-lg text-neutral-700">Experience the finest flavors of China in an elegant setting.</p>
          <div className="home-content-section">
            <ScrollArea>
              <div className="flex items-center gap-2 justify-center">
                {['All', ...categories].map((c) => (
                  <Button
                    key={c}
                    variant={filters.category === c ? 'default' : 'outline'}
                    className={`rounded-2xl ${filters.category === c ? 'bg-[#940000] hover:bg-[#7a0000]' : ''}`}
                    onClick={() => setFilters((f) => ({ ...f, category: c }))}
                  >
                    {c}
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </div>
          {loading ? (
            <div className="grid grid-cols-1 gap-12 sm:grid-cols-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex flex-col items-center text-center">
                  <div className="relative w-56 h-56 mb-6 overflow-hidden rounded-lg bg-neutral-800 shadow-lg">
                    <div className="w-full h-full bg-neutral-200 animate-pulse" />
                  </div>
                  <div className="max-w-xs">
                    <div className="mb-2 h-6 w-32 mx-auto rounded bg-neutral-200 animate-pulse" />
                    <div className="h-4 w-48 mx-auto rounded bg-neutral-200 animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-12 sm:grid-cols-2">
              {filtered.slice(0, 4).map((item) => (
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
                        <div className="whitespace-nowrap font-medium text-neutral-900">${item.price.toFixed(2)}</div>
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
          )}
        </div>
      </section>
    </div>
  );
}