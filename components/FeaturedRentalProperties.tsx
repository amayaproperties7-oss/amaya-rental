"use client";

import Link from "next/link";
import Image from "next/image";
import { useProperties } from "@/context/PropertyContext";
import { useSavedProperties } from "@/context/SavedPropertiesContext";
import { Heart, MapPin, ShieldCheck, ArrowRight, Home } from "lucide-react";

export default function FeaturedRentalProperties() {
  const { properties } = useProperties();
  const { isPropertySaved, toggleSaveProperty } = useSavedProperties();

  // Show up to 8 featured properties
  const displayProperties = properties.slice(0, 8);

  return (
    <section className="w-full py-8 md:py-14 bg-white">
      <div className="container-custom">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#111111]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#666666]">
                HANDPICKED RESIDENCES
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#111111] tracking-tight">
              Featured Rental Properties
            </h2>
            <p className="text-xs sm:text-sm text-[#666666] mt-1.5 max-w-xl">
              Thoroughly verified apartments and luxury homes with zero hidden brokerage and transparent lease agreements.
            </p>
          </div>

          <Link
            href="/listings"
            className="group inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#111111] hover:text-black transition-colors self-start sm:self-auto"
          >
            <span>Explore All Rentals</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Responsive CSS Grid (minmax) */}
        <div 
          className="grid gap-5 md:gap-6"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))"
          }}
        >
          {displayProperties.map((prop) => {
            const isSaved = isPropertySaved(prop.id);
            const imageSrc = prop.images && prop.images.length > 0 
              ? prop.images[0] 
              : "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800";

            return (
              <div
                key={prop.id}
                className="group bg-white border border-[#EAEAEA] hover:border-[#111111] rounded-2xl overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:shadow-lg transition-all duration-300 flex flex-col"
              >
                {/* Image Container */}
                <div className="relative aspect-[16/11] w-full overflow-hidden bg-[#F5F5F7]">
                  <Link href={`/property/${prop.id}`} className="block w-full h-full">
                    <Image
                      src={imageSrc}
                      alt={prop.projectName}
                      fill
                      className="object-cover group-hover:scale-106 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  </Link>

                  {/* Insured / Verified Badge */}
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md border border-[#EAEAEA] text-[#111111] text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-xs pointer-events-none">
                    <ShieldCheck className="w-3 h-3 text-[#111111]" />
                    <span>Verified Rental</span>
                  </div>

                  {/* Heart / Wishlist Toggle */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleSaveProperty(prop.id);
                    }}
                    aria-label={isSaved ? "Remove from wishlist" : "Add to wishlist"}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/95 backdrop-blur-md border border-[#EAEAEA] flex items-center justify-center text-[#111111] hover:scale-110 active:scale-95 transition-all shadow-xs"
                  >
                    <Heart
                      className={`w-4 h-4 transition-colors ${
                        isSaved ? "fill-black text-black" : "text-[#555555]"
                      }`}
                    />
                  </button>
                </div>

                {/* Content Container */}
                <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between">
                  <div className="space-y-2">
                    {/* Price */}
                    <div className="flex items-baseline justify-between">
                      <div className="text-lg sm:text-xl font-extrabold text-[#111111] tracking-tight">
                        {prop.price.includes("/ mo") || prop.price.includes("/ month") 
                          ? prop.price 
                          : `${prop.price}/month`}
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#666666] bg-[#F5F5F7] px-2 py-0.5 rounded">
                        {prop.projectStatus || "Immediate"}
                      </span>
                    </div>

                    {/* Title */}
                    <Link href={`/property/${prop.id}`}>
                      <h3 className="text-sm sm:text-base font-bold text-[#111111] group-hover:text-black line-clamp-1 transition-colors">
                        {prop.projectName}
                      </h3>
                    </Link>

                    {/* Location */}
                    <div className="flex items-center gap-1.5 text-xs text-[#666666]">
                      <MapPin className="w-3.5 h-3.5 text-[#111111] shrink-0" />
                      <span className="truncate">{prop.location}</span>
                    </div>

                    {/* Details row: BHK • Area • Furnishing */}
                    <div className="pt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] font-medium text-[#555555]">
                      <span>{prop.bhkType}</span>
                      <span className="text-[#CCCCCC]">•</span>
                      <span>{prop.area || "2,100 sq.ft"}</span>
                      <span className="text-[#CCCCCC]">•</span>
                      <span>{prop.furnishing || "Furnished"}</span>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div className="pt-4 mt-2 border-t border-[#F0F0F0]">
                    <Link
                      href={`/property/${prop.id}`}
                      className="w-full py-2.5 px-4 rounded-xl bg-[#111111] hover:bg-black text-white text-xs font-bold tracking-wide transition-colors flex items-center justify-center gap-1.5"
                    >
                      <span>VIEW PROPERTY</span>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
