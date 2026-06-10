import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "../lib/gsap";

export function useSmoothScroll() {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReduced) {
      const prevDefaults = { ...gsap.defaults() };
      gsap.defaults({ duration: 0 });
      return () => gsap.defaults(prevDefaults);
    }

    const lenis = new Lenis();

    lenis.on("scroll", ScrollTrigger.update);

    const tickerFn = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tickerFn);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerFn);
      lenis.destroy();
      gsap.ticker.lagSmoothing(500, 33);
    };
  }, []);
}
