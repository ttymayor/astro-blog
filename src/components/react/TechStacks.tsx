"use client";

import {
  Marquee,
  MarqueeContent,
  MarqueeFade,
  MarqueeItem,
} from "@/components/ui/shadcn-io/marquee";
import { motion } from "motion/react";

interface TechStack {
  name: string;
  icon: string;
}

export default function TechStacks({
  techStacks,
  reverse = false,
}: {
  techStacks: TechStack[];
  reverse?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="bg-background flex size-full items-center justify-center"
    >
      <Marquee>
        <MarqueeFade side="left" />
        <MarqueeFade side="right" />
        <MarqueeContent
          className="justify-between"
          direction={reverse ? "right" : "left"}
        >
          {techStacks.map((techStack, index) => (
            <MarqueeItem className="mx-4 my-8" key={index}>
              <div className="flex items-center justify-center gap-2">
                <i className={`${techStack.icon} text-4xl`}></i>
                <span className="text-xl font-bold">{techStack.name}</span>
              </div>
            </MarqueeItem>
          ))}
        </MarqueeContent>
      </Marquee>
    </motion.div>
  );
}
