import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon, SunMoonIcon } from "lucide-react";
import { useState, useEffect } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark" | "auto">("auto");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // 初始化時讀取儲存的主題
    const savedTheme = localStorage.getItem("theme") as
      | "light"
      | "dark"
      | "auto"
      | null;
    if (savedTheme) {
      setTheme(savedTheme);
      applyTheme(savedTheme);
    } else {
      setTheme("auto");
      applyTheme("auto");
    }
  }, []);

  const applyTheme = (newTheme: "light" | "dark" | "auto") => {
    if (newTheme === "auto") {
      // auto 模式：根據系統偏好設定
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      document.documentElement.classList.toggle("dark", isDark);
    } else if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const toggleTheme = () => {
    const newTheme =
      theme === "light" ? "dark" : theme === "dark" ? "auto" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    applyTheme(newTheme);
  };

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
