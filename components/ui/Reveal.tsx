"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

/** One shared observer for the whole page, instead of framer-motion's
 *  per-element machinery. Costs about 1KB where framer-motion cost ~110KB. */
let observer: IntersectionObserver | null = null;
const callbacks = new WeakMap<Element, () => void>();

function observe(el: Element, onEnter: () => void) {
  if (typeof IntersectionObserver === "undefined") {
    onEnter();
    return () => {};
  }
  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          callbacks.get(entry.target)?.();
          observer?.unobserve(entry.target);
          callbacks.delete(entry.target);
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 }
    );
  }
  callbacks.set(el, onEnter);
  observer.observe(el);
  return () => {
    observer?.unobserve(el);
    callbacks.delete(el);
  };
}

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Milliseconds. Use for stagger inside a group. */
  delay?: number;
  /** "up" is the default lift; "left"/"right" mirror the old x-axis entrances. */
  from?: "up" | "left" | "right" | "scale";
  as?: ElementType;
};

export function Reveal({
  children,
  className = "",
  delay = 0,
  from = "up",
  as: Tag = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Respect the OS setting rather than animating regardless.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }
    return observe(el, () => setShown(true));
  }, []);

  return (
    <Tag
      ref={ref}
      data-reveal={from}
      data-shown={shown ? "true" : "false"}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={className}
    >
      {children}
    </Tag>
  );
}
