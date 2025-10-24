import type { CollectionEntry } from "astro:content";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import {
  MapPinIcon,
  FileIcon,
  LinkIcon,
  CalendarIcon,
  TagIcon,
} from "lucide-react";
import { useTranslations } from "@/i18n/utils";
import { ui } from "@/i18n/ui";

interface SlidesProps {
  slides: CollectionEntry<"site">["data"]["author"]["slides"] | undefined;
  lang: string;
}

export default function Slides({ slides, lang }: SlidesProps) {
  if (!slides) return null;

  const t = useTranslations(lang as keyof typeof ui);

  return (
    <div className="h-full w-full">
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="w-full text-left"
      >
        {t("slides.title")}
      </motion.h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {slides.map((slide, index) => (
          <motion.div
            key={slide.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: (index + 3) * 0.2, duration: 0.5 }}
            className="bg-background rounded-lg"
          >
            <div className="rounded-xl p-4 transition-all duration-300 hover:bg-[#1d93ad]/10 hover:ring hover:ring-[#1d93ad]">
              <div className="flex items-center justify-between gap-2">
                <h3 className="my-0 text-lg font-bold">{slide.title}</h3>
                <pre className="text-muted-foreground m-0 font-bold">
                  {slide.madeBy}
                </pre>
              </div>
              <p>{slide.description}</p>
              {slide.tags && (
                <p className="text-muted-foreground flex items-center gap-2 text-sm">
                  <TagIcon className="size-4" />
                  {slide.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-muted-foreground bg-muted m-0 rounded-full px-2 py-1 text-xs font-bold"
                    >
                      #{tag}
                    </span>
                  ))}
                </p>
              )}
              {slide.location && (
                <p className="text-muted-foreground flex items-center gap-2 text-sm">
                  <MapPinIcon className="size-4" />
                  {slide.location}
                  <CalendarIcon className="size-4" />
                  {slide.date?.toLocaleDateString()}
                </p>
              )}
              <div className="flex gap-2">
                {slide.slideLink && (
                  <a
                    href={slide.slideLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      variant="ghost"
                      className="hover:ring-tty hover:text-tty cursor-pointer text-blue-500 hover:ring"
                    >
                      <LinkIcon className="size-4" />
                      Slide
                    </Button>
                  </a>
                )}
                {slide.pdfLink && (
                  <a
                    href={slide.pdfLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      variant="ghost"
                      className="hover:ring-tty hover:text-tty cursor-pointer text-red-500 hover:ring"
                    >
                      <FileIcon className="size-4" />
                      PDF
                    </Button>
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
