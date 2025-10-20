import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon, SunMoonIcon } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

export default function ThemeToggle() {
  const { theme, mounted, toggleTheme } = useTheme();

  // 避免 hydration 不匹配
  if (!mounted) {
    return (
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="text-foreground hover:text-primary cursor-pointer bg-transparent"
        >
          <SunMoonIcon className="size-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="icon"
        className="text-foreground hover:text-primary cursor-pointer bg-transparent"
        onClick={toggleTheme}
        aria-label={`切換主題（目前：${theme === "auto" ? "自動" : theme === "light" ? "淺色" : "深色"}）`}
      >
        {theme === "auto" && <SunMoonIcon className="size-4" />}
        {theme === "light" && <SunIcon className="size-4" />}
        {theme === "dark" && <MoonIcon className="size-4" />}
      </Button>
    </div>
  );
}
