import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, Tag, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useShop } from "@/contexts/ShopProvider";

export function CartDrawer() {
  const { cart, cartOpen, setCartOpen, updateQty, removeFromCart, subtotal } = useShop();
  const [coupon, setCoupon] = useState("");
  const [applied, setApplied] = useState(false);

  const discount = applied ? subtotal * 0.1 : 0;
  const shipping = subtotal > 100 || subtotal === 0 ? 0 : 9;
  const total = subtotal - discount + shipping;

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 z-50 bg-foreground/30 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 280 }}
            className="fixed right-0 top-0 z-50 h-full w-full max-w-md bg-background shadow-2xl flex flex-col border-l border-border"
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-border">
              <div>
                <h2 className="text-lg font-semibold tracking-tight">Your cart</h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {cart.length === 0 ? "It's empty for now" : `${cart.length} item${cart.length > 1 ? "s" : ""}`}
                </p>
              </div>
              <button
                onClick={() => setCartOpen(false)}
                aria-label="Close cart"
                className="grid h-9 w-9 place-items-center rounded-full border border-border hover:bg-secondary"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6">
              {cart.length === 0 ? (
                <div className="h-full grid place-items-center text-center">
                  <div>
                    <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-secondary text-muted-foreground">
                      <ShoppingBag className="h-7 w-7" />
                    </div>
                    <p className="mt-4 font-medium">Your cart is empty</p>
                    <p className="text-sm text-muted-foreground mt-1">Add a few things you love.</p>
                    <button
                      onClick={() => setCartOpen(false)}
                      className="mt-6 inline-flex h-10 items-center rounded-full bg-foreground px-5 text-sm font-medium text-background"
                    >
                      Browse catalog
                    </button>
                  </div>
                </div>
              ) : (
                <ul className="space-y-5">
                  {cart.map(({ product, qty }) => (
                    <motion.li
                      key={product.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 30 }}
                      className="flex gap-4"
                    >
                      <div className="h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-secondary border border-border">
                        <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-sm font-semibold truncate">{product.name}</p>
                          <button
                            onClick={() => removeFromCart(product.id)}
                            className="text-xs text-muted-foreground hover:text-destructive"
                          >
                            Remove
                          </button>
                        </div>
                        <p className="text-xs text-muted-foreground truncate">{product.tagline}</p>
                        <div className="mt-3 flex items-center justify-between">
                          <div className="inline-flex items-center rounded-full border border-border">
                            <button
                              onClick={() => updateQty(product.id, qty - 1)}
                              aria-label="Decrease"
                              className="grid h-8 w-8 place-items-center text-muted-foreground hover:text-foreground"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="w-7 text-center text-sm font-medium">{qty}</span>
                            <button
                              onClick={() => updateQty(product.id, qty + 1)}
                              aria-label="Increase"
                              className="grid h-8 w-8 place-items-center text-muted-foreground hover:text-foreground"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                          <p className="text-sm font-semibold">${(product.price * qty).toLocaleString()}</p>
                        </div>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t border-border px-6 py-5 bg-surface-elevated space-y-4">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                    <input
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value)}
                      placeholder="Promo code"
                      className="h-10 w-full rounded-full border border-border bg-background pl-9 pr-4 text-sm outline-none focus:border-primary"
                    />
                  </div>
                  <button
                    onClick={() => {
                      if (!coupon) return;
                      setApplied(true);
                      toast.success("Promo applied: 10% off");
                    }}
                    className="h-10 rounded-full border border-border bg-background px-4 text-sm font-medium hover:bg-secondary"
                  >
                    Apply
                  </button>
                </div>

                <div className="space-y-1.5 text-sm">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span><span>${subtotal.toFixed(2)}</span>
                  </div>
                  {applied && (
                    <div className="flex justify-between text-primary">
                      <span>Promo (10%)</span><span>−${discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-muted-foreground">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? "Free" : `$${shipping}`}</span>
                  </div>
                  <div className="flex justify-between text-base font-semibold pt-2 border-t border-border">
                    <span>Total</span><span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={() => toast.success("Checkout coming soon")}
                  className="w-full h-12 rounded-2xl bg-foreground text-background font-medium hover:shadow-[var(--shadow-glow)] transition-all"
                >
                  Checkout · ${total.toFixed(2)}
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
