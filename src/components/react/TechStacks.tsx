"use client";

import {
  Marquee,
  MarqueeContent,
  MarqueeFade,
  MarqueeItem,
} from "@/components/ui/shadcn-io/marquee";

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
    <div className="bg-background flex size-full items-center justify-center">
      <Marquee>
        <MarqueeFade side="left" />
        <MarqueeFade side="right" />
        <MarqueeContent
          className="justify-between"
          direction={reverse ? "right" : "left"}
        >
          {techStacks.map((techStack, index) => (
            <MarqueeItem className="mx-4 my-8" key={index}>
              <div className="flex items-center justify-center gap-4">
                <i className={`${techStack.icon} text-4xl`}></i>
                <span className="text-xl font-bold">{techStack.name}</span>
              </div>
            </MarqueeItem>
          ))}
        </MarqueeContent>
      </Marquee>
    </div>
  );
}
