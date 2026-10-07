"use client";

import React from "react";

export function Box3DIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0 drop-shadow-sm">
      <defs>
        <linearGradient id="boxBaseLeft" x1="12" y1="30" x2="32" y2="58" gradientUnits="userSpaceOnUse">
          <stop stopColor="#D97706" />
          <stop offset="1" stopColor="#B45309" />
        </linearGradient>
        <linearGradient id="boxBaseRight" x1="32" y1="30" x2="52" y2="58" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FBBF24" />
          <stop offset="1" stopColor="#D97706" />
        </linearGradient>
        <linearGradient id="boxFlapTop" x1="14" y1="18" x2="32" y2="34" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FDE68A" />
          <stop offset="1" stopColor="#F59E0B" />
        </linearGradient>
        <linearGradient id="productLime" x1="24" y1="14" x2="36" y2="32" gradientUnits="userSpaceOnUse">
          <stop stopColor="#A3E635" />
          <stop offset="1" stopColor="#65A30D" />
        </linearGradient>
        <linearGradient id="productSilver" x1="16" y1="20" x2="28" y2="36" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#CBD5E1" />
        </linearGradient>
      </defs>

      {/* Items inside */}
      <rect x="23" y="14" width="13" height="19" rx="2" fill="url(#productLime)" transform="rotate(-8 23 14)" />
      <rect x="17" y="20" width="11" height="15" rx="2" fill="url(#productSilver)" transform="rotate(6 17 20)" />

      {/* Inside Dark Shadow */}
      <polygon points="15,31 32,23 49,31 32,39" fill="#78350F" opacity="0.65" />

      {/* Box Body */}
      <polygon points="15,31 32,39 32,56 15,48" fill="url(#boxBaseLeft)" />
      <polygon points="32,39 49,31 49,48 32,56" fill="url(#boxBaseRight)" />

      {/* Open Flaps */}
      <polygon points="15,31 7,23 23,19 31,27" fill="url(#boxFlapTop)" />
      <polygon points="49,31 57,23 41,19 33,27" fill="#FCD34D" />
      <polygon points="15,31 32,39 28,45 11,37" fill="#F59E0B" />
      <polygon points="49,31 32,39 36,45 53,37" fill="#FBBF24" />
    </svg>
  );
}

export function RupeeCoin3DIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0 drop-shadow-sm">
      <defs>
        <radialGradient id="coinRimGrad" cx="30%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#FB7185" />
          <stop offset="50%" stopColor="#E11D48" />
          <stop offset="100%" stopColor="#9F1239" />
        </radialGradient>
        <radialGradient id="coinFaceGrad" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="45%" stopColor="#FFE4E6" />
          <stop offset="100%" stopColor="#FECDD3" />
        </radialGradient>
        <linearGradient id="rupeeTextGrad" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#9F1239" />
          <stop offset="1" stopColor="#E11D48" />
        </linearGradient>
      </defs>

      {/* Soft shadow */}
      <ellipse cx="32" cy="34" rx="23" ry="23" fill="#881337" opacity="0.2" />

      {/* 3D Outer Edge & Rim */}
      <ellipse cx="32" cy="32" rx="23" ry="23" fill="url(#coinRimGrad)" />
      <ellipse cx="32" cy="32" rx="20" ry="20" fill="#FDA4AF" />
      <ellipse cx="32" cy="32" rx="18" ry="18" fill="url(#coinFaceGrad)" />

      {/* Inner Ridge */}
      <circle cx="32" cy="32" r="16" stroke="#FFFFFF" strokeWidth="1" opacity="0.8" fill="none" />

      {/* Rupee Symbol */}
      <text
        x="32"
        y="39"
        textAnchor="middle"
        fontSize="21"
        fontWeight="800"
        fontFamily="sans-serif"
        fill="url(#rupeeTextGrad)"
        style={{ filter: "drop-shadow(0px 1px 1px rgba(159, 18, 57, 0.3))" }}
      >
        ₹
      </text>
    </svg>
  );
}

export function ReturnAnytime3DIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0 drop-shadow-sm">
      <defs>
        <linearGradient id="blueArc1" x1="14" y1="14" x2="50" y2="50" gradientUnits="userSpaceOnUse">
          <stop stopColor="#3B82F6" />
          <stop offset="50%" stopColor="#1D4ED8" />
          <stop offset="100%" stopColor="#1E40AF" />
        </linearGradient>
        <linearGradient id="blueArc2" x1="50" y1="50" x2="14" y2="14" gradientUnits="userSpaceOnUse">
          <stop stopColor="#93C5FD" />
          <stop offset="40%" stopColor="#2563EB" />
          <stop offset="100%" stopColor="#1D4ED8" />
        </linearGradient>
      </defs>

      {/* Ambient shadow */}
      <ellipse cx="32" cy="34" rx="20" ry="20" fill="#1E3A8A" opacity="0.15" />

      {/* Top-Right Loop Arrow */}
      <path
        d="M32 14 C42 14 50 22 50 32 C50 35.5 49 38.8 47.2 41.5 L52 45 L38 44.5 L39 31 L43 35 C44.3 33.2 45 31 45 28.5 C45 21.5 39.5 15.8 32.5 15.5 Z"
        fill="url(#blueArc1)"
      />

      {/* Bottom-Left Loop Arrow */}
      <path
        d="M32 50 C22 50 14 42 14 32 C14 28.5 15 25.2 16.8 22.5 L12 19 L26 19.5 L25 33 L21 29 C19.7 30.8 19 33 19 35.5 C19 42.5 24.5 48.2 31.5 48.5 Z"
        fill="url(#blueArc2)"
      />

      {/* Glossy 3D Highlight Highlights */}
      <path
        d="M21 26 C23.5 21 28 17.5 34 16.5"
        stroke="#FFFFFF"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.85"
      />
      <path
        d="M43 38 C40.5 43 36 46.5 30 47.5"
        stroke="#BFDBFE"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.75"
      />
    </svg>
  );
}

const STEPS = [
  {
    icon: Box3DIcon,
    title: "Choose Products",
    subtitle: "Browse furniture and appliances."
  },
  {
    icon: RupeeCoin3DIcon,
    title: "Pay Monthly",
    subtitle: "No large upfront payment."
  },
  {
    icon: ReturnAnytime3DIcon,
    title: "Return Anytime",
    subtitle: "Flexibility if your plan changes."
  }
];

export default function RentalStepsStrip({ className = "w-full my-6 sm:my-8" }: { className?: string }) {
  return (
    <div className={className}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4 lg:gap-5">
        {STEPS.map((step, idx) => {
          const IconComponent = step.icon;
          return (
            <div
              key={idx}
              className="bg-white border border-[#EDEDED] hover:border-[#CCCCCC] rounded-2xl p-4 sm:p-5 flex items-center gap-4 shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:shadow-md transition-all duration-200"
            >
              <IconComponent />
              <div className="flex flex-col">
                <h4 className="text-sm sm:text-[15px] font-bold text-[#1E293B] tracking-tight leading-snug">
                  {step.title}
                </h4>
                <p className="text-xs sm:text-[13px] text-[#64748B] font-normal leading-relaxed mt-0.5">
                  {step.subtitle}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
