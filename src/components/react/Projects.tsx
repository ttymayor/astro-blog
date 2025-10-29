import type { CollectionEntry } from "astro:content";
import { motion } from "motion/react";
import { useTranslations } from "@/i18n/utils";
import { ui } from "@/i18n/ui";
import { ExternalLinkIcon, ImageOff } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SiGithub } from "@icons-pack/react-simple-icons";

interface ProjectsProps {
  projects: CollectionEntry<"site">["data"]["author"]["projects"] | undefined;
  lang: string;
}

export default function Projects({ projects, lang }: ProjectsProps) {
  const t = useTranslations(lang as keyof typeof ui);

  return (
    <div className="my-6 w-full">
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="w-full text-left"
      >
        {t("projects.title")}
      </motion.h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {projects?.map((project) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: { delay: 0.2, duration: 0.5 },
            }}
            viewport={{ once: true }}
            className="bg-background flex flex-col gap-4 rounded-lg p-4 transition-all duration-300 hover:scale-101"
          >
            {project.image ? (
              <AspectRatio ratio={2 / 1} className="">
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className="h-full w-full rounded-md object-cover"
                />
              </AspectRatio>
            ) : (
              <AspectRatio
                ratio={2 / 1}
                className="bg-muted flex flex-col items-center justify-center gap-2 rounded-lg text-sm"
              >
                <ImageOff className="text-muted-foreground size-6" />
                <span className="text-muted-foreground">Not Set Image</span>
              </AspectRatio>
            )}
            <div className="flex flex-col gap-2">
              {project.url ? (
                <a href={project.url} target="_blank" rel="noopener noreferrer">
                  <h3 className="hover:text-primary m-0 flex items-center gap-2 text-lg font-bold transition-all duration-300">
                    {project.title}
                    <ExternalLinkIcon className="size-4" />
                  </h3>
                </a>
              ) : (
                <h3 className="hover:text-primary m-0 flex items-center gap-2 text-lg font-bold transition-all duration-300">
                  {project.title}
                </h3>
              )}
              <p className="text-muted-foreground m-0 text-sm">
                {project.description}
              </p>
              <div className="flex gap-2">
                {project.tags?.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="flex items-center gap-2">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="ghost" className="cursor-pointer">
                      <SiGithub className="size-4" />
                      GitHub
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
