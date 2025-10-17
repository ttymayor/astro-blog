import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NavbarProps {
  menu: {
    label: string;
    href: string;
  }[];
  pathname: string;
}

export default function Navbar({ menu, pathname }: NavbarProps) {
  return (
    <nav className="[&>a]:text-foreground [&>a]:hover:text-primary flex items-center gap-4 [&>a]:text-sm [&>a]:font-medium">
      {menu.map((link) => (
        <a href={link.href} key={link.label}>
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
