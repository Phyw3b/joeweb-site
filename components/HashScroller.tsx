"use client";

import { useEffect } from "react";

type HashScrollerProps = {
  targetId: string;
};

export default function HashScroller({ targetId }: HashScrollerProps) {
  useEffect(() => {
    if (window.location.hash !== `#${targetId}`) {
      return;
    }

    const scrollToTarget = () => {
      document.getElementById(targetId)?.scrollIntoView({
        block: "start",
        behavior: "smooth",
      });
    };

    scrollToTarget();
    const timers = [150, 450, 900].map((delay) =>
      window.setTimeout(scrollToTarget, delay)
    );

    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [targetId]);

  return null;
}
