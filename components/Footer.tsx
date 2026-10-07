"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Instagram, Linkedin, Twitter, Facebook, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#111111] text-white pt-16 pb-12 mt-20 border-t border-black">
      <div className="container-custom">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-white/10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="relative h-14 w-36 rounded-xl overflow-hidden bg-black flex items-center justify-start">
              <Image
                src="/assets/images/amaya-logo.jpg"
                alt="Amaya Rental Amenities"
                fill
                className="object-contain object-left"
              />
            </div>
            <p className="text-white/60 text-sm max-w-sm leading-relaxed pt-2">
              India&apos;s premier rental amenities platform. Rent quality-checked furniture, appliances, water purifiers, and home electronics with free delivery, setup, and relocation.
            </p>
            <div className="flex items-center gap-4 pt-3 text-white/70">
              <a href="#" aria-label="Amaya on Instagram" className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" aria-label="Amaya on LinkedIn" className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" aria-label="Amaya on Twitter" className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" aria-label="Amaya on Facebook" className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-white/40 font-bold mb-4">Explore</h4>
            <ul className="space-y-2.5 text-sm text-white/70">
              <li>
                <Link href="/listings" className="hover:text-white transition-colors">Apartments</Link>
              </li>
              <li>
                <Link href="/listings" className="hover:text-white transition-colors">Flats</Link>
              </li>
              <li>
                <Link href="/listings" className="hover:text-white transition-colors">Penthouses</Link>
              </li>
              <li>
                <Link href="/listings" className="hover:text-white transition-colors">Furnished Homes</Link>
              </li>
              <li>
                <Link href="/listings" className="hover:text-white transition-colors">Luxury Rentals</Link>
              </li>
              <li>
                <Link href="/listings" className="hover:text-white transition-colors">Family Residences</Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-white/40 font-bold mb-4">Company</h4>
            <ul className="space-y-2.5 text-sm text-white/70">
              <li>
                <Link href="/blogs" className="hover:text-white transition-colors">Journal & Insights</Link>
              </li>
              <li>
                <Link href="/profile" className="hover:text-white transition-colors">About Amaya</Link>
              </li>
              <li>
                <a href="mailto:contact@amayarentals.com" className="hover:text-white transition-colors">Contact Us</a>
              </li>
              <li>
                <Link href="/listings" className="hover:text-white transition-colors">Careers</Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-white transition-colors">Partner Portal</Link>
              </li>
            </ul>
          </div>

          {/* Support & Contact */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-white/40 font-bold mb-4">Support & Locations</h4>
            <ul className="space-y-2.5 text-sm text-white/70 mb-4">
              <li>
                <Link href="/listings" className="hover:text-white transition-colors">Help Center</Link>
              </li>
              <li>
                <Link href="/listings" className="hover:text-white transition-colors">Rental Guide</Link>
              </li>
              <li>
                <Link href="/listings" className="hover:text-white transition-colors">Terms of Service</Link>
              </li>
              <li>
                <Link href="/listings" className="hover:text-white transition-colors">Privacy Policy</Link>
              </li>
            </ul>
            <div className="pt-2 text-xs text-white/60 space-y-1.5 border-t border-white/10">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-white/40" /> Visakhapatnam & Mumbai
              </div>
              <div className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-white/40" /> contact@amayarentals.com
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <p>© {new Date().getFullYear()} Amaya Rental Amenities Pvt. Ltd. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Verified Rentals Only</span>
            <span>•</span>
            <span>No Hidden Brokerage</span>
            <span>•</span>
            <span>Insured Leases</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
