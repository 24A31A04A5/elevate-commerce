import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Heart, Minus, Plus, Share2, Star, Truck, Shield, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { PRODUCTS } from "@/lib/products";
import { useShop } from "@/contexts/ShopProvider";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/products/$id")({
  loader: ({ params }) => {
    const product = PRODUCTS.find((p) => p.id === params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.product;
    if (!p) return { meta: [{ title: "Product — ShopFlow" }] };
    return {
      meta: [
        { title: `${p.name} — ShopFlow` },
        { name: "description", content: p.description },
        { property: "og:title", content: `${p.name} — ShopFlow` },
        { property: "og:description", content: p.description },
        { property: "og:type", content: "product" },
        { property: "og:image", content: p.image },
        { property: "og:url", content: `/products/${p.id}` },
      ],
      links: [{ rel: "canonical", href: `/products/${p.id}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: p.name,
            description: p.description,
            image: p.image,
            offers: { "@type": "Offer", price: p.price, priceCurrency: "USD", availability: "https://schema.org/InStock" },
            aggregateRating: { "@type": "AggregateRating", ratingValue: p.rating, reviewCount: p.reviewCount },
          }),
        },
      ],
    };
  },
  component: ProductPage,
  notFoundComponent: () => (
    <div className="mx-auto max-w-md text-center py-32 px-6">
      <h1 className="text-2xl font-semibold">Product not found</h1>
      <Link to="/" className="mt-6 inline-flex h-10 items-center rounded-full bg-foreground px-5 text-sm font-medium text-background">
        Back to catalog
      </Link>
    </div>
  ),
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { addToCart, setCartOpen, toggleWishlist, isWished, trackView } = useShop();
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(product.image);

  useEffect(() => { trackView(product.id); }, [product.id, trackView]);
  useEffect(() => { setActiveImg(product.image); setQty(1); }, [product.image]);

  const related = PRODUCTS.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 4);
  const wished = isWished(product.id);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
      <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Back to catalog
      </Link>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="lg:col-span-7"
        >
          <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-secondary border border-border group">
            <img src={activeImg} alt={product.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
          </div>
          {product.gallery.length > 1 && (
            <div className="mt-4 flex gap-3 overflow-x-auto no-scrollbar">
              {product.gallery.map((g) => (
                <button
                  key={g}
                  onClick={() => setActiveImg(g)}
                  className={`shrink-0 h-20 w-20 rounded-2xl overflow-hidden border-2 transition-all ${
                    activeImg === g ? "border-primary" : "border-border opacity-70 hover:opacity-100"
                  }`}
                >
                  <img src={g} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-5 lg:sticky lg:top-24 lg:self-start"
        >
          {product.badge && (
            <span className="inline-flex rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-medium">{product.badge}</span>
          )}
          <h1 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight">{product.name}</h1>
          <p className="mt-2 text-muted-foreground">{product.tagline}</p>

          <div className="mt-4 flex items-center gap-3 text-sm">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              <span className="font-medium">{product.rating}</span>
            </div>
            <span className="text-muted-foreground">·</span>
            <span className="text-muted-foreground">{product.reviewCount.toLocaleString()} reviews</span>
          </div>

          <div className="mt-6 flex items-baseline gap-3">
            <span className="text-3xl font-semibold">${product.price}</span>
            {product.originalPrice && <span className="text-lg text-muted-foreground line-through">${product.originalPrice}</span>}
          </div>

          <p className="mt-6 text-foreground/80 leading-relaxed">{product.description}</p>

          <div className="mt-8 flex items-center gap-3">
            <div className="inline-flex items-center rounded-full border border-border bg-surface">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="grid h-11 w-11 place-items-center text-muted-foreground hover:text-foreground" aria-label="Decrease">
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-8 text-center font-medium">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="grid h-11 w-11 place-items-center text-muted-foreground hover:text-foreground" aria-label="Increase">
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <button
              onClick={() => { addToCart(product, qty); setCartOpen(true); toast.success(`${product.name} × ${qty} added`); }}
              className="flex-1 h-12 rounded-full bg-foreground text-background font-medium hover:shadow-[var(--shadow-glow)] transition-all"
            >
              Add to cart · ${(product.price * qty).toLocaleString()}
            </button>
            <button
              onClick={() => toggleWishlist(product.id)}
              aria-label="Wishlist"
              className="grid h-12 w-12 place-items-center rounded-full border border-border bg-surface hover:bg-secondary"
            >
              <Heart className={`h-5 w-5 ${wished ? "fill-red-500 text-red-500" : ""}`} />
            </button>
            <button
              onClick={() => {
                navigator.clipboard?.writeText(window.location.href);
                toast.success("Link copied to clipboard");
              }}
              aria-label="Share"
              className="grid h-12 w-12 place-items-center rounded-full border border-border bg-surface hover:bg-secondary"
            >
              <Share2 className="h-5 w-5" />
            </button>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-2 text-center">
            {[
              { icon: Truck, label: "Free shipping" },
              { icon: RotateCcw, label: "60-day returns" },
              { icon: Shield, label: "Lifetime warranty" },
            ].map((b) => (
              <div key={b.label} className="rounded-2xl border border-border bg-surface p-3">
                <b.icon className="mx-auto h-4 w-4 text-primary" />
                <p className="mt-1.5 text-[11px] font-medium">{b.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-border bg-surface divide-y divide-border">
            {product.specs.map((s) => (
              <div key={s.label} className="flex justify-between px-5 py-3 text-sm">
                <span className="text-muted-foreground">{s.label}</span>
                <span className="font-medium">{s.value}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {related.length > 0 && (
        <section className="mt-24">
          <h2 className="text-2xl font-semibold tracking-tight mb-8">You may also like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </section>
      )}
    </div>
  );
}
