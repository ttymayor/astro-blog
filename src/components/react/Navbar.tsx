"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { MenuIcon, XIcon } from "lucide-react";
import TaiwanTime from "./TaiwanTime";
import { useIsMobile } from "@/hooks/useIsMobile";

interface NavbarProps {
  menu: {
    label: string;
    href: string;
  }[];
  pathname: string;
  author: {
    name: string;
  };
}

export default function Navbar({ menu, pathname, author }: NavbarProps) {
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <a
        href="/"
        className="text-foreground hover:text-primary no-underline"
        data-astro-prefetch
        data-astro-reload
      >
        <h1 className="text-xl font-bold md:text-2xl">{author.name}</h1>
      </a>
      {isMobile ? (
        <>
          <Button
            variant="ghost"
            className="bg-background cursor-pointer border-0 text-base"
            onClick={() => setIsMenuOpen(true)}
          >
            <MenuIcon className="size-6" />
          </Button>
          <MobileMenu
            menu={menu}
            pathname={pathname}
            isMenuOpen={isMenuOpen}
            setIsMenuOpen={setIsMenuOpen}
          />
        </>
      ) : (
        <>
          <nav className="[&>a]:text-foreground [&>a]:hover:text-primary flex items-center gap-4 [&>a]:text-sm [&>a]:font-medium">
            {menu.map((link) => (
              <a href={link.href} key={link.label} data-astro-prefetch>
                <Button
                  variant="ghost"
                  className={cn(
                    "bg-background cursor-pointer border-0 text-base",
                    pathname === link.href ? "bg-accent" : "",
                  )}
                >
                  {link.label}
                </Button>
              </a>
            ))}
          </nav>
          <TaiwanTime />
        </>
      )}
    </>
  );
}

function MobileMenu({
  menu,
  pathname,
  isMenuOpen,
  setIsMenuOpen,
}: {
  menu: NavbarProps["menu"];
  pathname: NavbarProps["pathname"];
  isMenuOpen: boolean;
  setIsMenuOpen: (isMenuOpen: boolean) => void;
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
          <h1 className="text-2xl font-bold">選單</h1>
          <Button
            variant="ghost"
            className="cursor-pointer border-0 bg-transparent text-base hover:bg-transparent"
            onClick={() => setIsMenuOpen(false)}
          >
            <XIcon className="size-6" />
          </Button>
        </div>
        {menu.map((link) => (
          <a href={link.href} key={link.label} data-astro-prefetch>
            <Button
              variant="ghost"
              className="w-full cursor-pointer border-0 bg-transparent py-8 text-xl transition-all duration-300 hover:bg-transparent hover:underline"
              data-active={pathname === link.href}
            >
              {link.label}
            </Button>
          </a>
        ))}
      </div>
      <div
        id="mobile-menu-footer"
        className="flex items-center justify-center py-4"
      >
        <TaiwanTime />
      </div>
    </div>
  );
}
