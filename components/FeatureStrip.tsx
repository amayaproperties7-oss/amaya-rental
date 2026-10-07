"use client";

import { CheckCircle2, ShieldCheck, MapPin, Clock } from "lucide-react";

const BENEFITS = [
  {
    icon: CheckCircle2,
    title: "Mint-Condition Products",
    subtitle: "Quality-checked appliances & furniture sanitized for your home"
  },
  {
    icon: ShieldCheck,
    title: "Free Relocation & Upgrade",
    subtitle: "Moving cities or homes? We relocate and upgrade rentals for free"
  },
  {
    icon: MapPin,
    title: "Free Delivery & Installation",
    subtitle: "Hassle-free doorstep delivery and professional setup in 48-72h"
  },
  {
    icon: Clock,
    title: "Flexible Leases & Easy Returns",
    subtitle: "Rent from 3 to 24 months, pause or cancel anytime with zero penalty"
  }
];

export default function FeatureStrip() {
  return (
    <section className="w-full py-4 md:py-6">
      <div className="container-custom">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {BENEFITS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white border border-[#EAEAEA] rounded-xl p-4 md:p-5 flex items-start gap-3.5 hover:border-[#111111] transition-all duration-200 shadow-[0_2px_8px_rgba(0,0,0,0.02)]"
              >
                <div className="w-9 h-9 rounded-lg bg-[#F5F5F7] text-[#111111] flex items-center justify-center shrink-0 mt-0.5">
                  <Icon className="w-5 h-5 stroke-[2]" />
                </div>
                <div className="flex flex-col">
                  <h4 className="text-xs md:text-sm font-bold text-[#111111] leading-snug">
                    {item.title}
                  </h4>
                  <p className="text-[11px] md:text-xs text-[#666666] leading-relaxed mt-0.5">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
