"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ParallaxLayer } from "./ParallaxLayer";
import Link from "next/link";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Hero3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current || !titleRef.current) return;

      // Initial reveal
      gsap.fromTo(
        titleRef.current.children,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.15,
          ease: "power3.out",
        }
      );

      // Sticky title logic
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        pin: titleRef.current,
        pinSpacing: false,
      });

      // Zoom effect on the main visual
      gsap.to(".hero-zoom", {
        scale: 1.2,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section 
      ref={containerRef} 
      className="relative h-[220vh] w-full bg-background overflow-hidden"
    >
      {/* Background Layer (Deep Parallax) */}
      <ParallaxLayer speed={120} className="absolute inset-0 z-0">
        <div className="relative h-screen w-full opacity-40 blur-sm">
          <Image
            src="/assets/images/rental-hero-night.png"
            alt="Luxury Rental Residences Skyline"
            fill
            className="object-cover"
            priority
          />
        </div>
      </ParallaxLayer>

      {/* Midground Layer (Main Image) */}
      <ParallaxLayer speed={60} className="absolute inset-0 z-10 flex items-center justify-center">
        <div className="relative h-[80vh] w-[92%] md:w-[75%] hero-zoom overflow-hidden rounded-sm shadow-2xl border border-white/10">
          <Image
            src="/assets/images/rental-hero-podium.png"
            alt="Amaya Luxury Rental Flats"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
        </div>
      </ParallaxLayer>

      {/* Sticky Content */}
      <div 
        ref={titleRef} 
        className="absolute inset-0 z-20 flex flex-col items-center justify-start pt-[10vh] md:pt-[15vh] pointer-events-none w-full"
      >
        <div className="flex flex-col items-center justify-center text-center px-4 w-full">
          <h1 className="text-4xl md:text-8xl font-serif font-light mb-4 tracking-tighter text-center leading-none">
            <span className="block overflow-hidden">
              <span className="inline-block">AMAYA</span>
            </span>
            <span className="block overflow-hidden text-gold text-3xl md:text-6xl mt-2 tracking-normal">
              <span className="inline-block">RENTAL AMENITIES</span>
            </span>
          </h1>
          <p className="text-[10px] md:text-lg tracking-[0.3em] font-light text-white/60 uppercase text-center mb-10 max-w-[90%] flex flex-wrap items-center justify-center gap-y-2 gap-x-4">
            <span className="text-gold font-bold">India&apos;s First Insured Rental Flats</span>
            <span className="hidden md:inline text-white/20">•</span>
            <span>Curated Luxury Flats & Penthouses For Rent</span>
          </p>
          <Link href="/listings" className="pointer-events-auto px-8 md:px-10 py-3 md:py-4 bg-white/5 backdrop-blur-sm border border-white/20 text-white text-[10px] font-bold tracking-[0.4em] hover:bg-gold hover:border-gold hover:text-black transition-all">
            EXPLORE RENTAL FLATS
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-4 opacity-50">
        <div className="w-[1px] h-20 bg-gradient-to-b from-transparent via-gold to-transparent animate-pulse-slow" />
        <span className="text-[10px] tracking-[0.5em] uppercase">Scroll</span>
      </div>
    </section>
  );
}
