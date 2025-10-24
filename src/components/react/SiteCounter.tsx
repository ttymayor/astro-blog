import { useVercount } from "vercount-react";
import CountUp from "@/components/react/CountUp";
import { motion } from "motion/react";

export default function SiteCounter() {
  const { sitePv, siteUv } = useVercount();
  return (
    <motion.div
      className="flex flex-col items-center justify-center gap-2"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <p className="mx-auto my-0">
        Site Page Views: <CountUp to={Number(sitePv)} duration={1} />
      </p>
      <p className="mx-auto my-0">
        Unique Visitors: <CountUp to={Number(siteUv)} duration={1} />
      </p>
    </motion.div>
  );
}
