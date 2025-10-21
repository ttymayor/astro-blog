import {
  Marquee,
  MarqueeContent,
  MarqueeFade,
  MarqueeItem,
} from "@/components/ui/marquee";
import "@/styles/marquee.css";
import { motion } from "motion/react";

interface TechStack {
  name: string;
  icon: string;
}

export default function TechStacks({
  techStacks,
}: {
  techStacks: TechStack[];
}) {
  // 將技術棧分成兩半，用於兩個方向的 Marquee
  const midPoint = Math.ceil(techStacks.length / 2);
  const firstHalf = techStacks.slice(0, midPoint);
  const secondHalf = techStacks.slice(midPoint);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex size-full flex-col items-center justify-center gap-4"
      >
        {/* 向左滾動的 Marquee */}
        <Marquee className="py-4">
          <MarqueeFade side="left" />
          <MarqueeFade side="right" />
          <MarqueeContent direction="left" pauseOnHover>
            {firstHalf.map((techStack, index) => (
              <MarqueeItem className="mx-4" key={`left-${index}`}>
                <div className="flex items-center justify-center gap-3">
                  <i className={`${techStack.icon} text-4xl`} />
                  <span className="text-xl font-bold">{techStack.name}</span>
                </div>
              </MarqueeItem>
            ))}
          </MarqueeContent>
        </Marquee>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="flex size-full flex-col items-center justify-center gap-4"
      >
        {/* 向右滾動的 Marquee */}
        <Marquee className="py-4">
          <MarqueeFade side="left" />
          <MarqueeFade side="right" />
          <MarqueeContent direction="right" pauseOnHover>
            {secondHalf.map((techStack, index) => (
              <MarqueeItem className="mx-4" key={`right-${index}`}>
                <div className="flex items-center justify-center gap-3">
                  <i className={`${techStack.icon} text-4xl`} />
                  <span className="text-xl font-bold">{techStack.name}</span>
                </div>
              </MarqueeItem>
            ))}
          </MarqueeContent>
        </Marquee>
      </motion.div>
    </>
  );
}
