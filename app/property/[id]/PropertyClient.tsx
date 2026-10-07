"use client";

import { use, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { RevealSection } from "@/components/RevealSection";
import { useProperties } from "@/context/PropertyContext";
import { useSavedProperties } from "@/context/SavedPropertiesContext";
import { 
  ChevronLeft, 
  Share2, 
  Heart, 
  MapPin, 
  Bed, 
  Maximize2, 
  Building2, 
  CheckCircle2,
  Dumbbell,
  Droplets,
  ShieldCheck,
  Leaf,
  MessageSquare,
  Armchair,
  CalendarCheck,
  FileText
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/utils/supabase";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function PropertyClient({ params }: PageProps) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { properties, isLoading } = useProperties();
  const { isPropertySaved, toggleSaveProperty } = useSavedProperties();
  const [property, setProperty] = useState<any>(null);

  const [showInquiryForm, setShowInquiryForm] = useState(false);
  const [inquiryEmail, setInquiryEmail] = useState("");
  const [inquiryMessage, setInquiryMessage] = useState("");
  const [inquiryStatus, setInquiryStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const { user } = useAuth();
  const [inquiryName, setInquiryName] = useState("");
  const [inquiryPhone, setInquiryPhone] = useState("");

  useEffect(() => {
    if (isLoading) return;
    const found = properties.find((p) => p.id === resolvedParams.id);
    setProperty(found);
    
    if (user) {
      setInquiryName(user.fullName || "");
      setInquiryEmail(user.email || "");
      setInquiryPhone(user.phone || "");
    }
  }, [resolvedParams.id, properties, isLoading, user]);

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setInquiryStatus("submitting");
    
    try {
      if (supabase) {
        const { error } = await supabase.from('inquiries').insert({
          property_id: property.id,
          user_email: inquiryEmail,
          user_name: inquiryName,
          user_phone: inquiryPhone,
          message: inquiryMessage || `Rental inquiry for ${property.projectName}`,
          status: 'pending'
        });

        if (error) {
          console.warn("Supabase inquiry insert note:", error.message);
        }
      }

      // Persist fallback in local storage so admin and user always see it
      if (typeof window !== 'undefined') {
        const localInquiries = JSON.parse(localStorage.getItem('amaya_inquiries') || '[]');
        localInquiries.unshift({
          id: Date.now().toString(),
          property_id: property.id,
          user_email: inquiryEmail,
          user_name: inquiryName,
          user_phone: inquiryPhone,
          message: inquiryMessage || `Rental inquiry for ${property.projectName}`,
          status: 'pending',
          created_at: new Date().toISOString(),
          properties: {
            project_name: property.projectName,
            location: property.location
          }
        });
        localStorage.setItem('amaya_inquiries', JSON.stringify(localInquiries));
      }

      setInquiryStatus("success");
    } catch (err) {
      console.error("Error submitting rental inquiry:", err);
      setInquiryStatus("error");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center text-xs font-bold text-[#666666]">
        Loading Rental Details...
      </div>
    );
  }

  if (!isLoading && !property) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-4 text-xs font-bold text-[#666666]">
        <span>Rental property not found.</span>
        <button
          onClick={() => router.push("/listings")}
          className="px-5 py-2.5 bg-[#111111] text-white rounded-xl text-xs font-bold"
        >
          Back to Listings
        </button>
      </div>
    );
  }

  const isSaved = isPropertySaved(property.id);

  const amenityIcons: Record<string, any> = {
    gym: Dumbbell,
    swimming: Droplets,
    pool: Droplets,
    security: ShieldCheck,
    garden: Leaf,
    park: Leaf,
    lift: Building2,
    elevator: Building2
  };

  return (
    <div className="min-h-screen bg-white text-[#111111] pb-24">
      {/* Top Floating Back and Action Buttons */}
      <div className="container-custom pt-6 pb-4 flex items-center justify-between">
        <button 
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-xs font-bold text-[#111111] hover:text-black p-2 rounded-lg hover:bg-[#F5F5F7] transition-all"
        >
          <ChevronLeft className="w-4 h-4" /> Back to Properties
        </button>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => {
              if (navigator.share) {
                navigator.share({ title: property.projectName, url: window.location.href });
              } else {
                navigator.clipboard.writeText(window.location.href);
                alert("Property link copied to clipboard!");
              }
            }}
            className="p-2.5 rounded-full border border-[#EAEAEA] hover:border-[#111111] text-[#111111] transition-all"
            title="Share Property"
          >
            <Share2 className="w-4 h-4" />
          </button>
          <button 
            onClick={() => toggleSaveProperty(property.id)}
            className="p-2.5 rounded-full border border-[#EAEAEA] hover:border-[#111111] text-[#111111] transition-all"
            title="Save to Wishlist"
          >
            <Heart className={`w-4 h-4 ${isSaved ? "fill-black text-black" : "text-[#111111]"}`} />
          </button>
        </div>
      </div>

      {/* Main Image Banner */}
      <div className="container-custom pb-8">
        <div className="relative aspect-[16/9] md:aspect-[21/9] w-full rounded-2xl md:rounded-3xl overflow-hidden border border-[#EAEAEA] bg-[#F5F5F7] shadow-sm">
          <Image 
            src={property.images && property.images.length > 0 ? property.images[0] : "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600"} 
            alt={property.projectName} 
            fill 
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

          {/* Overlaid Badges */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-white text-black text-[10px] font-bold tracking-wider uppercase rounded-full shadow-sm">
              FOR RENT
            </span>
            {property.isInsured && (
              <span className="px-3 py-1 bg-[#111111] text-white text-[10px] font-bold tracking-wider uppercase rounded-full flex items-center gap-1 shadow-sm">
                <ShieldCheck className="w-3 h-3 text-white" /> INSURED LEASE
              </span>
            )}
          </div>

          {/* Title on Bottom of Image */}
          <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white drop-shadow-md">
              {property.projectName}
            </h1>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-white/90">
              <MapPin className="w-4 h-4" />
              <span>{property.location}, {property.region || "Visakhapatnam"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content Columns */}
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* LEFT: Details, Specs, Amenities */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Quick Specs Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-[#FAFAFA] border border-[#EAEAEA]">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs text-[#666666]">
                  <Bed className="w-4 h-4 text-[#111111]" />
                  <span>Configuration</span>
                </div>
                <div className="text-sm sm:text-base font-bold text-[#111111]">{property.bhkType}</div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs text-[#666666]">
                  <Maximize2 className="w-4 h-4 text-[#111111]" />
                  <span>Carpet Area</span>
                </div>
                <div className="text-sm sm:text-base font-bold text-[#111111]">{property.area || "2,100 sq.ft"}</div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs text-[#666666]">
                  <Armchair className="w-4 h-4 text-[#111111]" />
                  <span>Furnishing</span>
                </div>
                <div className="text-sm sm:text-base font-bold text-[#111111]">{property.furnishing || "Fully Furnished"}</div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs text-[#666666]">
                  <CalendarCheck className="w-4 h-4 text-[#111111]" />
                  <span>Availability</span>
                </div>
                <div className="text-sm sm:text-base font-bold text-[#111111]">{property.projectStatus || "Immediate"}</div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-3">
              <h2 className="text-xl font-extrabold text-[#111111] tracking-tight">
                About This Rental Flat
              </h2>
              <p className="text-sm text-[#444444] leading-relaxed">
                {property.description}
              </p>
            </div>

            {/* Lease Assurance Card */}
            <div className="p-6 rounded-2xl bg-[#FAFAFA] border border-[#EAEAEA] space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#666666]">
                Rental Lease Terms & Assurance
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
                <div className="border-l-2 border-[#111111] pl-3.5 space-y-1">
                  <div className="text-xs font-bold text-[#111111]">Lease Duration</div>
                  <div className="text-xs text-[#666666]">11 to 36 Months with renewal options</div>
                </div>
                <div className="border-l-2 border-[#111111] pl-3.5 space-y-1">
                  <div className="text-xs font-bold text-[#111111]">Security Deposit</div>
                  <div className="text-xs text-[#666666]">Refundable 3 - 6 months terms</div>
                </div>
                <div className="border-l-2 border-[#111111] pl-3.5 space-y-1">
                  <div className="text-xs font-bold text-[#111111]">AMAYA Protection</div>
                  <div className="text-xs text-[#666666]">Insured tenancy & title verified</div>
                </div>
              </div>
            </div>

            {/* Amenities Grid */}
            <div className="space-y-4">
              <h2 className="text-xl font-extrabold text-[#111111] tracking-tight">
                Included Amenities & Facilities
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {property.amenities?.map((amenity: string, idx: number) => {
                  const Icon = Object.entries(amenityIcons).find(([key]) => amenity.toLowerCase().includes(key))?.[1] as any || CheckCircle2;
                  return (
                    <div 
                      key={idx} 
                      className="flex items-center gap-2.5 p-3.5 bg-white border border-[#EAEAEA] rounded-xl hover:border-[#111111] transition-colors"
                    >
                      <Icon className="w-4 h-4 text-[#111111] shrink-0" />
                      <span className="text-xs font-semibold text-[#111111]">{amenity}</span>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* RIGHT: Sticky Rental Inquiry & Booking Box */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 bg-white border border-[#EAEAEA] rounded-2xl p-6 shadow-lg space-y-6">
              
              {/* Price Row */}
              <div className="pb-4 border-b border-[#F0F0F0]">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#666666] block mb-1">
                  Monthly Rent
                </span>
                <div className="text-3xl font-extrabold text-[#111111] tracking-tight">
                  {property.price.includes("/ mo") || property.price.includes("/ month") 
                    ? property.price 
                    : `${property.price}/month`}
                </div>
                <span className="text-xs text-[#666666] mt-0.5 block">
                  Maintenance & covered parking included
                </span>
              </div>

              {/* Insured Badge */}
              {property.isInsured && (
                <div className="p-3.5 bg-[#F9FAFB] border border-[#EAEAEA] rounded-xl flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-[#111111] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-[#111111] block">
                      Amaya Insured Lease
                    </span>
                    <span className="text-[11px] text-[#666666]">
                      Guaranteed protection against unexpected tenancy interruptions.
                    </span>
                  </div>
                </div>
              )}

              {/* Inquiry Action or Form */}
              <div>
                {!showInquiryForm ? (
                  <button
                    onClick={() => setShowInquiryForm(true)}
                    className="w-full py-3.5 px-4 bg-[#111111] hover:bg-black text-white text-xs font-bold tracking-wider uppercase rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>INQUIRE TO RENT</span>
                  </button>
                ) : (
                  <form onSubmit={handleInquirySubmit} className="space-y-3">
                    <input
                      required
                      type="text"
                      value={inquiryName}
                      onChange={(e) => setInquiryName(e.target.value)}
                      placeholder="Your Full Name"
                      className="w-full bg-[#F9FAFB] border border-[#EAEAEA] focus:border-[#111111] p-3 text-xs rounded-xl outline-none text-[#111111]"
                    />
                    <input
                      required
                      type="email"
                      value={inquiryEmail}
                      onChange={(e) => setInquiryEmail(e.target.value)}
                      placeholder="Email Address"
                      className="w-full bg-[#F9FAFB] border border-[#EAEAEA] focus:border-[#111111] p-3 text-xs rounded-xl outline-none text-[#111111]"
                    />
                    <input
                      required
                      type="tel"
                      value={inquiryPhone}
                      onChange={(e) => setInquiryPhone(e.target.value)}
                      placeholder="Phone Number"
                      className="w-full bg-[#F9FAFB] border border-[#EAEAEA] focus:border-[#111111] p-3 text-xs rounded-xl outline-none text-[#111111]"
                    />
                    <textarea
                      rows={3}
                      value={inquiryMessage}
                      onChange={(e) => setInquiryMessage(e.target.value)}
                      placeholder="Preferred move-in date or custom requirements..."
                      className="w-full bg-[#F9FAFB] border border-[#EAEAEA] focus:border-[#111111] p-3 text-xs rounded-xl outline-none text-[#111111] resize-none"
                    />
                    <div className="flex gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => setShowInquiryForm(false)}
                        className="flex-1 py-2.5 bg-[#F5F5F7] text-xs font-bold text-[#666666] hover:text-[#111111] rounded-xl"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={inquiryStatus === "submitting"}
                        className="flex-1 py-2.5 bg-[#111111] hover:bg-black text-white text-xs font-bold rounded-xl disabled:opacity-50"
                      >
                        {inquiryStatus === "submitting" ? "Sending..." : "Submit Inquiry"}
                      </button>
                    </div>

                    {inquiryStatus === "success" && (
                      <p className="text-emerald-700 text-xs font-medium text-center bg-emerald-50 p-2 rounded-lg">
                        Inquiry submitted! Our rental specialist will contact you shortly.
                      </p>
                    )}
                    {inquiryStatus === "error" && (
                      <p className="text-red-600 text-xs text-center">
                        Failed to send inquiry. Please try again.
                      </p>
                    )}
                  </form>
                )}
              </div>

              <div className="pt-2 text-center text-[10px] text-[#888888]">
                Property ID: <span className="font-semibold text-[#111111]">{property.id}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
