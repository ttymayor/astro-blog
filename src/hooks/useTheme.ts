import { useState, useEffect } from "react";

type Theme = "light" | "dark" | "auto";

export function useTheme() {
  const [theme, setTheme] = useState<Theme>("auto");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // 初始化時讀取儲存的主題
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      // 如果沒有儲存的主題，使用系統偏好
      const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const defaultTheme = systemPrefersDark ? "dark" : "light";
      setTheme(defaultTheme);
      localStorage.setItem("theme", defaultTheme);
    }

    // 監聽系統主題變化（僅在 auto 模式下）
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      const currentTheme = localStorage.getItem("theme") as Theme | null;
      if (currentTheme === "auto" || !currentTheme) {
        applyTheme("auto");
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []); // 移除 theme 依賴，只在掛載時執行一次

  const applyTheme = (newTheme: Theme) => {
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
    const newTheme: Theme =
      theme === "light" ? "dark" : theme === "dark" ? "auto" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    applyTheme(newTheme);
  };

  const setThemeValue = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    applyTheme(newTheme);
  };

  return {
    theme,
    mounted,
    toggleTheme,
    setTheme: setThemeValue,
  };
}

