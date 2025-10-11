"use client";

import { useEffect } from "react";

export function useRevealOnScroll(refs: Array<React.RefObject<HTMLElement>>) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up");
            entry.target.classList.remove("opacity-0", "translate-y-8");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    refs.forEach((ref) => {
      if (ref.current) {
        ref.current.classList.add("opacity-0", "translate-y-8", "transition-all", "duration-700");
        observer.observe(ref.current);
      }
    });

    return () => observer.disconnect();
  }, [refs]);
}
