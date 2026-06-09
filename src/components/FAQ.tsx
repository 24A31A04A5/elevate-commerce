import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "Where do you ship?", a: "We ship to 45+ countries with overnight delivery in the US and 2–5 day air on international orders." },
  { q: "What's your return policy?", a: "60 days, no questions asked. We cover return shipping on orders over $100." },
  { q: "Are these in stock?", a: "Yes. Every product on ShopFlow is in our warehouse and ships within 24 hours." },
  { q: "Do you offer business or bulk pricing?", a: "We do. Reach out at hello@shopflow.example and we'll set you up with net-30 and tiered pricing." },
  { q: "Can I track my order?", a: "Yes — you'll get a tracking link the moment your order ships, plus delivery updates by email or SMS." },
];

export function FAQ() {
  return (
    <section id="faq" className="mx-auto max-w-3xl px-4 sm:px-6 py-20 lg:py-28">
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">FAQ</p>
        <h2 className="mt-2 text-3xl sm:text-4xl font-semibold tracking-tight">Questions, answered.</h2>
      </div>
      <Accordion type="single" collapsible className="mt-10 space-y-3">
        {faqs.map((f, i) => (
          <AccordionItem
            key={f.q}
            value={`item-${i}`}
            className="rounded-2xl border border-border bg-surface px-5 data-[state=open]:bg-surface-elevated transition-colors"
          >
            <AccordionTrigger className="text-left font-medium hover:no-underline py-5">
              {f.q}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
              {f.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
