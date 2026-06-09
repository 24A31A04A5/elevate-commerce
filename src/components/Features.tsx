import { motion } from "framer-motion";
import { Shield, Truck, RotateCcw, Sparkles } from "lucide-react";

const features = [
  { icon: Truck, title: "Free overnight shipping", body: "On orders over $100, anywhere in the contiguous US." },
  { icon: Shield, title: "Lifetime warranty", body: "If it breaks under normal use, we replace it. Forever." },
  { icon: RotateCcw, title: "60-day returns", body: "Use it, abuse it, return it. No questions, no restocking fees." },
  { icon: Sparkles, title: "Hand-picked", body: "Every object is sourced from an independent studio we trust." },
];

export function Features() {
  return (
    <section id="features" className="mx-auto max-w-7xl px-4 sm:px-6 py-20 lg:py-28">
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Why ShopFlow</p>
        <h2 className="mt-2 text-3xl sm:text-4xl font-semibold tracking-tight">
          Built around the things that matter.
        </h2>
      </div>
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, delay: i * 0.05 }}
            className="group rounded-3xl border border-border bg-surface p-6 hover:shadow-[var(--shadow-soft)] hover:-translate-y-0.5 transition-all"
          >
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              <f.icon className="h-5 w-5" />
            </div>
            <h3 className="mt-5 font-semibold tracking-tight">{f.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.body}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
