declare const gsap: typeof import("gsap");
declare const ScrollTrigger: typeof import("ScrollTrigger");

// global.d.ts
declare global {
  interface Window {
    gsap: any; // Declare gsap as any type
    ScrollTrigger: any; // Declare ScrollTrigger as any type
  }
}

export {}; // Make this file a module
