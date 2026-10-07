"use client";

import { Sparkles, ShieldCheck, MapPin, Headphones, ArrowRight } from "lucide-react";
import Link from "next/link";

const WHY_FEATURES = [
  {
    icon: Sparkles,
    title: "Premium Property Selection",
    description: "Every home is physically inspected for architectural standards, premium fittings, high ventilation, and turnkey move-in condition."
  },
  {
    icon: ShieldCheck,
    title: "Transparent Information",
    description: "Clear and upfront rental pricing, zero hidden brokerage fees, and 100% verified ownership credentials on all properties."
  },
  {
    icon: MapPin,
    title: "Prime Locations",
    description: "Homes situated in premier residential belts across Visakhapatnam, Mumbai, and top metropolitan centers near essential amenities."
  },
  {
    icon: Headphones,
    title: "Personalized Assistance",
    description: "Dedicated Amaya property concierges manage schedule tours, legal lease drafting, key handover, and ongoing resident support."
  }
];

export default function WhyAmaya() {
  return (
    <section className="w-full py-12 md:py-20 bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5F5F7] border border-[#EAEAEA] text-[#111111] text-[10px] font-bold tracking-[0.2em] uppercase mb-3">
            AMAYA ADVANTAGE
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#111111] tracking-tight">
            WHY CHOOSE AMAYA?
          </h2>
          <p className="text-xs sm:text-sm text-[#666666] mt-2 leading-relaxed">
            We are redefining residential rental leasing with unmatched transparency, insured contracts, and a refined hospitality approach.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {WHY_FEATURES.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="bg-white border border-[#EAEAEA] hover:border-[#111111] rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-200 shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-md group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#F5F5F7] group-hover:bg-[#111111] text-[#111111] group-hover:text-white flex items-center justify-center mb-5 transition-colors duration-200">
                    <Icon className="w-6 h-6 stroke-[1.75]" />
                  </div>
                  <h3 className="text-base font-bold text-[#111111] mb-2 leading-snug">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-[#666666] leading-relaxed">
                    {feat.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#F0F0F0] flex items-center gap-1 text-[11px] font-bold text-[#111111]">
                  <span>Verified Standard</span>
                  <span className="text-[#AAAAAA]">•</span>
                  <span className="text-[#666666]">100% Quality Guaranteed</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Bar */}
        <div className="mt-12 p-6 md:p-8 rounded-2xl bg-[#F9FAFB] border border-[#EAEAEA] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="text-base sm:text-lg font-bold text-[#111111]">
              Ready to find your next home?
            </h4>
            <p className="text-xs text-[#666666] mt-0.5">
              Speak with an Amaya rental advisor or schedule a private property walkthrough.
            </p>
          </div>
          <Link
            href="/listings"
            className="px-6 py-3 rounded-xl bg-[#111111] text-white text-xs font-bold hover:bg-black transition-colors shrink-0 flex items-center gap-2"
          >
            <span>Browse All Available Flats</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
