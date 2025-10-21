"use client";

import { Button } from "@/components/ui/button";
import { Languages } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const languages = {
  "zh-TW": "繁體中文",
  en: "English",
};

interface LanguageSwitcherProps {
  lang: string;
  currentPath: string;
}

export default function LanguageSwitcher({
  lang,
  currentPath,
}: LanguageSwitcherProps) {
  const getLocalizedPath = (lang: string, path: string) => {
    // 移除當前語言前綴（如果有）
    let cleanPath = path;
    Object.keys(languages).forEach((l) => {
      if (path.startsWith(`/${l}/`)) {
        cleanPath = path.substring(l.length + 1);
      } else if (path === `/${l}`) {
        cleanPath = "/";
      }
    });

    // 添加新語言前綴
    if (lang === "zh-TW") {
      return cleanPath || "/";
    }
    return `/${lang}${cleanPath || "/"}`;
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-foreground hover:text-primary cursor-pointer bg-transparent"
          aria-label="切換語言"
        >
          <Languages className="size-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-40 border-0">
        <div className="flex flex-col gap-2">
          {Object.entries(languages).map(([language, label]) => (
            <a
              key={language}
              href={getLocalizedPath(language, currentPath)}
              className={`text-foreground hover:text-primary rounded px-2 py-1 text-sm no-underline ${
                lang === language ? "bg-accent pointer-events-none" : ""
              }`}
            >
              {label}
            </a>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
