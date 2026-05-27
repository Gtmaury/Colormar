/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface ToucanLogoProps {
  className?: string;
  showText?: boolean;
}

export default function ToucanLogo({ className = 'h-10 w-auto', showText = true }: ToucanLogoProps) {
  return (
    <div className="flex items-center space-x-3 select-none">
      <svg
        className={`${className} overflow-visible`}
        viewBox={showText ? "0 0 450 160" : "0 0 230 160"}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="LogoToucanGroup">
          {/* Toucan and the 'C' combined */}
          <g id="ToucanIcon">
            {/* The Back 'C' Shape representing solid paint base */}
            <path
              d="M130,55 L210,55 A5,5 0 0,0 210,48 L130,48 A40,40 0 0,0 90,88 L90,95 A40,40 0 0,0 130,135 L210,135 A5,5 0 0,0 210,127 L130,127 A32,32 0 0,1 98,95 L98,88 A32,32 0 0,1 130,55 Z"
              fill="#1E293B"
              stroke="#0F172A"
              strokeWidth="1.5"
            />
            {/* Dark Toucan Head and Neck Body */}
            <path
              d="M30,95 C30,75 42,60 55,60 C65,60 70,72 73,85 C75,95 72,112 60,118 C50,123 38,128 32,135 C30,132 28,125 29,118 C25,115 22,110 22,105 C24,103 26,101 28,103 Z"
              fill="#0F172A"
              stroke="#1E293B"
              strokeWidth="1"
            />
            
            {/* Tail feather decorative splatters in Toucan Colors */}
            <path d="M22,110 C18,110 14,115 16,120 C18,123 23,121 24,117 Z" fill="#EF4444" />
            <path d="M16,118 C12,118 8,122 10,127 C12,130 17,128 18,124 Z" fill="#0EA5E9" />
            <path d="M12,125 C8,125 4,130 6,134 C8,137 13,135 14,131 Z" fill="#FACC15" />

            {/* White Collar and Cheek Face mask */}
            <path
              d="M55,61 C57,61 65,65 67,75 C69,82 66,95 55,98 C50,99 43,99 41,94 C39,83 44,70 55,61 Z"
              fill="#F8FAFC"
            />

            {/* Cyan/Teal Eye Ring surrounding toucan's iris */}
            <circle cx="53" cy="74" r="8" fill="#06B6D4" />
            {/* Black Pupil & White Reflex shine */}
            <circle cx="53" cy="74" r="4" fill="#0F172A" />
            <circle cx="54.5" cy="72.5" r="1" fill="#FFFFFF" />

            {/* Large Magnificent Toucan Paint Beak (Vibrant Yellow-to-Orange Gradient) */}
            <defs>
              <linearGradient id="beakGrad" x1="0%" y1="0%" x2="100%" y2="80%">
                <stop offset="0%" stopColor="#FACC15" />
                <stop offset="55%" stopColor="#F97316" />
                <stop offset="100%" stopColor="#EF4444" />
              </linearGradient>
            </defs>
            <path
              d="M60,61 C75,61 100,64 112,74 C117,78 120,83 118,88 C115,92 100,97 85,98 C72,99 66,96 61,94 C59,85 58,70 60,61 Z"
              fill="url(#beakGrad)"
              stroke="#EA580C"
              strokeWidth="0.5"
            />
          </g>

          {/* Styled Wordmark 'COLORMAR' */}
          {showText && (
            <g id="ColormarTextWord">
              <text
                x="148"
                y="102"
                fill="#0F172A"
                fontFamily='"Plus Jakarta Sans", "Inter", sans-serif'
                fontSize="45"
                fontWeight="900"
                letterSpacing="2"
                className="dark:fill-[#F8FAFC] fill-[#0F172A]"
              >
                COLORMAR
              </text>
              {/* Tiny accent color paint streak debajo de la marca */}
              <path
                d="M152,112 L380,112"
                stroke="#EA580C"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              <path
                d="M152,112 L240,112"
                stroke="#FACC15"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              <path
                d="M152,112 L180,112"
                stroke="#06B6D4"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
            </g>
          )}
        </g>
      </svg>
    </div>
  );
}
