"use client";

import {
  RelativeTime,
  RelativeTimeZone,
  RelativeTimeZoneDisplay,
  RelativeTimeZoneLabel,
} from "@/components/ui/shadcn-io/relative-time";

export default function TaiwanTime() {
  return (
    <div className="flex items-center gap-2">
      <RelativeTime dateFormatOptions={{ dateStyle: "short" }}>
        <RelativeTimeZone zone={"Asia/Taipei"}>
          <RelativeTimeZoneLabel className="text-sm font-medium">
            TPE
          </RelativeTimeZoneLabel>
          <RelativeTimeZoneDisplay className="pl-0 text-sm font-medium" />
        </RelativeTimeZone>
      </RelativeTime>
    </div>
  );
}
