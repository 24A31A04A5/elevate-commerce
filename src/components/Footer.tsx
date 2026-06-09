import { Link } from "@tanstack/react-router";

const cols = [
  { title: "Shop", links: ["Catalog", "New arrivals", "Bestsellers", "Sale"] },
  { title: "Company", links: ["About", "Journal", "Careers", "Press"] },
  { title: "Support", links: ["Contact", "Shipping", "Returns", "Warranty"] },
  { title: "Legal", links: ["Privacy", "Terms", "Cookies"] },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface-elevated">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-10">
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2">
              <div className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-primary to-primary-hover text-primary-foreground font-bold text-sm">S</div>
              <span className="text-lg font-semibold tracking-tight">ShopFlow</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              Tools and essentials for the future of work. Made in small batches with people we trust.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-6 flex max-w-sm gap-2"
            >
              <input
                type="email"
                required
                placeholder="you@inbox.com"
                className="h-10 flex-1 rounded-full border border-border bg-background px-4 text-sm outline-none focus:border-primary"
              />
              <button className="h-10 rounded-full bg-foreground px-4 text-sm font-medium text-background hover:opacity-90">
                Subscribe
              </button>
            </form>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">{c.title}</p>
              <ul className="mt-4 space-y-3">
                {c.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-sm text-foreground/80 hover:text-primary transition-colors">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col sm:flex-row justify-between gap-4 pt-8 border-t border-border text-xs text-muted-foreground">
          <p>© 2026 ShopFlow Inc. All rights reserved.</p>
          <p>Designed in California · Built with care.</p>
        </div>
      </div>
    </footer>
  );
}
