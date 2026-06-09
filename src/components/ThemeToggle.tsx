import { Moon, Sun } from "lucide-react";
import { useShop } from "@/contexts/ShopProvider";

export function ThemeToggle() {
  const { theme, toggleTheme } = useShop();
  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface text-muted-foreground transition-all hover:text-foreground hover:border-foreground/20"
    >
      <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </button>
  );
}
