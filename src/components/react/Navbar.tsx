"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MenuIcon } from "lucide-react";
import { useState, useEffect } from "react";

interface NavbarProps {
  menu: {
    label: string;
    href: string;
  }[];
  pathname: string;
}

export default function Navbar({ menu, pathname }: NavbarProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return isMobile ? (
    <div className="flex items-center gap-4">
      <Button
        variant="ghost"
        className="bg-background cursor-pointer border-0 text-base"
      >
        <MenuIcon className="size-4" />
      </Button>
    </div>
  ) : (
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
  );
}
