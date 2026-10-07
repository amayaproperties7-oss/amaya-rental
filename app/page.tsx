"use client";

import CategoryNav from "@/components/CategoryNav";
import RentalStepsStrip from "@/components/RentalStepsStrip";
import TopCategoriesSection from "@/components/TopCategoriesSection";
import FeatureStrip from "@/components/FeatureStrip";
import WhyAmaya from "@/components/WhyAmaya";

export default function HomePage() {
  return (
    <div className="flex flex-col w-full bg-white text-[#111111] min-h-screen">
      {/* 1. Category Navigation (below header) */}
      <CategoryNav />

      {/* 2. 3-Step Rental Process Strip (Above Explore our Top Categories) */}
      <section className="w-full pt-6 pb-2">
        <div className="container-custom">
          <RentalStepsStrip className="w-full" />
        </div>
      </section>

      {/* 3. Top Rental Categories (15 categories grid + left showcase + product catalog) */}
      <TopCategoriesSection />

      {/* 4. Amenities Benefits Strip */}
      <FeatureStrip />

      {/* 5. Why Amaya Rental Amenities */}
      <WhyAmaya />
    </div>
  );
}
