"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  ArrowUpRight, 
  ChevronDown, 
  ChevronUp, 
  Star, 
  ShieldCheck, 
  Truck, 
  Check, 
  Sparkles,
  ArrowRight,
  X
} from "lucide-react";
import { ALL_RENTAL_PRODUCTS, RentalProduct } from "@/data/rentalProducts";

export interface CategoryItem {
  id: string;
  title: string;
  image: string;
  query: string;
}

export const TOP_CATEGORIES: CategoryItem[] = [
  {
    id: "packages",
    title: "Packages",
    image: "/assets/images/categories/packages.jpg",
    query: "Packages"
  },
  {
    id: "water-purifiers",
    title: "Water Purifiers",
    image: "/assets/images/categories/water_purifiers.jpg",
    query: "Water Purifiers"
  },
  {
    id: "beds",
    title: "Beds",
    image: "/assets/images/categories/beds.jpg",
    query: "Beds"
  },
  {
    id: "sofas",
    title: "Sofas",
    image: "/assets/images/categories/sofas.jpg",
    query: "Sofas"
  },
  {
    id: "mattresses",
    title: "Mattresses",
    image: "/assets/images/categories/mattresses.jpg",
    query: "Mattresses"
  },
  {
    id: "wardrobe-organizer",
    title: "Wardrobe & Organizer",
    image: "/assets/images/categories/wardrobe.jpg",
    query: "Wardrobe & Organizer"
  },
  {
    id: "refrigerators-freezers",
    title: "Refrigerators & Freezers",
    image: "/assets/images/categories/refrigerators.jpg",
    query: "Refrigerators & Freezers"
  },
  {
    id: "televisions",
    title: "Televisions",
    image: "/assets/images/categories/televisions.jpg",
    query: "Televisions"
  },
  {
    id: "washing-machines",
    title: "Washing Machines",
    image: "/assets/images/categories/washing_machines.jpg",
    query: "Washing Machines"
  },
  {
    id: "air-conditioners",
    title: "Air Conditioners",
    image: "/assets/images/categories/air_conditioners.jpg",
    query: "Air Conditioners"
  },
  {
    id: "chairs-stools",
    title: "Chairs & Stools",
    image: "/assets/images/categories/chairs.jpg",
    query: "Chairs & Stools"
  },
  {
    id: "study-tables",
    title: "Study Tables",
    image: "/assets/images/categories/study_tables.jpg",
    query: "Study Tables"
  },
  {
    id: "center-tables",
    title: "Center Tables",
    image: "/assets/images/categories/center_tables.jpg",
    query: "Center Tables"
  },
  {
    id: "bedside-tables",
    title: "Bedside Tables",
    image: "/assets/images/categories/bedside_tables.jpg",
    query: "Bedside Tables"
  },
  {
    id: "chest-of-drawers",
    title: "Chest of Drawers",
    image: "/assets/images/categories/chest_of_drawers.jpg",
    query: "Chest of Drawers"
  }
];

export const MORE_CATEGORIES: CategoryItem[] = [
  {
    id: "dining-tables",
    title: "Dining Tables",
    image: "https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?q=80&w=600",
    query: "Dining Tables"
  },
  {
    id: "microwaves-ovens",
    title: "Microwaves & Ovens",
    image: "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?q=80&w=600",
    query: "Microwaves & Ovens"
  },
  {
    id: "fitness-exercise",
    title: "Fitness & Gym",
    image: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?q=80&w=600",
    query: "Fitness & Gym"
  },
  {
    id: "lamps-lighting",
    title: "Lamps & Lighting",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=600",
    query: "Lamps & Lighting"
  }
];

export default function TopCategoriesSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("packages");
  const [showMore, setShowMore] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<RentalProduct | null>(null);
  const [rentSuccessMessage, setRentSuccessMessage] = useState<string | null>(null);

  // Find active category item
  const allCategories = [...TOP_CATEGORIES, ...MORE_CATEGORIES];
  const activeCategoryObj = allCategories.find((c) => c.id === selectedCategory) || TOP_CATEGORIES[0];

  // Get matching products for selected category
  const matchingProducts = ALL_RENTAL_PRODUCTS.filter(
    (p) => p.categorySlug === selectedCategory || p.category === activeCategoryObj.title
  );

  const handleCategoryClick = (catId: string) => {
    setSelectedCategory(catId);
    // Smooth scroll down to products section if on mobile
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      const el = document.getElementById("category-products-anchor");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleRentNow = (product: RentalProduct) => {
    setRentSuccessMessage(`Booking inquiry initiated for ${product.title}! A leasing advisor will call you.`);
    setTimeout(() => {
      setRentSuccessMessage(null);
      setQuickViewProduct(null);
    }, 3000);
  };

  return (
    <section className="w-full py-8 md:py-14 bg-white" id="categories-section">
      <div className="container-custom">
        {/* Section Heading */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111111] tracking-tight">
              Explore <span className="text-[#111111] underline decoration-[#111111] decoration-2 underline-offset-8">our Top Categories</span>
            </h2>
            <span className="hidden sm:inline-block w-12 h-1 bg-[#111111] rounded-full mt-1" />
          </div>
          <span className="text-xs text-[#666666] hidden md:inline">
            Click any category to preview rental products
          </span>
        </div>

        {/* Top Split: Featured Left Promo + Right Categories Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-start">
          
          {/* LEFT: Featured Promo Banner Card */}
          <div className="lg:col-span-4 xl:col-span-3 w-full">
            <button
              onClick={() => handleCategoryClick("water-purifiers")}
              className="group relative block w-full h-[320px] sm:h-[400px] lg:h-[490px] rounded-3xl overflow-hidden bg-[#FAFAFA] border border-[#EAEAEA] hover:border-[#111111] shadow-sm hover:shadow-xl transition-all duration-300 text-left cursor-pointer"
            >
              {/* Main Lifestyle Image */}
              <Image
                src="/assets/images/categories/water_purifier_promo.jpg"
                alt="Amaya Water Purifiers & Home Amenities"
                fill
                priority
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                sizes="(max-width: 1024px) 100vw, 30vw"
              />

              {/* Gradient Vignette for Text Contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

              {/* Floating Action Badge Bottom-Left */}
              <div className="absolute bottom-5 left-5 right-5 pointer-events-none">
                <div className="inline-flex items-center justify-between w-full gap-3 bg-black/85 backdrop-blur-md text-white px-4 py-3 rounded-2xl border border-white/20 shadow-lg group-hover:bg-black transition-colors">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#AAAAAA] block">
                      EXPLORE
                    </span>
                    <span className="text-xs sm:text-sm font-extrabold tracking-tight text-white block">
                      WATER PURIFIERS
                    </span>
                  </div>
                  <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </button>
          </div>

          {/* RIGHT: 4-Column Category Cards Grid (All 15 Categories) */}
          <div className="lg:col-span-8 xl:col-span-9 flex flex-col justify-between">
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
              {TOP_CATEGORIES.map((cat) => {
                const isSelected = selectedCategory === cat.id;

                return (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryClick(cat.id)}
                    className={`group rounded-2xl p-3 sm:p-4 flex flex-col items-center justify-between text-center transition-all duration-200 cursor-pointer text-left bg-white ${
                      isSelected
                        ? "border-2 border-[#111111] shadow-md ring-2 ring-black/5 scale-[1.02]"
                        : "border border-[#ECECEC] hover:border-[#999999] shadow-[0_2px_6px_rgba(0,0,0,0.02)] hover:shadow-md"
                    }`}
                  >
                    {/* Category Image - Clean Studio Product */}
                    <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-white mb-2 flex items-center justify-center p-1">
                      <Image
                        src={cat.image}
                        alt={cat.title}
                        fill
                        className="object-contain p-1 group-hover:scale-108 transition-transform duration-300"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                      />
                    </div>

                    {/* Title & Active Dot */}
                    <div className="flex items-center justify-center gap-1.5 w-full">
                      {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#111111] shrink-0" />}
                      <span className={`text-xs sm:text-sm font-semibold leading-tight truncate ${
                        isSelected ? "text-[#111111] font-bold" : "text-[#222222] group-hover:text-black"
                      }`}>
                        {cat.title}
                      </span>
                    </div>
                  </button>
                );
              })}

              {/* Expanded More Categories */}
              {showMore && MORE_CATEGORIES.map((cat) => {
                const isSelected = selectedCategory === cat.id;

                return (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryClick(cat.id)}
                    className={`group rounded-2xl p-3 sm:p-4 flex flex-col items-center justify-between text-center transition-all duration-200 cursor-pointer text-left bg-white animate-in fade-in slide-in-from-top-2 duration-200 ${
                      isSelected
                        ? "border-2 border-[#111111] shadow-md ring-2 ring-black/5 scale-[1.02]"
                        : "border border-[#ECECEC] hover:border-[#999999] shadow-[0_2px_6px_rgba(0,0,0,0.02)] hover:shadow-md"
                    }`}
                  >
                    <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-white mb-2 flex items-center justify-center p-1">
                      <Image
                        src={cat.image}
                        alt={cat.title}
                        fill
                        className="object-contain p-1 group-hover:scale-108 transition-transform duration-300"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                      />
                    </div>
                    <div className="flex items-center justify-center gap-1.5 w-full">
                      {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#111111] shrink-0" />}
                      <span className={`text-xs sm:text-sm font-semibold leading-tight truncate ${
                        isSelected ? "text-[#111111] font-bold" : "text-[#222222] group-hover:text-black"
                      }`}>
                        {cat.title}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* View More / View Less Categories Button */}
            <div className="pt-6 flex items-center justify-start">
              <button
                onClick={() => setShowMore(!showMore)}
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#111111] hover:text-black transition-colors group py-1"
              >
                <span>{showMore ? "View Fewer categories" : "View More categories"}</span>
                {showMore ? (
                  <ChevronUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
                ) : (
                  <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                )}
              </button>
            </div>
          </div>

        </div>

        {/* DYNAMIC RELATED PRODUCTS SHOWCASE (When Category is pressed) */}
        <div id="category-products-anchor" className="mt-12 pt-8 border-t border-[#EAEAEA]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-[#111111]" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#666666]">
                  RENTAL PRODUCTS IN
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#111111] tracking-tight">
                {activeCategoryObj.title}
              </h3>
            </div>

            <Link
              href={`/listings?q=${encodeURIComponent(activeCategoryObj.title)}`}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#111111] hover:underline self-start sm:self-auto"
            >
              <span>View all {activeCategoryObj.title} in Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Notification on Booking */}
          {rentSuccessMessage && (
            <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-in fade-in duration-200">
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{rentSuccessMessage}</span>
            </div>
          )}

          {/* Products Grid for the Active Category */}
          {matchingProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {matchingProducts.map((prod) => (
                <div
                  key={prod.id}
                  className="bg-white border border-[#EAEAEA] hover:border-[#111111] rounded-2xl overflow-hidden p-4 flex flex-col justify-between shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-lg transition-all duration-300 group"
                >
                  <div>
                    {/* Product Image */}
                    <div className="relative aspect-[16/11] w-full rounded-xl overflow-hidden bg-white border border-[#F3F4F6] mb-3.5 flex items-center justify-center p-2">
                      <Image
                        src={prod.images[0]}
                        alt={prod.title}
                        fill
                        className="object-contain p-2 group-hover:scale-106 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                      {prod.tag && (
                        <div className="absolute top-2.5 left-2.5 bg-[#111111] text-white text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider">
                          {prod.tag}
                        </div>
                      )}
                    </div>

                    {/* Price and Rating Row */}
                    <div className="flex items-baseline justify-between mb-1">
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-lg font-extrabold text-[#111111] tracking-tight">
                          {prod.price}
                        </span>
                        {prod.originalPrice && (
                          <span className="text-xs text-[#999999] line-through font-normal">
                            {prod.originalPrice}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1 text-[11px] font-bold text-[#111111] bg-[#F5F5F7] px-1.5 py-0.5 rounded">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span>{prod.rating}</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h4 className="text-sm font-bold text-[#111111] line-clamp-1 mb-2 group-hover:text-black">
                      {prod.title}
                    </h4>

                    {/* Specs / Features snippet */}
                    <div className="space-y-1 mb-4 text-[11px] text-[#666666]">
                      <div className="flex items-center gap-1.5 truncate">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#111111] shrink-0" />
                        <span>Deposit: {prod.deposit} (Refundable)</span>
                      </div>
                      <div className="flex items-center gap-1.5 truncate">
                        <Truck className="w-3.5 h-3.5 text-[#111111] shrink-0" />
                        <span>{prod.delivery}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-3 border-t border-[#F0F0F0] flex gap-2">
                    <button
                      onClick={() => setQuickViewProduct(prod)}
                      className="flex-1 py-2 rounded-xl bg-[#F5F5F7] hover:bg-[#EEEEF0] text-xs font-bold text-[#111111] transition-colors"
                    >
                      Quick Specs
                    </button>
                    <button
                      onClick={() => handleRentNow(prod)}
                      className="flex-1 py-2 rounded-xl bg-[#111111] hover:bg-black text-xs font-bold text-white transition-colors"
                    >
                      Rent Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center border border-dashed border-[#EAEAEA] rounded-2xl bg-[#FAFAFA]">
              <Sparkles className="w-8 h-8 text-[#999999] mx-auto mb-2" />
              <p className="text-sm font-bold text-[#111111] mb-1">
                More {activeCategoryObj.title} products arriving soon!
              </p>
              <p className="text-xs text-[#666666] mb-4">
                Explore our ready packages or custom rental flats in the listings catalog.
              </p>
              <Link
                href={`/listings?q=${encodeURIComponent(activeCategoryObj.title)}`}
                className="px-5 py-2.5 bg-[#111111] text-white rounded-xl text-xs font-bold hover:bg-black transition-colors inline-block"
              >
                Browse Full Catalog
              </Link>
            </div>
          )}
        </div>

      </div>

      {/* QUICK VIEW PRODUCT MODAL */}
      {quickViewProduct && (
        <div 
          className="fixed inset-0 z-[120] bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setQuickViewProduct(null)}
        >
          <div 
            className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border border-[#EAEAEA] max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setQuickViewProduct(null)}
              className="absolute top-5 right-5 p-1 rounded-full text-[#666666] hover:text-black hover:bg-[#F5F5F7]"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Image */}
            <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-white border border-[#EAEAEA] mb-5 flex items-center justify-center p-4">
              <Image
                src={quickViewProduct.images[0]}
                alt={quickViewProduct.title}
                fill
                className="object-contain p-2"
              />
              <div className="absolute top-3 left-3 bg-[#111111] text-white text-[10px] font-bold px-2.5 py-1 rounded-md uppercase">
                {quickViewProduct.category}
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-2xl font-extrabold text-[#111111] tracking-tight">
                    {quickViewProduct.price}
                  </span>
                  <span className="text-xs text-[#666666] ml-2">Deposit: {quickViewProduct.deposit}</span>
                </div>
                <div className="flex items-center gap-1 text-xs font-bold bg-[#F5F5F7] px-2 py-1 rounded">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{quickViewProduct.rating} ({quickViewProduct.reviewsCount} reviews)</span>
                </div>
              </div>

              <h3 className="text-lg font-bold text-[#111111] leading-snug">
                {quickViewProduct.title}
              </h3>

              <p className="text-xs text-[#555555] leading-relaxed">
                {quickViewProduct.description}
              </p>

              {/* Specifications */}
              <div className="bg-[#FAFAFA] border border-[#EAEAEA] rounded-xl p-3.5 space-y-1.5 text-xs">
                <span className="font-bold text-[#111111] block text-[11px] uppercase tracking-wider mb-1">
                  Product Specifications:
                </span>
                {quickViewProduct.specs.map((s, idx) => (
                  <div key={idx} className="flex justify-between py-0.5 border-b border-[#F0F0F0] last:border-none text-[11px]">
                    <span className="text-[#777777]">{s.label}</span>
                    <span className="font-medium text-[#111111] text-right">{s.value}</span>
                  </div>
                ))}
              </div>

              {/* Perks */}
              <div className="grid grid-cols-2 gap-2 pt-1 text-[11px] font-semibold text-[#333333]">
                {quickViewProduct.features.map((f, idx) => (
                  <div key={idx} className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-black shrink-0" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="pt-4 flex gap-3">
                <button
                  onClick={() => setQuickViewProduct(null)}
                  className="flex-1 py-3 rounded-xl bg-[#F5F5F7] text-xs font-bold text-[#666666] hover:text-[#111111]"
                >
                  Close
                </button>
                <button
                  onClick={() => handleRentNow(quickViewProduct)}
                  className="flex-1 py-3 rounded-xl bg-[#111111] hover:bg-black text-white text-xs font-bold transition-all shadow-sm"
                >
                  Confirm Rental Inquiry
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
