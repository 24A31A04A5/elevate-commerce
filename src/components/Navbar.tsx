import { Link } from "@tanstack/react-router";
import { Heart, Search, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import { useShop } from "@/contexts/ShopProvider";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar() {
  const { cartCount, setCartOpen, wishlist } = useShop();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 glass">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-10">
          <Link to="/" className="group flex items-center gap-2">
            <div className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-primary to-primary-hover text-primary-foreground font-bold text-sm shadow-sm">
              S
            </div>
            <span className="text-lg font-semibold tracking-tight">ShopFlow</span>
          </Link>
          <nav className="hidden md:flex items-center gap-7 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground transition-colors">Catalog</Link>
            <a href="#features" className="hover:text-foreground transition-colors">Features</a>
            <a href="#testimonials" className="hover:text-foreground transition-colors">Stories</a>
            <a href="#faq" className="hover:text-foreground transition-colors">FAQ</a>
          </nav>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            aria-label="Search"
            onClick={() => document.getElementById("catalog-search")?.focus()}
            className="hidden sm:inline-flex h-9 items-center gap-2 rounded-full border border-border bg-surface px-3 text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            <Search className="h-3.5 w-3.5" />
            <span>Search products</span>
            <kbd className="ml-2 hidden md:inline-flex h-5 items-center rounded border border-border bg-background px-1.5 font-mono text-[10px] text-muted-foreground">⌘K</kbd>
          </button>

          <ThemeToggle />

          <button
            aria-label="Wishlist"
            onClick={() => document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth" })}
            className="relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface text-muted-foreground transition-all hover:text-foreground"
          >
            <Heart className="h-4 w-4" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 grid h-4 min-w-4 place-items-center rounded-full bg-foreground px-1 text-[10px] font-semibold text-background">
                {wishlist.length}
              </span>
            )}
          </button>

          <button
            aria-label="Cart"
            onClick={() => setCartOpen(true)}
            className="relative inline-flex h-9 items-center gap-2 rounded-full bg-foreground px-3 text-sm font-medium text-background transition-transform hover:scale-[1.03] active:scale-95"
          >
            <ShoppingBag className="h-4 w-4" />
            <span className="hidden sm:inline">Cart</span>
            <motion.span
              key={cartCount}
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="grid h-5 min-w-5 place-items-center rounded-full bg-background/20 px-1.5 text-[11px] font-semibold"
            >
              {cartCount}
            </motion.span>
          </button>
        </div>
      </div>
    </header>
  );
}
