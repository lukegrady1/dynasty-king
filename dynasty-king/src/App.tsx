import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Crown, Flame, Leaf, Menu as MenuIcon, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";

/**
 * DYNASTY KING — single-file React starter using shadcn/ui
 * - Mobile-first, responsive
 * - Pulls menu items from an API endpoint (recommended: serverless proxy to Airtable)
 * - Falls back to sample data if API not configured
 *
 * To wire Airtable quickly, expose a GET endpoint via /api/menu (Vercel/Netlify)
 * and set VITE_MENU_API to that URL. Example serverless code is provided in the chat.
 */

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
    description: "Diced chicken, peanuts, chilies, Sichuan pepper.",
    price: 14.5,
    category: "Wok",
    spicy: true,
    photoUrl:
      "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "2",
    name: "Ma Po Tofu",
    description: "Soft tofu, minced pork, chili-bean paste.",
    price: 12,
    category: "Vegetarian",
    spicy: true,
    vegetarian: true,
    photoUrl:
      "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "3",
    name: "Wonton Soup",
    description: "Hand-wrapped wontons in savory broth.",
    price: 9,
    category: "Soup",
    photoUrl:
      "https://images.unsplash.com/photo-1604909052743-88aa8fba64c9?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "4",
    name: "Turnip Cake",
    description: "Pan-fried daikon with dried shrimp.",
    price: 8,
    category: "Dim Sum",
    vegetarian: true,
    photoUrl:
      "https://images.unsplash.com/photo-1612198181464-54f3192d9e5a?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "5",
    name: "Sweet & Sour Pork",
    description: "Crispy pork, pineapple, peppers.",
    price: 13,
    category: "Wok",
    photoUrl:
      "https://images.unsplash.com/photo-1606787366850-de6330128bfc?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "6",
    name: "Dan Dan Noodles",
    description: "Springy noodles, sesame, chili oil, scallion.",
    price: 11.5,
    category: "Noodles",
    spicy: true,
    photoUrl:
      "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?q=80&w=1200&auto=format&fit=crop",
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

// ---------- Navbar ----------
function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-200/60 bg-neutral-50/80 backdrop-blur supports-[backdrop-filter]:bg-neutral-50/60">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#" className="flex items-center gap-2 font-serif text-xl tracking-wide">
          <span className="text-[#940000]"> <DynastyLogo className="h-7 w-7" /> </span>
          <span className="text-neutral-900">Dynasty King</span>
        </a>

        <nav className="hidden gap-6 sm:flex">
          <a href="#menu" className="text-sm text-neutral-700 hover:text-neutral-900">Menu</a>
          <a href="#about" className="text-sm text-neutral-700 hover:text-neutral-900">About</a>
          <a href="#contact" className="text-sm text-neutral-700 hover:text-neutral-900">Contact</a>
        </nav>

        <div className="hidden sm:block">
          <Button className="rounded-2xl bg-[#940000] px-5 hover:bg-[#7a0000]">Reserve</Button>
        </div>

        <div className="sm:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <MenuIcon className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <DynastyLogo className="h-6 w-6 text-[#940000]" /> Dynasty King
                </SheetTitle>
              </SheetHeader>
              <nav className="mt-6 grid gap-3">
                <a onClick={() => setOpen(false)} href="#menu" className="rounded-md px-2 py-2 hover:bg-neutral-100">Menu</a>
                <a onClick={() => setOpen(false)} href="#about" className="rounded-md px-2 py-2 hover:bg-neutral-100">About</a>
                <a onClick={() => setOpen(false)} href="#contact" className="rounded-md px-2 py-2 hover:bg-neutral-100">Contact</a>
                <Button className="mt-2 rounded-2xl bg-[#940000] hover:bg-[#7a0000]">Reserve</Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

// ---------- Hero ----------
function Hero() {
  return (
    <section className="relative isolate">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-neutral-100 via-neutral-50 to-white" />
      <div className="mx-auto max-w-6xl px-4 pb-12 pt-12 sm:px-6 sm:pt-16">
        <div className="flex flex-col items-center text-center">
          <Badge variant="secondary" className="mb-4 gap-2 rounded-2xl bg-neutral-100 px-3 py-1 text-neutral-700">
            <Crown className="h-4 w-4 text-[#940000]" /> Authentic Chinese Cuisine
          </Badge>
          <h1 className="font-serif text-4xl leading-tight text-neutral-900 sm:text-5xl md:text-6xl">
            Experience the flavors of China
          </h1>
          <p className="mt-4 max-w-2xl text-balance text-neutral-600">
            Classic recipes, modern presentation. Crafted with seasonal ingredients and centuries-old techniques.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a href="#menu">
              <Button className="rounded-2xl bg-[#940000] px-6 py-6 text-base hover:bg-[#7a0000]">View Menu</Button>
            </a>
            <Button variant="outline" className="rounded-2xl px-6 py-6 text-base">Reservations</Button>
          </div>
        </div>
      </div>
    </section>
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
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3 sm:px-6">
        <div className="relative flex-1">
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
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
          /** Expected shape: { items: MenuItem[] } */
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

// ---------- Page ----------
export default function App() {
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
    <div className="min-h-dvh bg-white text-neutral-900">
      <Navbar />
      <Hero />

      {/* Featured Section */}
      <section className="mx-auto max-w-6xl px-4 pb-8 sm:px-6">
        <h2 className="mb-4 font-serif text-2xl sm:text-3xl">Featured Dishes</h2>
        <Separator className="mb-6" />
        {loading ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
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
          <MenuGrid items={(data ?? []).filter((i) => i.featured)} />
        )}
      </section>

      {/* Menu Section */}
      <section id="menu" className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-serif text-2xl sm:text-3xl">Menu</h2>
        </div>

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
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
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

      {/* About & Contact */}
      <section id="about" className="bg-neutral-50">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <h2 className="font-serif text-2xl sm:text-3xl">Our Story</h2>
          <p className="mt-3 max-w-3xl text-neutral-700">
            Dynasty King blends regional Chinese traditions with modern techniques. Our kitchen honors
            classic flavors while embracing seasonal New England produce.
          </p>
        </div>
      </section>

      <footer id="contact" className="border-t border-neutral-200">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 py-10 sm:grid-cols-3 sm:px-6">
          <div>
            <div className="flex items-center gap-2">
              <DynastyLogo className="h-6 w-6 text-[#940000]" />
              <span className="font-serif text-lg">Dynasty King</span>
            </div>
            <p className="mt-2 text-sm text-neutral-600">123 Main St, Worcester, MA</p>
          </div>
          <div>
            <h3 className="mb-3 font-medium">Hours</h3>
            <p className="text-sm text-neutral-600">Mon–Thu 11a–9p • Fri–Sat 11a–10p • Sun 12p–9p</p>
          </div>
          <div>
            <h3 className="mb-3 font-medium">Contact</h3>
            <a className="block text-sm text-neutral-700" href="tel:+15085551234">(508) 555‑1234</a>
            <a className="block text-sm text-neutral-700" href="mailto:hello@dynastyking.com">hello@dynastyking.com</a>
          </div>
        </div>
        <div className="border-t border-neutral-200 py-4 text-center text-xs text-neutral-500">© {new Date().getFullYear()} Dynasty King</div>
      </footer>
    </div>
  );
}
