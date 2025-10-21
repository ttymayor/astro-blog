import type { CollectionEntry } from "astro:content";
import {
  Item,
  ItemGroup,
  ItemMedia,
  ItemContent,
  ItemTitle,
  ItemDescription,
} from "../ui/item";
import { motion } from "motion/react";
import { getLocalizedPath } from "@/i18n/utils";
import { ui } from "@/i18n/ui";

interface PostsListProps {
  posts: CollectionEntry<"posts">[];
  lang: string;
}

export default function PostsList({ posts, lang }: PostsListProps) {
  return (
    <ItemGroup className="flex flex-col gap-2">
      {posts.map((post, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: (index + 1) * 0.2, duration: 0.5 }}
        >
          <a
            href={getLocalizedPath(
              `/posts/${post.data.slug}`,
              lang as keyof typeof ui,
            )}
            className="text-primary hover:text-primary flex w-full items-center gap-2 no-underline"
          >
            <Item
              variant="outline"
              role="listitem"
              className="bg-background hover:bg-accent w-full"
            >
              <img
                src={`https://picsum.photos/200`}
                alt={post.data.title}
                width={48}
                height={48}
                className="rounded-sm object-cover grayscale"
              />
              <ItemContent>
                <ItemTitle className="line-clamp-1">
                  {post.data.title}
                </ItemTitle>
                <ItemDescription className="my-0">
                  {post.data.description}
                </ItemDescription>
              </ItemContent>
              <ItemContent className="flex-none text-center">
                <ItemDescription>
                  {post.data.pubDate.toLocaleDateString("zh-TW")}
                </ItemDescription>
              </ItemContent>
            </Item>
          </a>
        </motion.div>
      ))}
    </ItemGroup>
  );
}
