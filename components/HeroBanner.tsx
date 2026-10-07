"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShieldCheck, MapPin, Sparkles } from "lucide-react";

export default function HeroBanner() {
  return (
    <section className="w-full pt-6 md:pt-8 pb-4">
      <div className="container-custom">
        <div className="w-full bg-[#FAFAFA] border border-[#EAEAEA] rounded-2xl md:rounded-3xl p-6 md:p-10 lg:p-12 shadow-[0_4px_24px_rgba(0,0,0,0.03)] overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* LEFT COLUMN: Content */}
            <div className="lg:col-span-6 xl:col-span-7 flex flex-col items-start space-y-5 md:space-y-6">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#EAEAEA] text-[#111111] shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#111111]" />
                <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase">
                  PREMIUM RENTAL LIVING
                </span>
              </div>

              {/* Large Heading */}
              <h1 className="text-[32px] sm:text-[40px] md:text-[48px] lg:text-[54px] font-extrabold tracking-tight text-[#111111] leading-[1.12]">
                Find a Home You&apos;ll Love.<br className="hidden sm:inline" />
                <span className="text-[#333333]">Live the Way You Want.</span>
              </h1>

              {/* Supporting Text */}
              <p className="text-sm md:text-base text-[#555555] max-w-xl leading-relaxed">
                Discover thoughtfully selected apartments, flats and luxury rental homes designed around your lifestyle in Visakhapatnam, Mumbai, and top Indian metros.
              </p>

              {/* Feature Highlights Line */}
              <div className="flex flex-wrap items-center gap-y-2 gap-x-3 text-xs md:text-sm font-medium text-[#444444] pt-1">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#111111]" /> Verified Properties
                </span>
                <span className="text-[#CCCCCC]">•</span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#111111]" /> Premium Locations
                </span>
                <span className="text-[#CCCCCC]">•</span>
                <span>Easy Rental Experience</span>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2 w-full sm:w-auto">
                <Link
                  href="/listings"
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-[#111111] text-white text-xs md:text-sm font-bold tracking-wide hover:bg-black transition-all shadow-sm group"
                >
                  <span>EXPLORE RENTAL HOMES</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="/listings"
                  className="inline-flex items-center justify-center px-7 py-3.5 rounded-xl bg-white text-[#111111] border border-[#111111] text-xs md:text-sm font-bold tracking-wide hover:bg-[#F5F5F7] transition-all"
                >
                  VIEW PREMIUM PROPERTIES
                </Link>
              </div>
            </div>

            {/* RIGHT COLUMN: Premium Residential Interior Image */}
            <div className="lg:col-span-6 xl:col-span-5 relative w-full">
              <div className="relative aspect-[16/11] sm:aspect-[16/10] lg:aspect-[4/3] w-full rounded-2xl overflow-hidden border border-[#EAEAEA] bg-white shadow-sm">
                <Image
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600"
                  alt="Amaya Luxury Rental Apartment Interior"
                  fill
                  priority
                  className="object-cover hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />

                {/* Subtle Gradient Shadow Overlay for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />

                {/* Floating Price Card */}
                <div className="absolute top-4 right-4 sm:top-5 sm:right-5 bg-white/95 backdrop-blur-md border border-[#EAEAEA] rounded-xl px-4 py-2.5 shadow-lg flex flex-col items-end">
                  <span className="text-[10px] uppercase font-semibold text-[#666666] tracking-wider">
                    Starts from
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl sm:text-2xl font-black text-[#111111] tracking-tight">
                      ₹35,000
                    </span>
                    <span className="text-xs text-[#666666] font-medium">/mo</span>
                  </div>
                  <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded mt-0.5">
                    Verified Lease
                  </span>
                </div>

                {/* Floating Bottom Badge */}
                <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-md text-white text-[11px] font-medium px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 shadow-md">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse" />
                  <span>Immediate Move-In Available</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
