"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, User, Mail, Lock, Phone } from "lucide-react";
import { supabase } from "@/utils/supabase";

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      if (authError) throw authError;

      const userId = authData.user?.id;
      if (!userId) throw new Error("Failed to create user session");

      const { error: dbError } = await supabase.from('users').insert({
        id: userId,
        email: formData.email,
        full_name: formData.fullName,
        phone: formData.phone,
        user_type: "Member"
      });

      if (dbError) {
        console.error("Database Error:", dbError);
      }

      router.push("/login?registered=true");
    } catch (err: any) {
      console.error("Signup Catch Block:", err);
      setErrorMsg(err.message || "An error occurred during registration");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] bg-white py-12 px-4 flex flex-col items-center justify-center">
      <div className="w-full max-w-md">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#666666] hover:text-[#111111] mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        <div className="bg-white border border-[#EAEAEA] p-8 sm:p-10 rounded-2xl shadow-lg">
          <div className="text-center mb-8 space-y-2">
            <div className="relative w-28 h-16 rounded-xl overflow-hidden bg-black mx-auto mb-3 flex items-center justify-center shadow-md">
              <Image
                src="/assets/images/amaya-logo.jpg"
                alt="Amaya Rental Amenities"
                fill
                priority
                className="object-contain"
              />
            </div>
            <h1 className="text-2xl font-extrabold text-[#111111] tracking-tight">Create Account</h1>
            <p className="text-xs text-[#666666]">Join Amaya Rental Amenities for verified rentals</p>
          </div>

          {errorMsg && (
            <div className="mb-5 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs text-center font-medium">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSignup} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#111111]">Full Name</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#888888]" />
                <input 
                  required
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                  className="w-full bg-[#F9FAFB] border border-[#EAEAEA] focus:border-[#111111] focus:bg-white pl-10 pr-4 py-3 text-xs rounded-xl outline-none text-[#111111] transition-all"
                  placeholder="e.g. Rahul Sharma"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#111111]">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#888888]" />
                <input 
                  required
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-[#F9FAFB] border border-[#EAEAEA] focus:border-[#111111] focus:bg-white pl-10 pr-4 py-3 text-xs rounded-xl outline-none text-[#111111] transition-all"
                  placeholder="rahul@example.com"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#111111]">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#888888]" />
                <input 
                  required
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full bg-[#F9FAFB] border border-[#EAEAEA] focus:border-[#111111] focus:bg-white pl-10 pr-4 py-3 text-xs rounded-xl outline-none text-[#111111] transition-all"
                  placeholder="+91 98765 43210"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#111111]">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#888888]" />
                <input 
                  required
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full bg-[#F9FAFB] border border-[#EAEAEA] focus:border-[#111111] focus:bg-white pl-10 pr-4 py-3 text-xs rounded-xl outline-none text-[#111111] transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-[#111111] hover:bg-black text-white text-xs font-bold tracking-wider uppercase rounded-xl transition-all disabled:opacity-50 mt-2 shadow-xs"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <div className="mt-6 flex items-center gap-3">
            <div className="flex-1 h-[1px] bg-[#EAEAEA]" />
            <p className="text-[10px] tracking-wider text-[#888888] uppercase font-bold">OR</p>
            <div className="flex-1 h-[1px] bg-[#EAEAEA]" />
          </div>

          <button 
            onClick={async () => {
              setLoading(true);
              const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: { redirectTo: window.location.origin }
              });
              if (error) setErrorMsg(error.message);
              setLoading(false);
            }}
            className="w-full mt-4 py-3 bg-white border border-[#EAEAEA] hover:border-[#111111] text-[#111111] flex items-center justify-center gap-3 rounded-xl transition-all text-xs font-semibold"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            <span>Continue with Google</span>
          </button>

          <div className="mt-8 text-center border-t border-[#F0F0F0] pt-6">
            <p className="text-xs text-[#666666]">
              Already have an account?{" "}
              <Link href="/login" className="text-[#111111] font-bold hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
