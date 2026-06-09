import { Link } from "@tanstack/react-router";
import { Heart, Plus, Star } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import type { Product } from "@/lib/products";
import { useShop } from "@/contexts/ShopProvider";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { addToCart, toggleWishlist, isWished, setCartOpen } = useShop();
  const wished = isWished(product.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.04, 0.3) }}
      className="group"
    >
      <Link
        to="/products/$id"
        params={{ id: product.id }}
        className="block relative aspect-square overflow-hidden rounded-3xl bg-secondary border border-border"
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[800ms] ease-out group-hover:scale-105"
        />
        {product.badge && (
          <span className="absolute top-3 left-3 rounded-full bg-foreground px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-background">
            {product.badge}
          </span>
        )}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product.id);
          }}
          aria-label="Add to wishlist"
          className="absolute top-3 right-3 grid h-9 w-9 place-items-center rounded-full glass transition-transform hover:scale-110 active:scale-95"
        >
          <Heart
            className={`h-4 w-4 transition-colors ${wished ? "fill-red-500 text-red-500" : "text-foreground"}`}
          />
        </button>
        <div className="absolute bottom-3 left-3 right-3 translate-y-14 group-hover:translate-y-0 transition-transform duration-300">
          <button
            onClick={(e) => {
              e.preventDefault();
              addToCart(product);
              setCartOpen(true);
              toast.success(`${product.name} added to cart`);
            }}
            className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-foreground py-3 text-sm font-medium text-background shadow-[var(--shadow-lift)]"
          >
            <Plus className="h-4 w-4" /> Add to cart
          </button>
        </div>
      </Link>

      <div className="mt-4 flex items-start justify-between gap-2">
        <div className="min-w-0">
          <Link
            to="/products/$id"
            params={{ id: product.id }}
            className="block truncate text-sm font-semibold tracking-tight hover:text-primary transition-colors"
          >
            {product.name}
          </Link>
          <p className="truncate text-xs text-muted-foreground mt-0.5">{product.tagline}</p>
          <div className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
            <span className="font-medium text-foreground">{product.rating}</span>
            <span>({product.reviewCount.toLocaleString()})</span>
          </div>
        </div>
        <div className="text-right shrink-0">
          <p className="text-sm font-semibold">${product.price}</p>
          {product.originalPrice && (
            <p className="text-xs text-muted-foreground line-through">${product.originalPrice}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
