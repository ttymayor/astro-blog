"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";
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
  pathname,
  author,
  lang,
  menuTitle,
}: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <a
        href={getLocalizedPath("/", lang as keyof typeof ui)}
        className="text-foreground no-underline"
        data-astro-prefetch
      >
        <h1 className="text-xl font-bold md:text-2xl">{author.name}</h1>
      </a>

      {/* 手機版：使用 CSS 隱藏/顯示，避免閃爍 */}
      <div className="flex items-center gap-2 md:hidden">
        <Button
          variant="ghost"
          className="bg-background text-foreground hover:text-primary cursor-pointer border-0 text-base"
          onClick={() => setIsMenuOpen(true)}
          aria-label="開啟選單"
        >
          <MenuIcon className="size-6" />
        </Button>
      </div>
      <MobileMenu
        menu={menu}
        pathname={pathname}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        lang={lang}
        menuTitle={menuTitle}
      />

      {/* 桌面版：使用 CSS 隱藏/顯示，避免閃爍 */}
      <div className="hidden md:flex md:items-center md:gap-4">
        <nav className="[&>a]:text-foreground [&>a]:hover:text-primary flex items-center gap-4 [&>a]:text-sm [&>a]:font-medium">
          {menu.map((link) => (
            <a href={link.href} key={link.label} data-astro-prefetch>
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
        "fixed inset-0 z-50 flex flex-col gap-2 backdrop-blur-sm transition-all duration-300",
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
          <a href={link.href} key={link.label} data-astro-prefetch>
            <Button
              variant="ghost"
              className="w-full cursor-pointer bg-transparent py-8 text-xl transition-all duration-300 hover:bg-transparent hover:underline"
              data-active={pathname === link.href}
            >
              {link.label}
            </Button>
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
