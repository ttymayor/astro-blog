import { useTranslations } from "@/i18n/utils";
import { ui } from "@/i18n/ui";
import type { CollectionEntry } from "astro:content";
import { BadgeIcon, Building2 } from "lucide-react";
import { delay, motion } from "motion/react";
import { Badge } from "../ui/badge";

interface ExperienceProps {
  experience:
    | CollectionEntry<"site">["data"]["author"]["experience"]
    | undefined;
  lang: string;
}

export default function Experience({ experience, lang }: ExperienceProps) {
  const t = useTranslations(lang as keyof typeof ui);

  if (!experience) return null;

  return (
    <div className="my-6 w-full">
      <h2 className="w-full text-left">{t("experience.title")}</h2>

      <div className="mx-6 flex flex-col">
        {experience?.map((item) => (
          <motion.div
            key={item.title}
            className="flex flex-row gap-6"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: { delay: 0.5 },
            }}
            viewport={{ once: true }}
          >
            <div>
              <div className="bg-muted h-full w-1">
                <div className="bg-muted relative top-2 right-2 h-5 w-5 rounded-full"></div>
              </div>
            </div>
            <div className="w-full">
              <div className="mt-1 flex items-center justify-between">
                <h3 className="my-0">
                  {item.title}{" "}
                  <span className="text-muted-foreground text-sm">
                    {item.position}
                  </span>
                </h3>
                <p className="text-muted-foreground m-0 text-sm">
                  {item.startDate.toLocaleDateString("zh-TW")}
                  {item.endDate ? (
                    <> ~ {item.endDate.toLocaleDateString("zh-TW")}</>
                  ) : (
                    <> ~ Present</>
                  )}
                </p>
              </div>
              <p className="flex items-center gap-2">
                <Building2 className="size-4" /> {item.company}
              </p>

              {item.tags && (
                <div className="flex items-center gap-2">
                  {item.tags?.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="text-muted-foreground text-sm"
                    >
                      <BadgeIcon className="size-4" /> {tag}
                    </Badge>
                  ))}
                </div>
              )}
              <p className="text-muted-foreground mb-6">{item.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
