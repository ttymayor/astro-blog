"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { MenuIcon, XIcon } from "lucide-react";
import TaiwanTime from "./TaiwanTime";
import ThemeToggle from "./ThemeToggle";
import LanguageSwitcher from "./LanguageSwitcher";
import { getLocalizedPath } from "@/i18n/utils";
import { ui } from "@/i18n/ui";

interface NavbarProps {
  menu: {
    label: string;
    href: string;
  }[];
  pathname: string;
  author: {
    name: string;
  };
  lang: string;
  menuTitle: string;
}

export default function Navbar({
  menu,
  pathname: initialPathname,
  author,
  lang,
  menuTitle,
}: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [pathname, setPathname] = useState(initialPathname);

  // 在客戶端更新 pathname 以避免水合問題
  useEffect(() => {
    setPathname(window.location.pathname);
  }, []);

  // 監聽路由變化 (用於 Astro 的客戶端路由)
  useEffect(() => {
    const handleRouteChange = () => {
      setPathname(window.location.pathname);
    };

    // Astro 的路由事件
    document.addEventListener("astro:page-load", handleRouteChange);

    return () => {
      document.removeEventListener("astro:page-load", handleRouteChange);
    };
  }, []);

  return (
    <>
      <MobileMenu
        menu={menu}
        pathname={pathname}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        lang={lang}
        menuTitle={menuTitle}
      />

      {/* 手機版：使用 CSS 隱藏/顯示，避免閃爍 */}
      <div className="flex w-full items-center justify-between gap-2 py-4 md:hidden">
        <a
          href={getLocalizedPath("/", lang as keyof typeof ui)}
          className="text-foreground no-underline"
          data-astro-prefetch
        >
          <h1 className="text-xl font-bold md:text-2xl">{author.name}</h1>
        </a>
        <Button
          variant="ghost"
          className="bg-background text-foreground hover:text-primary cursor-pointer border-0 text-base"
          onClick={() => setIsMenuOpen(true)}
          aria-label="開啟選單"
        >
          <MenuIcon className="size-6" />
        </Button>
      </div>

      {/* 桌面版：使用 CSS 隱藏/顯示，避免閃爍 */}
      <div className="hidden w-full items-center justify-between gap-2 md:flex">
        <a
          href={getLocalizedPath("/", lang as keyof typeof ui)}
          className="text-foreground no-underline"
          data-astro-prefetch
        >
          <h1 className="text-xl font-bold md:text-2xl">{author.name}</h1>
        </a>

        <div className="flex items-center gap-4">
          <nav className="[&>a]:text-foreground [&>a]:hover:text-primary flex items-center gap-4 [&>a]:text-sm [&>a]:font-medium">
            {menu.map((link) => (
              <a
                href={link.href}
                key={link.label}
                onClick={() => setIsMenuOpen(false)}
                data-astro-prefetch
              >
                <Button
                  variant="ghost"
                  className={cn(
                    "bg-background text-foreground hover:text-primary cursor-pointer text-base select-none",
                    pathname === link.href ? "bg-accent" : "",
                  )}
                >
                  {link.label}
                </Button>
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <TaiwanTime />
            <LanguageSwitcher lang={lang} currentPath={pathname} />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </>
  );
}

function MobileMenu({
  menu,
  pathname,
  isMenuOpen,
  setIsMenuOpen,
  lang,
  menuTitle,
}: {
  menu: NavbarProps["menu"];
  pathname: NavbarProps["pathname"];
  isMenuOpen: boolean;
  setIsMenuOpen: (isMenuOpen: boolean) => void;
  lang: string;
  menuTitle: string;
}) {
  return (
    <div
      id="mobile-menu"
      className={cn(
        "fixed inset-0 z-50 flex flex-col gap-2 backdrop-blur transition-all duration-300",
        isMenuOpen ? "-translate-y-0" : "-translate-y-full",
      )}
    >
      <div className="flex flex-col gap-2 p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">{menuTitle}</h1>

          <div className="flex items-center gap-2">
            <TaiwanTime />
            <LanguageSwitcher lang={lang} currentPath={pathname} />
            <ThemeToggle />
            <Button
              variant="ghost"
              className="cursor-pointer bg-transparent text-base hover:bg-transparent"
              onClick={() => setIsMenuOpen(false)}
            >
              <XIcon className="size-6" />
            </Button>
          </div>
        </div>
        {menu.map((link) => (
          <a
            href={link.href}
            key={link.label}
            onClick={() => setIsMenuOpen(false)}
            data-astro-prefetch
            className="hover:text-primary visited:text-primary w-full cursor-pointer py-8 text-center text-xl no-underline backdrop-blur transition-all duration-300 hover:bg-transparent"
          >
            {link.label}
          </a>
        ))}
      </div>
      <div
        id="mobile-menu-footer"
        className="flex items-center justify-center gap-4 py-4"
      ></div>
    </div>
  );
}
