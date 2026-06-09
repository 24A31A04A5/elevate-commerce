import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { PRODUCTS, type Product } from "@/lib/products";

type CartItem = { product: Product; qty: number };

type Theme = "light" | "dark";

type ShopState = {
  // theme
  theme: Theme;
  toggleTheme: () => void;
  // cart
  cart: CartItem[];
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  addToCart: (p: Product, qty?: number) => void;
  removeFromCart: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  cartCount: number;
  subtotal: number;
  // wishlist
  wishlist: string[];
  toggleWishlist: (id: string) => void;
  isWished: (id: string) => boolean;
  // recently viewed
  recent: string[];
  trackView: (id: string) => void;
};

const ShopCtx = createContext<ShopState | null>(null);

const KEY = "shopflow:v1";

function loadStored() {
  if (typeof window === "undefined") return null;
  try {
    return JSON.parse(localStorage.getItem(KEY) || "null");
  } catch {
    return null;
  }
}

export function ShopProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [recent, setRecent] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = loadStored();
    if (stored) {
      setTheme(stored.theme ?? "light");
      setWishlist(stored.wishlist ?? []);
      setRecent(stored.recent ?? []);
      if (Array.isArray(stored.cart)) {
        const restored = stored.cart
          .map((c: { id: string; qty: number }) => {
            const product = PRODUCTS.find((p) => p.id === c.id);
            return product ? { product, qty: c.qty } : null;
          })
          .filter(Boolean) as CartItem[];
        setCart(restored);
      }
    } else if (window.matchMedia?.("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem(
      KEY,
      JSON.stringify({
        theme,
        wishlist,
        recent,
        cart: cart.map((c) => ({ id: c.product.id, qty: c.qty })),
      }),
    );
  }, [theme, wishlist, recent, cart, hydrated]);

  const toggleTheme = useCallback(
    () => setTheme((t) => (t === "light" ? "dark" : "light")),
    [],
  );

  const addToCart = useCallback((p: Product, qty = 1) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.product.id === p.id);
      if (existing) {
        return prev.map((c) =>
          c.product.id === p.id ? { ...c, qty: c.qty + qty } : c,
        );
      }
      return [...prev, { product: p, qty }];
    });
  }, []);

  const removeFromCart = useCallback(
    (id: string) => setCart((prev) => prev.filter((c) => c.product.id !== id)),
    [],
  );

  const updateQty = useCallback((id: string, qty: number) => {
    setCart((prev) =>
      prev
        .map((c) => (c.product.id === id ? { ...c, qty: Math.max(0, qty) } : c))
        .filter((c) => c.qty > 0),
    );
  }, []);

  const toggleWishlist = useCallback(
    (id: string) =>
      setWishlist((prev) =>
        prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
      ),
    [],
  );

  const isWished = useCallback(
    (id: string) => wishlist.includes(id),
    [wishlist],
  );

  const trackView = useCallback(
    (id: string) =>
      setRecent((prev) => [id, ...prev.filter((x) => x !== id)].slice(0, 6)),
    [],
  );

  const cartCount = cart.reduce((s, c) => s + c.qty, 0);
  const subtotal = cart.reduce((s, c) => s + c.qty * c.product.price, 0);

  const value = useMemo(
    () => ({
      theme,
      toggleTheme,
      cart,
      cartOpen,
      setCartOpen,
      addToCart,
      removeFromCart,
      updateQty,
      cartCount,
      subtotal,
      wishlist,
      toggleWishlist,
      isWished,
      recent,
      trackView,
    }),
    [
      theme,
      toggleTheme,
      cart,
      cartOpen,
      addToCart,
      removeFromCart,
      updateQty,
      cartCount,
      subtotal,
      wishlist,
      toggleWishlist,
      isWished,
      recent,
      trackView,
    ],
  );

  return <ShopCtx.Provider value={value}>{children}</ShopCtx.Provider>;
}

export function useShop() {
  const ctx = useContext(ShopCtx);
  if (!ctx) throw new Error("useShop must be used within ShopProvider");
  return ctx;
}
