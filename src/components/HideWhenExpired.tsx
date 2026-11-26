"use client";

import { useEffect, useState } from "react";
import { isExpired } from "@/lib/dates";

/**
 * Client-side fallback for auto-expiry. Pages already filter expired items
 * at build time; this hides anything that expired since the last build.
 */
export function HideWhenExpired({ expires, children }: { expires: string; children: React.ReactNode }) {
  const [expired, setExpired] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reading the clock must happen after hydration
    setExpired(isExpired({ expires }));
  }, [expires]);
  if (expired) return null;
  return <>{children}</>;
}
