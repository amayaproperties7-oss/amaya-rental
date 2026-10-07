"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Sparkles, 
  Package, 
  Armchair, 
  Tv, 
  Laptop, 
  Home, 
  Dumbbell, 
  Building2, 
  MoreHorizontal 
} from "lucide-react";

interface CategoryNavProps {
  activeCategory?: string;
  onSelectCategory?: (category: string) => void;
}

export const CATEGORIES = [
  { id: "for-you", label: "For You", icon: Sparkles, query: "" },
  { id: "packages", label: "Packages", icon: Package, query: "Package" },
  { id: "furniture", label: "Furniture", icon: Armchair, query: "Furniture" },
  { id: "appliances", label: "Appliances", icon: Tv, query: "Appliance" },
  { id: "electronics", label: "Electronics", icon: Laptop, query: "Electronics" },
  { id: "home-essentials", label: "Home Essentials", icon: Home, query: "Essentials" },
  { id: "fitness", label: "Fitness", icon: Dumbbell, query: "Fitness" },
  { id: "wfh-study", label: "WFH & Study", icon: Building2, query: "Study" },
  { id: "more", label: "More", icon: MoreHorizontal, query: "All" }
];

export default function CategoryNav({ 
  activeCategory = "for-you", 
  onSelectCategory 
}: CategoryNavProps) {
  const router = useRouter();
  const [selected, setSelected] = useState(activeCategory);

  const handleClick = (cat: typeof CATEGORIES[0]) => {
    setSelected(cat.id);
    if (onSelectCategory) {
      onSelectCategory(cat.id);
    } else {
      if (cat.query) {
        router.push(`/listings?type=${encodeURIComponent(cat.query)}`);
      } else {
        router.push(`/listings`);
      }
    }
  };

  return (
    <div className="w-full bg-white border-b border-[#EAEAEA]">
      <div className="container-custom">
        <nav 
          aria-label="Rental categories"
          className="flex items-center justify-start lg:justify-between gap-6 md:gap-8 overflow-x-auto no-scrollbar scroll-smooth py-3"
        >
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isActive = selected === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => handleClick(cat)}
                className={`group flex flex-col items-center justify-center shrink-0 min-w-[72px] pb-1.5 pt-1 relative transition-colors focus:outline-none ${
                  isActive ? "text-[#111111]" : "text-[#666666] hover:text-[#111111]"
                }`}
              >
                <div className={`p-1.5 rounded-lg mb-1 transition-transform group-hover:scale-105 ${
                  isActive ? "text-black" : "text-[#555555] group-hover:text-black"
                }`}>
                  <Icon className="w-5 h-5 stroke-[1.75]" />
                </div>
                <span className={`text-[11px] sm:text-xs tracking-tight whitespace-nowrap transition-colors ${
                  isActive ? "font-bold text-[#111111]" : "font-medium text-[#666666] group-hover:text-[#111111]"
                }`}>
                  {cat.label}
                </span>

                {/* Active Indicator: Clean black underline */}
                {isActive && (
                  <div className="absolute bottom-0 left-2 right-2 h-[2.5px] bg-[#111111] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
