"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useProperties } from "@/context/PropertyContext";
import { supabase } from "@/utils/supabase";
import { 
  User, 
  Mail, 
  Phone, 
  Clock, 
  ArrowRight, 
  Building2, 
  MessageSquare, 
  ChevronRight, 
  LogOut, 
  MapPin, 
  Calendar 
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ProfilePage() {
  const { user, signOut, isLoading: authLoading } = useAuth();
  const { properties } = useProperties();
  const router = useRouter();
  
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;
    
    if (!user) {
      router.push("/login");
      return;
    }

    const fetchInquiries = async () => {
      try {
        if (supabase) {
          const { data, error } = await supabase
            .from('inquiries')
            .select('*')
            .eq('user_email', user.email)
            .order('created_at', { ascending: false });

          if (!error && data) {
            setInquiries(data);
            setLoading(false);
            return;
          }
        }

        // Fallback to localStorage
        if (typeof window !== 'undefined') {
          const localInquiries = JSON.parse(localStorage.getItem('amaya_inquiries') || '[]');
          setInquiries(localInquiries);
        }
      } catch (err) {
        console.error("Error fetching inquiries:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchInquiries();
  }, [user, authLoading, router]);

  if (authLoading || (loading && !inquiries.length && !user)) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-xs font-bold text-[#666666]">Authenticating...</div>
      </div>
    );
  }

  const getPropertyData = (propertyId: string) => {
    return properties.find(p => p.id === propertyId);
  };

  return (
    <div className="min-h-screen bg-white text-[#111111] pt-8 pb-24">
      <div className="container-custom">
        {/* Header Section */}
        <div className="mb-10 pb-6 border-b border-[#EAEAEA] flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-1.5">
            <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#666666]">
              CLIENT PORTAL
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#111111] tracking-tight">
              Member Profile
            </h1>
            <p className="text-xs sm:text-sm text-[#666666]">
              Welcome back, <strong className="text-[#111111]">{user?.fullName || "Valued Client"}</strong>
            </p>
          </div>
          <button 
            onClick={() => signOut()}
            className="self-start md:self-auto flex items-center gap-2 px-5 py-2.5 bg-[#F5F5F7] border border-[#EAEAEA] text-xs font-bold text-[#111111] hover:bg-black hover:text-white rounded-xl transition-all"
          >
            <LogOut className="w-3.5 h-3.5" /> Sign Out
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left Sidebar - User Info */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white border border-[#EAEAEA] p-6 sm:p-8 rounded-2xl shadow-xs">
              <div className="flex flex-col items-center text-center mb-6">
                <div className="w-20 h-20 bg-[#111111] text-white rounded-full flex items-center justify-center font-bold text-2xl mb-4">
                  {user?.fullName?.[0]?.toUpperCase() || <User className="w-8 h-8" />}
                </div>
                <h2 className="text-lg font-bold text-[#111111]">{user?.fullName || "Member"}</h2>
                <span className="text-[10px] tracking-wider uppercase font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full mt-1">
                  {user?.userType || "Active Member"}
                </span>
              </div>

              <div className="space-y-4 pt-4 border-t border-[#F0F0F0]">
                <div>
                  <label className="text-[10px] uppercase font-bold text-[#888888] block">Email</label>
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#111111] mt-0.5">
                    <Mail className="w-3.5 h-3.5 text-[#666666]" />
                    <span className="truncate">{user?.email}</span>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] uppercase font-bold text-[#888888] block">Phone</label>
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#111111] mt-0.5">
                    <Phone className="w-3.5 h-3.5 text-[#666666]" />
                    <span>{user?.phone || "Not provided"}</span>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] uppercase font-bold text-[#888888] block">Status</label>
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#111111] mt-0.5">
                    <Calendar className="w-3.5 h-3.5 text-[#666666]" />
                    <span>Verified Lease Member</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#FAFAFA] border border-[#EAEAEA] p-6 rounded-2xl">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#111111] mb-3">
                Member Benefits
              </h3>
              <ul className="space-y-2 text-xs text-[#555555]">
                <li className="flex items-center gap-2">✓ Priority private property inspections</li>
                <li className="flex items-center gap-2">✓ Zero paperwork fees on 1-year leases</li>
                <li className="flex items-center gap-2">✓ Direct relationship manager support</li>
              </ul>
            </div>
          </div>

          {/* Right Content - Inquiries */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <MessageSquare className="w-4 h-4 text-[#111111]" />
                <h2 className="text-lg font-bold text-[#111111]">Rental Inquiries</h2>
                <span className="bg-[#F5F5F7] border border-[#EAEAEA] px-2.5 py-0.5 rounded-full text-xs font-bold text-[#111111]">
                  {inquiries.length}
                </span>
              </div>
              <Link 
                href="/listings" 
                className="text-xs font-bold text-[#111111] hover:underline flex items-center gap-1"
              >
                Browse More Rentals <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {inquiries.length === 0 ? (
              <div className="py-16 text-center border border-dashed border-[#EAEAEA] rounded-2xl bg-[#FAFAFA]">
                <Building2 className="w-10 h-10 text-[#CCCCCC] mx-auto mb-3" />
                <p className="text-xs font-bold text-[#111111] mb-1">No rental inquiries submitted yet.</p>
                <p className="text-xs text-[#666666] mb-4">Explore our listings and send an inquiry to book a viewing.</p>
                <Link 
                  href="/listings" 
                  className="px-5 py-2.5 bg-[#111111] text-white text-xs font-bold rounded-xl hover:bg-black transition-colors"
                >
                  Explore Rentals
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {inquiries.map((inquiry) => {
                  const prop = getPropertyData(inquiry.property_id);
                  return (
                    <div 
                      key={inquiry.id} 
                      className="bg-white border border-[#EAEAEA] p-5 rounded-2xl flex flex-col sm:flex-row gap-5 hover:border-[#111111] transition-all shadow-xs"
                    >
                      <div className="relative w-full sm:w-28 h-24 rounded-xl overflow-hidden bg-[#F5F5F7] shrink-0">
                        {prop?.images?.[0] ? (
                          <Image 
                            src={prop.images[0]} 
                            alt={prop.projectName} 
                            fill 
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Building2 className="w-6 h-6 text-[#CCCCCC]" />
                          </div>
                        )}
                      </div>

                      <div className="flex-1 space-y-2">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-sm font-bold text-[#111111]">
                              {prop?.projectName || inquiry.properties?.project_name || "Rental Property"}
                            </h3>
                            <div className="flex items-center gap-1.5 text-xs text-[#666666] mt-0.5">
                              <MapPin className="w-3 h-3 text-[#111111]" />
                              <span>{prop?.location || inquiry.properties?.location || "Visakhapatnam"}</span>
                            </div>
                          </div>
                          <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                            {inquiry.status || "Pending"}
                          </span>
                        </div>

                        <p className="text-xs text-[#555555] bg-[#F9FAFB] p-2.5 rounded-lg border border-[#F0F0F0]">
                          &quot;{inquiry.message}&quot;
                        </p>

                        <div className="flex items-center justify-between pt-1 text-[11px] text-[#888888]">
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>{new Date(inquiry.created_at || Date.now()).toLocaleDateString()}</span>
                          </div>
                          {prop && (
                            <Link 
                              href={`/property/${prop.id}`}
                              className="font-bold text-[#111111] hover:underline flex items-center gap-1"
                            >
                              View Flat <ChevronRight className="w-3 h-3" />
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
