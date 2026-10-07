"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useProperties } from "@/context/PropertyContext";
import { useSavedProperties } from "@/context/SavedPropertiesContext";
import { ALL_RENTAL_PRODUCTS, RentalProduct } from "@/data/rentalProducts";
import Image from "next/image";
import Link from "next/link";
import { 
  Search, 
  Filter, 
  ArrowLeft, 
  X, 
  MapPin, 
  ShieldCheck, 
  Heart, 
  Home, 
  Star, 
  Truck, 
  Check, 
  Sparkles,
  Layers
} from "lucide-react";
import CategoryNav from "@/components/CategoryNav";

const FLAT_TYPES = ["ALL", "1 BHK", "2 BHK", "3 BHK", "4 BHK", "Penthouse"];
const REGIONS = ["ALL", "VISAKHAPATNAM", "SOUTH MUMBAI", "WESTERN MUMBAI", "CENTRAL MUMBAI"];

function ListingsContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const initialType = searchParams.get("type") || "";

  const { properties } = useProperties();
  const { isPropertySaved, toggleSaveProperty } = useSavedProperties();

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedRegion, setSelectedRegion] = useState("ALL");
  const [selectedFlatType, setSelectedFlatType] = useState(
    initialType && FLAT_TYPES.includes(initialType) ? initialType : "ALL"
  );
  const [activeTab, setActiveTab] = useState<"all" | "products" | "properties">("all");
  const [selectedProduct, setSelectedProduct] = useState<RentalProduct | null>(null);
  const [rentNotification, setRentNotification] = useState<string | null>(null);

  useEffect(() => {
    if (initialQuery) {
      setSearchQuery(initialQuery);
    }
  }, [initialQuery]);

  useEffect(() => {
    if (initialType && FLAT_TYPES.includes(initialType)) {
      setSelectedFlatType(initialType);
    }
  }, [initialType]);

  // Filter properties
  const filteredProperties = useMemo(() => {
    return properties.filter((prop) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        prop.projectName.toLowerCase().includes(q) ||
        prop.location.toLowerCase().includes(q) ||
        (prop.region && prop.region.toLowerCase().includes(q)) ||
        (prop.bhkType && prop.bhkType.toLowerCase().includes(q)) ||
        (prop.description && prop.description.toLowerCase().includes(q));

      const matchesRegion =
        selectedRegion === "ALL" ||
        (prop.region && prop.region.toUpperCase() === selectedRegion.toUpperCase());

      const matchesFlatType =
        selectedFlatType === "ALL" ||
        (prop.bhkType && prop.bhkType.toLowerCase().includes(selectedFlatType.toLowerCase()));

      return matchesSearch && matchesRegion && matchesFlatType;
    });
  }, [properties, searchQuery, selectedRegion, selectedFlatType]);

  // Filter products
  const filteredProducts = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return ALL_RENTAL_PRODUCTS;

    return ALL_RENTAL_PRODUCTS.filter((prod) => {
      return (
        prod.title.toLowerCase().includes(q) ||
        prod.category.toLowerCase().includes(q) ||
        prod.categorySlug.toLowerCase().includes(q) ||
        prod.description.toLowerCase().includes(q) ||
        prod.features.some((f) => f.toLowerCase().includes(q))
      );
    });
  }, [searchQuery]);

  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedRegion("ALL");
    setSelectedFlatType("ALL");
  };

  const handleProductRent = (prod: RentalProduct) => {
    setRentNotification(`Rental request placed for "${prod.title}"! We will contact you for delivery scheduling.`);
    setTimeout(() => {
      setRentNotification(null);
      setSelectedProduct(null);
    }, 3500);
  };

  const showProductsSection = (activeTab === "all" || activeTab === "products") && filteredProducts.length > 0;
  const showPropertiesSection = (activeTab === "all" || activeTab === "properties") && filteredProperties.length > 0;

  return (
    <div className="w-full bg-white text-[#111111] pb-24">
      {/* Category sub-navigation */}
      <CategoryNav />

      <div className="container-custom pt-6 md:pt-10">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#666666] hover:text-[#111111] mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-[#EAEAEA]">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5F5F7] border border-[#EAEAEA] text-[10px] font-bold tracking-[0.2em] uppercase text-[#111111]">
              RENTAL MARKETPLACE
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#111111] tracking-tight">
              {searchQuery ? `Results for "${searchQuery}"` : "Explore All Rental Amenities & Homes"}
            </h1>
            <p className="text-xs sm:text-sm text-[#666666] max-w-xl">
              Browse verified furniture packages, essential appliances, and luxury residences available across Visakhapatnam & Mumbai.
            </p>
          </div>

          {/* Search Box */}
          <div className="w-full lg:w-96 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#777777]" />
            <input
              type="text"
              placeholder="Search sofa, bed, water purifier, 2 BHK..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#F5F5F7] border border-[#EAEAEA] focus:border-[#111111] focus:bg-white pl-11 pr-10 py-3 rounded-xl text-xs text-[#111111] outline-none transition-all shadow-xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#777777] hover:text-black"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Tab Switcher: All / Products / Properties */}
        <div className="flex items-center gap-3 pt-6 pb-2 border-b border-[#F0F0F0]">
          <button
            onClick={() => setActiveTab("all")}
            className={`pb-2.5 text-xs font-bold transition-all relative ${
              activeTab === "all" ? "text-[#111111]" : "text-[#777777] hover:text-[#111111]"
            }`}
          >
            <span>All Results ({filteredProducts.length + filteredProperties.length})</span>
            {activeTab === "all" && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#111111]" />}
          </button>

          <button
            onClick={() => setActiveTab("products")}
            className={`pb-2.5 text-xs font-bold transition-all relative ${
              activeTab === "products" ? "text-[#111111]" : "text-[#777777] hover:text-[#111111]"
            }`}
          >
            <span>Furniture & Appliances ({filteredProducts.length})</span>
            {activeTab === "products" && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#111111]" />}
          </button>

          <button
            onClick={() => setActiveTab("properties")}
            className={`pb-2.5 text-xs font-bold transition-all relative ${
              activeTab === "properties" ? "text-[#111111]" : "text-[#777777] hover:text-[#111111]"
            }`}
          >
            <span>Flats & Residences ({filteredProperties.length})</span>
            {activeTab === "properties" && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#111111]" />}
          </button>
        </div>

        {/* Notification Alert */}
        {rentNotification && (
          <div className="my-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-in fade-in duration-200">
            <Check className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{rentNotification}</span>
          </div>
        )}

        {/* SECTION 1: FURNITURE & APPLIANCES PRODUCTS */}
        {showProductsSection && (
          <div className="py-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#777777] block">
                  AMENITIES CATALOG
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#111111] tracking-tight">
                  Rental Appliances & Furniture Products
                </h2>
              </div>
              <span className="text-xs font-bold text-[#666666]">
                {filteredProducts.length} items available
              </span>
            </div>

            <div 
              className="grid gap-5 md:gap-6"
              style={{ gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))" }}
            >
              {filteredProducts.map((prod) => (
                <div
                  key={prod.id}
                  className="bg-white border border-[#EAEAEA] hover:border-[#111111] rounded-2xl overflow-hidden p-4 flex flex-col justify-between shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-lg transition-all duration-300 group"
                >
                  <div>
                    {/* Image */}
                    <div className="relative aspect-[16/11] w-full rounded-xl overflow-hidden bg-[#F5F5F7] mb-3.5">
                      <Image
                        src={prod.images[0]}
                        alt={prod.title}
                        fill
                        className="object-cover group-hover:scale-106 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                      {prod.tag && (
                        <div className="absolute top-2.5 left-2.5 bg-[#111111] text-white text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider">
                          {prod.tag}
                        </div>
                      )}
                    </div>

                    {/* Price and Rating */}
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
                    <h3 className="text-sm font-bold text-[#111111] line-clamp-1 mb-2 group-hover:text-black">
                      {prod.title}
                    </h3>

                    {/* Specs / Details */}
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
                      onClick={() => setSelectedProduct(prod)}
                      className="flex-1 py-2 rounded-xl bg-[#F5F5F7] hover:bg-[#EEEEF0] text-xs font-bold text-[#111111] transition-colors"
                    >
                      Quick Specs
                    </button>
                    <button
                      onClick={() => handleProductRent(prod)}
                      className="flex-1 py-2 rounded-xl bg-[#111111] hover:bg-black text-xs font-bold text-white transition-colors"
                    >
                      Rent Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 2: FLATS & RESIDENCES */}
        {showPropertiesSection && (
          <div className="py-8 border-t border-[#EAEAEA]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#777777] block">
                  RESIDENTIAL LEASING
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#111111] tracking-tight">
                  Available Flats & Luxury Apartments
                </h2>
              </div>
              <span className="text-xs font-bold text-[#666666]">
                {filteredProperties.length} residences found
              </span>
            </div>

            {/* Flat Type Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-4 mb-2">
              {FLAT_TYPES.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedFlatType(type)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all border ${
                    selectedFlatType === type
                      ? "bg-[#111111] text-white border-[#111111]"
                      : "bg-[#FAFAFA] text-[#555555] border-[#EAEAEA] hover:border-[#CCCCCC]"
                  }`}
                >
                  {type === "ALL" ? "All Flats" : type}
                </button>
              ))}
            </div>

            {/* Properties Grid */}
            <div 
              className="grid gap-6"
              style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}
            >
              {filteredProperties.map((prop) => {
                const isSaved = isPropertySaved(prop.id);
                const imageSrc =
                  prop.images && prop.images.length > 0
                    ? prop.images[0]
                    : "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800";

                return (
                  <div
                    key={prop.id}
                    className="group bg-white border border-[#EAEAEA] hover:border-[#111111] rounded-2xl overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:shadow-lg transition-all duration-300 flex flex-col"
                  >
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

                      <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md border border-[#EAEAEA] text-[#111111] text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-xs pointer-events-none">
                        <ShieldCheck className="w-3 h-3 text-[#111111]" />
                        <span>Verified Flat</span>
                      </div>

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

                    <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between">
                      <div className="space-y-2">
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

                        <Link href={`/property/${prop.id}`}>
                          <h3 className="text-sm sm:text-base font-bold text-[#111111] group-hover:text-black line-clamp-1 transition-colors">
                            {prop.projectName}
                          </h3>
                        </Link>

                        <div className="flex items-center gap-1.5 text-xs text-[#666666]">
                          <MapPin className="w-3.5 h-3.5 text-[#111111] shrink-0" />
                          <span className="truncate">{prop.location}</span>
                        </div>

                        <div className="pt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] font-medium text-[#555555]">
                          <span>{prop.bhkType}</span>
                          <span className="text-[#CCCCCC]">•</span>
                          <span>{prop.area || "2,100 sq.ft"}</span>
                          <span className="text-[#CCCCCC]">•</span>
                          <span>{prop.furnishing || "Furnished"}</span>
                        </div>
                      </div>

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
        )}

        {/* EMPTY STATE */}
        {!showProductsSection && !showPropertiesSection && (
          <div className="py-20 text-center border border-dashed border-[#EAEAEA] rounded-2xl bg-[#FAFAFA] mt-6">
            <Sparkles className="w-10 h-10 text-[#CCCCCC] mx-auto mb-3" />
            <p className="text-base font-bold text-[#111111] mb-1">
              No items found matching &quot;{searchQuery}&quot;
            </p>
            <p className="text-xs text-[#666666] mb-4">
              Try searching for Packages, Water Purifiers, Sofas, Beds, or 2 BHK flats.
            </p>
            <button
              onClick={clearAllFilters}
              className="px-5 py-2.5 bg-[#111111] text-white text-xs font-bold rounded-xl hover:bg-black transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>

      {/* QUICK VIEW PRODUCT MODAL */}
      {selectedProduct && (
        <div 
          className="fixed inset-0 z-[120] bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedProduct(null)}
        >
          <div 
            className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border border-[#EAEAEA] max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-5 right-5 p-1 rounded-full text-[#666666] hover:text-black hover:bg-[#F5F5F7]"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-[#F5F5F7] mb-5">
              <Image
                src={selectedProduct.images[0]}
                alt={selectedProduct.title}
                fill
                className="object-cover"
              />
              <div className="absolute top-3 left-3 bg-[#111111] text-white text-[10px] font-bold px-2.5 py-1 rounded-md uppercase">
                {selectedProduct.category}
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-2xl font-extrabold text-[#111111] tracking-tight">
                    {selectedProduct.price}
                  </span>
                  <span className="text-xs text-[#666666] ml-2">Deposit: {selectedProduct.deposit}</span>
                </div>
                <div className="flex items-center gap-1 text-xs font-bold bg-[#F5F5F7] px-2 py-1 rounded">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{selectedProduct.rating} ({selectedProduct.reviewsCount} reviews)</span>
                </div>
              </div>

              <h3 className="text-lg font-bold text-[#111111] leading-snug">
                {selectedProduct.title}
              </h3>

              <p className="text-xs text-[#555555] leading-relaxed">
                {selectedProduct.description}
              </p>

              <div className="bg-[#FAFAFA] border border-[#EAEAEA] rounded-xl p-3.5 space-y-1.5 text-xs">
                <span className="font-bold text-[#111111] block text-[11px] uppercase tracking-wider mb-1">
                  Product Specifications:
                </span>
                {selectedProduct.specs.map((s, idx) => (
                  <div key={idx} className="flex justify-between py-0.5 border-b border-[#F0F0F0] last:border-none text-[11px]">
                    <span className="text-[#777777]">{s.label}</span>
                    <span className="font-medium text-[#111111] text-right">{s.value}</span>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1 text-[11px] font-semibold text-[#333333]">
                {selectedProduct.features.map((f, idx) => (
                  <div key={idx} className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-black shrink-0" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="flex-1 py-3 rounded-xl bg-[#F5F5F7] text-xs font-bold text-[#666666] hover:text-[#111111]"
                >
                  Close
                </button>
                <button
                  onClick={() => handleProductRent(selectedProduct)}
                  className="flex-1 py-3 rounded-xl bg-[#111111] hover:bg-black text-white text-xs font-bold transition-all shadow-sm"
                >
                  Confirm Rental Inquiry
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ListingsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white flex items-center justify-center text-xs font-bold text-[#666666]">
          Loading Amaya Listings & Products...
        </div>
      }
    >
      <ListingsContent />
    </Suspense>
  );
}
