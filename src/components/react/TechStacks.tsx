"use client";

import {
  Marquee,
  MarqueeContent,
  MarqueeFade,
  MarqueeItem,
} from "@/components/ui/shadcn-io/marquee";

export default function TechStacks() {
  return (
    <div className="bg-background flex size-full items-center justify-center">
      <Marquee>
        <MarqueeFade side="left" />
        <MarqueeFade side="right" />
        <MarqueeContent>
          {new Array(5).fill(null).map((_, index) => (
            <MarqueeItem className="h-32 w-32" key={index}>
              <p>{index}</p>
            </MarqueeItem>
          ))}
        </MarqueeContent>
      </Marquee>
    </div>
  );
}
