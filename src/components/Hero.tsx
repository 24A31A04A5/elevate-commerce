import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

const trustedBy = ["Linear", "Notion", "Stripe", "Vercel", "Framer", "Arc"];

export function Hero() {
  return (
    <section className="relative overflow-hidden hero-gradient">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-20 pb-24 lg:pt-28 lg:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
            >
              <Sparkles className="h-3 w-3" />
              Spring 2026 Collection
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05 }}
              className="mt-6 text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.05] text-balance"
            >
              Elevate your{" "}
              <span className="text-gradient">digital lifestyle.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mt-6 max-w-xl text-lg text-muted-foreground leading-relaxed"
            >
              Precision-engineered hardware and essentials for the modern
              minimalist. Designed in California, built to outlast the trend cycle.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mt-10 flex flex-wrap gap-3"
            >
              <a
                href="#catalog"
                className="group inline-flex h-12 items-center gap-2 rounded-2xl bg-foreground px-6 text-sm font-medium text-background transition-all hover:shadow-[var(--shadow-glow)] hover:-translate-y-0.5 active:translate-y-0"
              >
                Shop the collection
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href="#features"
                className="inline-flex h-12 items-center rounded-2xl border border-border bg-surface px-6 text-sm font-medium transition-colors hover:bg-secondary"
              >
                See what's inside
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-14"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Trusted by teams at
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-x-8 gap-y-3 opacity-60">
                {trustedBy.map((b) => (
                  <span
                    key={b}
                    className="text-base font-semibold tracking-tight text-foreground/70"
                  >
                    {b}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="absolute -inset-8 bg-gradient-to-tr from-primary/30 via-primary/10 to-transparent rounded-[3rem] blur-3xl" />
            <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden border border-border bg-surface shadow-[var(--shadow-lift)]">
              <img
                src="https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1200&q=80"
                alt="Premium aluminum keyboard on a minimalist desk"
                loading="eager"
                className="h-full w-full object-cover"
              />
              <div className="absolute bottom-4 left-4 right-4 rounded-2xl glass p-4 flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">Featured</p>
                  <p className="text-sm font-semibold mt-0.5">Titan Keydeck · $240</p>
                </div>
                <div className="grid h-9 w-9 place-items-center rounded-full bg-foreground text-background">
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
