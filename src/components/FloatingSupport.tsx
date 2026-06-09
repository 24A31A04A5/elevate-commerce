import { MessageCircle } from "lucide-react";
import { toast } from "sonner";

export function FloatingSupport() {
  return (
    <button
      onClick={() => toast("Live chat opens in a sec…", { description: "A real human, usually within 60 seconds." })}
      aria-label="Open support chat"
      className="fixed bottom-6 right-6 z-40 grid h-12 w-12 place-items-center rounded-full bg-foreground text-background shadow-[var(--shadow-lift)] hover:scale-110 active:scale-95 transition-transform"
    >
      <MessageCircle className="h-5 w-5" />
    </button>
  );
}
