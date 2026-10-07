"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export const POPULAR_RENTAL_CATEGORIES = [
  {
    title: "Luxury Apartments",
    price: "From ₹45,000/mo",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=800",
    slug: "Luxury Apartments"
  },
  {
    title: "Furnished Flats",
    price: "From ₹35,000/mo",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=800",
    slug: "Furnished"
  },
  {
    title: "Premium Penthouses",
    price: "From ₹85,000/mo",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800",
    slug: "Penthouse"
  },
  {
    title: "Family Homes",
    price: "From ₹30,000/mo",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800",
    slug: "Family Homes"
  },
  {
    title: "Studio Apartments",
    price: "From ₹18,000/mo",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=800",
    slug: "Studio"
  },
  {
    title: "Serviced Flats",
    price: "From ₹42,000/mo",
    image: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=800",
    slug: "Serviced"
  },
  {
    title: "Sea View Homes",
    price: "From ₹65,000/mo",
    image: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?q=80&w=800",
    slug: "Sea View"
  },
  {
    title: "Gated Villas",
    price: "From ₹55,000/mo",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=800",
    slug: "Villa"
  }
];

export default function PopularCategories() {
  return (
    <section className="w-full py-8 md:py-12">
      <div className="container-custom">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <div>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-extrabold text-[#111111] tracking-tight">
              Explore Our Most Popular Categories
            </h2>
            <p className="text-xs md:text-sm text-[#666666] mt-1">
              Find verified rental spaces tailored for every lifestyle requirement
            </p>
          </div>
          <Link
            href="/listings"
            className="group flex items-center gap-1 text-xs md:text-sm font-bold text-[#111111] hover:text-black transition-colors shrink-0"
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-3.5 sm:gap-4">
          {POPULAR_RENTAL_CATEGORIES.map((cat, idx) => (
            <Link
              key={idx}
              href={`/listings?q=${encodeURIComponent(cat.slug)}`}
              className="group bg-[#FAFAFA] hover:bg-white border border-[#EAEAEA] hover:border-[#111111] rounded-2xl p-3 flex flex-col items-center text-center transition-all duration-200 shadow-[0_2px_6px_rgba(0,0,0,0.02)] hover:shadow-md"
            >
              {/* Image Container */}
              <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-white mb-3">
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  className="object-cover group-hover:scale-108 transition-transform duration-300"
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 12vw"
                />
              </div>

              {/* Title & Price */}
              <h3 className="text-xs md:text-sm font-bold text-[#111111] leading-tight truncate w-full group-hover:text-black">
                {cat.title}
              </h3>
              <p className="text-[11px] text-[#666666] mt-0.5 font-medium">
                {cat.price}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
