"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useSavedProperties } from "@/context/SavedPropertiesContext";
import { 
  MapPin, 
  Search, 
  Percent, 
  Heart, 
  ShoppingBag, 
  User, 
  ChevronDown, 
  Menu, 
  X,
  Check,
  Building,
  Sparkles
} from "lucide-react";

const SEARCH_PLACEHOLDERS = [
  'Search for "2 BHK"',
  'Search for "Luxury Apartment"',
  'Search for "Penthouse"',
  'Search for "Furnished Flat"',
  'Search for "Sea View Residence"'
];

const CITIES = [
  "Visakhapatnam",
  "Mumbai",
  "Bengaluru",
  "Hyderabad",
  "Pune",
  "Delhi NCR"
];

export default function Navbar() {
  const router = useRouter();
  const { user, signOut } = useAuth();
  const { savedPropertyIds } = useSavedProperties();
  
  const [selectedCity, setSelectedCity] = useState("Visakhapatnam");
  const [isCityModalOpen, setIsCityModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOffersOpen, setIsOffersOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  // Cycle search placeholders smoothly
  useEffect(() => {
    const timer = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % SEARCH_PLACEHOLDERS.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/listings?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push(`/listings`);
    }
  };

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
    setIsCityModalOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-white border-b border-[#EAEAEA] shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
        {/* Main Header Container */}
        <div className="container-custom py-3.5 flex items-center justify-between gap-3 lg:gap-8">
          
          {/* LEFT: Amaya Logo & Location Selector */}
          <div className="flex items-center gap-4 lg:gap-6 shrink-0">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group shrink-0">
              <div className="relative h-11 sm:h-12 w-24 sm:w-28 rounded-xl overflow-hidden bg-black flex items-center justify-center p-1 border border-black/10 shadow-xs hover:opacity-95 transition-opacity">
                <Image
                  src="/assets/images/amaya-logo.jpg"
                  alt="Amaya Rental Amenities"
                  fill
                  priority
                  className="object-contain"
                />
              </div>
            </Link>

            {/* Location Selector (Desktop/Tablet) */}
            <div className="relative hidden sm:block border-l border-[#EAEAEA] pl-4 lg:pl-6">
              <button 
                onClick={() => setIsCityModalOpen(!isCityModalOpen)}
                className="flex items-start gap-1.5 text-left group py-0.5"
                aria-label="Select City"
              >
                <MapPin className="w-4 h-4 text-[#111111] mt-0.5 shrink-0" />
                <div className="flex flex-col">
                  <div className="flex items-center gap-1 font-semibold text-xs text-[#111111] group-hover:text-black">
                    <span>{selectedCity}</span>
                    <ChevronDown className="w-3 h-3 text-[#666666] group-hover:text-black transition-transform duration-200" />
                  </div>
                  <span className="text-[10px] text-[#888888] font-normal leading-tight">
                    Add Address
                  </span>
                </div>
              </button>

              {/* City Dropdown Menu */}
              {isCityModalOpen && (
                <div className="absolute left-4 lg:left-6 top-full mt-2 w-56 bg-white border border-[#EAEAEA] rounded-xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3 py-1.5 text-[10px] uppercase font-bold tracking-wider text-[#888888] border-b border-[#F0F0F0]">
                    Select Rental City
                  </div>
                  {CITIES.map((city) => (
                    <button
                      key={city}
                      onClick={() => handleCitySelect(city)}
                      className={`w-full px-3.5 py-2 text-left text-xs flex items-center justify-between hover:bg-[#F8F9FA] transition-colors ${
                        selectedCity === city ? "font-bold text-[#111111]" : "text-[#444444]"
                      }`}
                    >
                      <span>{city}</span>
                      {selectedCity === city && <Check className="w-3.5 h-3.5 text-[#111111]" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* CENTER: Dynamic Search Bar (Desktop & Tablet) */}
          <div className="hidden md:flex flex-1 max-w-xl mx-2">
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <div className="relative flex items-center w-full">
                <Search className="absolute left-4 w-4 h-4 text-[#666666] pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={SEARCH_PLACEHOLDERS[placeholderIndex]}
                  className="w-full bg-[#F5F5F7] hover:bg-[#EFEFF2] focus:bg-white text-xs text-[#111111] placeholder:text-[#777777] rounded-full pl-11 pr-4 py-2.5 border border-transparent focus:border-[#111111] outline-none transition-all duration-200 shadow-inner"
                />
              </div>
            </form>
          </div>

          {/* RIGHT: Actions (Offers, Wishlist, Saved, User) */}
          <div className="flex items-center gap-1.5 sm:gap-3 lg:gap-4 shrink-0">
            {/* Offers Button */}
            <div className="relative">
              <button 
                onClick={() => setIsOffersOpen(!isOffersOpen)}
                className="p-2 sm:px-3 sm:py-2 rounded-full hover:bg-[#F5F5F7] text-[#111111] flex items-center gap-1.5 transition-colors"
                title="View Offers"
              >
                <Percent className="w-4 h-4 text-[#111111]" />
                <span className="hidden xl:inline text-xs font-semibold">Offers</span>
              </button>

              {/* Offers Popover */}
              {isOffersOpen && (
                <div className="absolute right-0 top-full mt-2 w-72 bg-white border border-[#EAEAEA] rounded-xl shadow-xl p-4 z-50">
                  <div className="flex items-center justify-between pb-2 border-b border-[#F0F0F0]">
                    <span className="font-bold text-xs text-[#111111] flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-black" /> Exclusive Offers
                    </span>
                    <button onClick={() => setIsOffersOpen(false)} className="text-[#888888] hover:text-black">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="py-3 space-y-2.5">
                    <div className="p-2.5 bg-[#F9FAFB] rounded-lg border border-[#EAEAEA]">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-black block mb-0.5">
                        FESTIVE MOVE-IN BONUS
                      </span>
                      <p className="text-xs text-[#444444]">
                        Get 15% off first month rental deposit on all verified luxury flats with code <strong>AMAYA15</strong>.
                      </p>
                    </div>
                    <div className="p-2.5 bg-[#F9FAFB] rounded-lg border border-[#EAEAEA]">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-black block mb-0.5">
                        INSURED LEASE GUARANTEE
                      </span>
                      <p className="text-xs text-[#444444]">
                        Zero paperwork fee on all 1-year verified corporate and family leases.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Wishlist Button */}
            <Link 
              href="/listings"
              className="relative p-2 sm:px-3 sm:py-2 rounded-full hover:bg-[#F5F5F7] text-[#111111] flex items-center gap-1.5 transition-colors"
              title="Saved Properties"
            >
              <Heart className="w-4 h-4 text-[#111111]" />
              <span className="hidden xl:inline text-xs font-semibold">Wishlist</span>
              {savedPropertyIds.length > 0 && (
                <span className="absolute top-1 right-1 sm:top-1.5 sm:right-1.5 w-4 h-4 bg-[#111111] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {savedPropertyIds.length}
                </span>
              )}
            </Link>

            {/* Saved / Cart Button */}
            <Link 
              href="/listings"
              className="relative p-2 sm:px-3 sm:py-2 rounded-full hover:bg-[#F5F5F7] text-[#111111] flex items-center gap-1.5 transition-colors"
              title="Cart / Saved Rentals"
            >
              <ShoppingBag className="w-4 h-4 text-[#111111]" />
              <span className="hidden xl:inline text-xs font-semibold">Saved</span>
            </Link>

            {/* User Account / Login */}
            <div className="relative">
              <button 
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="p-1.5 sm:px-3 sm:py-1.5 rounded-full hover:bg-[#F5F5F7] text-[#111111] flex items-center gap-2 transition-colors border border-transparent hover:border-[#EAEAEA]"
                aria-label="User Account"
              >
                <div className="w-7 h-7 rounded-full bg-[#111111] text-white flex items-center justify-center text-xs font-bold">
                  {user ? (user.fullName?.[0] || user.email?.[0]?.toUpperCase() || "U") : <User className="w-3.5 h-3.5" />}
                </div>
                <span className="hidden md:inline text-xs font-semibold text-[#111111]">
                  {user ? (user.fullName?.split(" ")[0] || "Account") : "Login"}
                </span>
                <ChevronDown className="hidden md:inline w-3 h-3 text-[#666666]" />
              </button>

              {/* User Dropdown */}
              {isUserMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-52 bg-white border border-[#EAEAEA] rounded-xl shadow-xl py-2 z-50">
                  {user ? (
                    <>
                      <div className="px-4 py-2 border-b border-[#F0F0F0]">
                        <p className="text-xs font-bold text-[#111111] truncate">{user.fullName || "Member"}</p>
                        <p className="text-[10px] text-[#666666] truncate">{user.email}</p>
                      </div>
                      <Link 
                        href="/profile" 
                        onClick={() => setIsUserMenuOpen(false)}
                        className="w-full px-4 py-2 text-left text-xs text-[#333333] hover:bg-[#F8F9FA] block"
                      >
                        Profile & Bookings
                      </Link>
                      <Link 
                        href="/listings" 
                        onClick={() => setIsUserMenuOpen(false)}
                        className="w-full px-4 py-2 text-left text-xs text-[#333333] hover:bg-[#F8F9FA] block"
                      >
                        Saved Properties
                      </Link>
                      {user.email === "amayaproperties7@gmail.com" && (
                        <Link 
                          href="/admin" 
                          onClick={() => setIsUserMenuOpen(false)}
                          className="w-full px-4 py-2 text-left text-xs text-black font-bold hover:bg-[#F8F9FA] block"
                        >
                          Admin Terminal
                        </Link>
                      )}
                      <div className="border-t border-[#F0F0F0] my-1" />
                      <button 
                        onClick={() => {
                          signOut();
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full px-4 py-2 text-left text-xs text-red-600 hover:bg-[#F8F9FA] block font-medium"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="px-4 py-2 text-xs text-[#666666]">
                        Welcome to Amaya Rental Amenities
                      </div>
                      <Link 
                        href="/login" 
                        onClick={() => setIsUserMenuOpen(false)}
                        className="w-full px-4 py-2 text-left text-xs font-bold text-[#111111] hover:bg-[#F8F9FA] block"
                      >
                        Log In
                      </Link>
                      <Link 
                        href="/signup" 
                        onClick={() => setIsUserMenuOpen(false)}
                        className="w-full px-4 py-2 text-left text-xs text-[#444444] hover:bg-[#F8F9FA] block"
                      >
                        Create an Account
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Menu Hamburger */}
            <button 
              onClick={() => setIsMenuOpen(true)}
              className="md:hidden p-2 text-[#111111] hover:bg-[#F5F5F7] rounded-lg"
              aria-label="Open Navigation Menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mobile Search & Location Bar (Only on mobile viewports) */}
        <div className="md:hidden px-4 pb-3 pt-1 border-t border-[#F0F0F0] flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => setIsCityModalOpen(!isCityModalOpen)}
              className="flex items-center gap-1.5 text-xs font-semibold text-[#111111]"
            >
              <MapPin className="w-3.5 h-3.5 text-[#111111]" />
              <span>{selectedCity}</span>
              <ChevronDown className="w-3 h-3 text-[#666666]" />
            </button>
            <span className="text-[10px] text-[#888888]">Visakhapatnam & Mumbai</span>
          </div>

          <form onSubmit={handleSearchSubmit} className="relative w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#666666]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={SEARCH_PLACEHOLDERS[placeholderIndex]}
              className="w-full bg-[#F5F5F7] text-xs text-[#111111] rounded-full pl-10 pr-4 py-2 border border-[#EAEAEA] outline-none"
            />
          </form>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <div 
        className={`fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMenuOpen(false)}
      >
        <div 
          className={`fixed right-0 top-0 h-full w-[80%] max-w-sm bg-white p-6 shadow-2xl transition-transform duration-300 flex flex-col justify-between ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div>
            <div className="flex items-center justify-between pb-6 border-b border-[#EAEAEA]">
              <div className="flex items-center gap-2">
                <div className="relative h-10 w-24 rounded-lg overflow-hidden bg-black flex items-center justify-center p-0.5">
                  <Image
                    src="/assets/images/amaya-logo.jpg"
                    alt="Amaya Rental Amenities"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              <button onClick={() => setIsMenuOpen(false)} className="p-1 text-[#666666] hover:text-black">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-6 space-y-4">
              <Link 
                href="/listings" 
                onClick={() => setIsMenuOpen(false)}
                className="block text-sm font-semibold text-[#111111] hover:text-black py-2"
              >
                Explore Rental Flats
              </Link>
              <Link 
                href="/listings" 
                onClick={() => setIsMenuOpen(false)}
                className="block text-sm font-semibold text-[#111111] hover:text-black py-2"
              >
                Luxury Penthouses
              </Link>
              <Link 
                href="/blogs" 
                onClick={() => setIsMenuOpen(false)}
                className="block text-sm font-semibold text-[#111111] hover:text-black py-2"
              >
                Amaya Journal
              </Link>
              <Link 
                href="/profile" 
                onClick={() => setIsMenuOpen(false)}
                className="block text-sm font-semibold text-[#111111] hover:text-black py-2"
              >
                Saved Properties & Wishlist
              </Link>
            </div>
          </div>

          <div className="pt-6 border-t border-[#EAEAEA] space-y-3">
            {user ? (
              <>
                <div className="text-xs text-[#666666]">
                  Signed in as <strong className="text-[#111111]">{user.fullName || user.email}</strong>
                </div>
                <button 
                  onClick={() => {
                    signOut();
                    setIsMenuOpen(false);
                  }}
                  className="w-full py-2.5 bg-[#F5F5F7] text-xs font-semibold text-[#111111] rounded-lg"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link 
                  href="/login" 
                  onClick={() => setIsMenuOpen(false)}
                  className="py-2.5 text-center bg-[#111111] text-white text-xs font-semibold rounded-lg"
                >
                  Login
                </Link>
                <Link 
                  href="/signup" 
                  onClick={() => setIsMenuOpen(false)}
                  className="py-2.5 text-center border border-[#111111] text-[#111111] text-xs font-semibold rounded-lg"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
