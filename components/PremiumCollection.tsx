"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

const PREMIUM_COLLECTIONS = [
  {
    title: "Luxury Apartments",
    tagline: "Architectural residences in the city's most coveted pin codes",
    price: "From ₹65,000 / month",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200",
    query: "Luxury",
    colSpan: "lg:col-span-7"
  },
  {
    title: "Penthouse Living",
    tagline: "Duplex rooftop sanctuaries with private plunge pools and terraces",
    price: "From ₹1,25,000 / month",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200",
    query: "Penthouse",
    colSpan: "lg:col-span-5"
  },
  {
    title: "Sea View Homes",
    tagline: "Unobstructed coastal panoramas along the beachfront promenade",
    price: "From ₹80,000 / month",
    image: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?q=80&w=1200",
    query: "Sea View",
    colSpan: "lg:col-span-4"
  },
  {
    title: "Fully Furnished Homes",
    tagline: "Turnkey residences with European designer furnishings and appliances",
    price: "From ₹55,000 / month",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200",
    query: "Furnished",
    colSpan: "lg:col-span-4"
  },
  {
    title: "Corporate Rentals",
    tagline: "Expedited executive leasing with corporate billing and housekeeping",
    price: "From ₹95,000 / month",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200",
    query: "Corporate",
    colSpan: "lg:col-span-4"
  }
];

export default function PremiumCollection() {
  return (
    <section className="w-full py-8 md:py-16 bg-[#F9FAFB] border-y border-[#EAEAEA]">
      <div className="container-custom">
        {/* Section Header */}
        <div className="max-w-2xl mb-8 md:mb-12">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-[#111111]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#666666]">
              CURATED TIERS
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#111111] tracking-tight">
            PREMIUM RENTAL COLLECTION
          </h2>
          <p className="text-xs sm:text-sm text-[#666666] mt-2 leading-relaxed">
            Curated homes for elevated everyday living. Each collection represents the pinnacle of craftsmanship, privacy, and contemporary rental hospitality.
          </p>
        </div>

        {/* Large Property Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 md:gap-6">
          {PREMIUM_COLLECTIONS.map((item, idx) => (
            <Link
              key={idx}
              href={`/listings?q=${encodeURIComponent(item.query)}`}
              className={`group relative rounded-2xl overflow-hidden border border-[#EAEAEA] bg-white shadow-sm hover:shadow-xl transition-all duration-300 min-h-[300px] md:min-h-[360px] flex flex-col justify-end p-6 md:p-8 ${item.colSpan}`}
            >
              {/* Background Image */}
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                sizes="(max-width: 768px) 100vw, 50vw"
              />

              {/* Gradient Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent transition-opacity duration-300 group-hover:from-black/90" />

              {/* Price Pill Top Right */}
              <div className="absolute top-5 right-5 bg-white/90 backdrop-blur-md text-[#111111] text-[11px] font-bold px-3 py-1.5 rounded-full border border-white/40 shadow-sm">
                {item.price}
              </div>

              {/* Bottom Content */}
              <div className="relative z-10 space-y-1.5 text-white">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-white/95">
                    {item.title}
                  </h3>
                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-all">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-white/80 max-w-md leading-relaxed">
                  {item.tagline}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
