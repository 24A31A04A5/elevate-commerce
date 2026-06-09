import { motion } from "framer-motion";
import { Star } from "lucide-react";

const items = [
  {
    quote: "ShopFlow is the only catalog I open on purpose. The curation is unreal.",
    name: "Maya Chen",
    role: "Design Lead, Linear",
  },
  {
    quote: "Felt like ordering from a friend with impossibly good taste. Everything arrived perfectly.",
    name: "Ren Okada",
    role: "Founder, Atlas Studio",
  },
  {
    quote: "I replaced my entire desk setup with ShopFlow. Zero regrets, infinite compliments.",
    name: "Priya Patel",
    role: "Engineer, Stripe",
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="bg-surface-elevated border-y border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-20 lg:py-28">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Loved by the discerning</p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-semibold tracking-tight">
            What customers are saying.
          </h2>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="rounded-3xl bg-background border border-border p-7 flex flex-col gap-5"
            >
              <div className="flex gap-0.5 text-amber-400">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <blockquote className="text-base leading-relaxed text-foreground/90">
                "{t.quote}"
              </blockquote>
              <figcaption className="mt-auto flex items-center gap-3 pt-2">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-primary/30 to-primary/10 text-sm font-semibold text-primary">
                  {t.name[0]}
                </div>
                <div>
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
