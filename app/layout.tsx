import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { AuthProvider } from "@/context/AuthContext";
import { PropertyProvider } from "@/context/PropertyContext";
import { VisitProvider } from "@/context/VisitContext";
import { InterestProvider } from "@/context/InterestContext";
import { SavedPropertiesProvider } from "@/context/SavedPropertiesContext";
import { BlogProvider } from "@/context/BlogContext";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const serif = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
});

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const metadata: Metadata = {
  title: "Amaya Rental Amenities | Rent Furniture, Appliances & Home Essentials",
  description: "Rent verified appliances, premium furniture, RO water purifiers, and home electronics across Visakhapatnam, Mumbai, and top Indian metros with free delivery & relocation.",
  icons: {
    icon: "/logo-icon.jpg?v=2",
    apple: "/logo-icon.jpg?v=2",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-white text-[#111111] font-sans antialiased selection:bg-[#111111] selection:text-white",
          sans.variable,
          serif.variable
        )}
      >
        <LenisProvider>
          <AuthProvider>
            <PropertyProvider>
              <BlogProvider>
                <VisitProvider>
                  <InterestProvider>
                    <SavedPropertiesProvider>
                      <Navbar />
                      <main className="min-h-screen w-full bg-white">{children}</main>
                      <Footer />
                    </SavedPropertiesProvider>
                  </InterestProvider>
                </VisitProvider>
              </BlogProvider>
            </PropertyProvider>
          </AuthProvider>
        </LenisProvider>
      </body>
    </html>
  );
}
