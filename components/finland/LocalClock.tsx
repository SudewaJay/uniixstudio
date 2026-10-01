"use client";

import { useEffect, useState } from "react";

/**
 * Live HH:MM for a time zone. Renders an em dash on the server and on first
 * paint so markup never mismatches during hydration; the width is reserved
 * with tabular numerals so the swap causes no layout shift.
 */
export default function LocalClock({
  timeZone,
  className,
}: {
  timeZone: string;
  className?: string;
}) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone,
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    // Minute precision — a 15s tick is plenty and keeps the page idle.
    const id = setInterval(tick, 15_000);
    return () => clearInterval(id);
  }, [timeZone]);

  return (
    <time
      suppressHydrationWarning
      className={className}
      style={{ display: "inline-block", minWidth: "5ch", fontVariantNumeric: "tabular-nums" }}
    >
      {time || "—:—"}
    </time>
  );
}
