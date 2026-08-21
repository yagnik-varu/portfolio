import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { Flip } from "gsap/Flip";

if (typeof window !== "undefined") {
  const globalWindow = window as unknown as { __gsapRegistered?: boolean };

  if (!globalWindow.__gsapRegistered) {
    gsap.registerPlugin(ScrollTrigger, SplitText, Flip);
    globalWindow.__gsapRegistered = true;
  }
}

export { gsap, ScrollTrigger, SplitText, Flip };
