import { useVercount } from "vercount-react";
import CountUp from "@/components/react/CountUp";

export default function SiteCounter() {
  const { sitePv, siteUv } = useVercount();
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <p className="mx-auto my-0">
        Site Page Views: <CountUp to={Number(sitePv)} duration={1} />
      </p>
      <p className="mx-auto my-0">
        Unique Visitors: <CountUp to={Number(siteUv)} duration={1} />
      </p>
    </div>
  );
}
