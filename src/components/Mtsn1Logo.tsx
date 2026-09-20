import React, { useState } from "react";
import { useMadrasahAssets } from "../context/AssetContext";

interface Mtsn1LogoProps {
  className?: string;
  imgClassName?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

export const Mtsn1Logo: React.FC<Mtsn1LogoProps> = ({
  className = "w-12 h-12",
  imgClassName = "w-full h-full object-contain",
}) => {
  const { assets } = useMadrasahAssets();
  const [hasError, setHasError] = useState(false);

  if (!hasError && assets.logo) {
    return (
      <div className={`flex items-center justify-center overflow-hidden ${className}`}>
        <img
          src={assets.logo}
          alt="Logo MTsN 1 Padang Pariaman"
          referrerPolicy="no-referrer"
          className={imgClassName}
          onError={() => setHasError(true)}
        />
      </div>
    );
  }

  // Crisp, mathematically accurate vector SVG emblem for MTsN 1 Padang Pariaman
  return (
    <div className={`flex items-center justify-center shrink-0 ${className}`}>
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full drop-shadow-2xs select-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="emeraldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#047857" />
            <stop offset="100%" stopColor="#065f46" />
          </linearGradient>
          <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>
        </defs>

        {/* 5-pointed star emblem base */}
        <polygon
          points="100,10 126,62 186,66 142,108 153,166 100,138 47,166 58,108 14,66 74,62"
          fill="url(#emeraldGrad)"
          stroke="#064e3b"
          strokeWidth="3"
        />

        {/* Outer Circular Ring */}
        <circle cx="100" cy="100" r="76" fill="#047857" stroke="#fbbf24" strokeWidth="3.5" />
        
        {/* Inner Ring with White Background */}
        <circle cx="100" cy="100" r="66" fill="#ffffff" stroke="#065f46" strokeWidth="2" />

        {/* Circular text path guide */}
        <path id="textPathTop" d="M 38,100 A 62,62 0 1,1 162,100" fill="none" />
        <path id="textPathBottom" d="M 162,100 A 62,62 0 0,1 38,100" fill="none" />

        {/* Arching Text */}
        <text fill="#065f46" fontSize="10.5" fontWeight="bold" letterSpacing="0.8">
          <textPath href="#textPathTop" startOffset="50%" textAnchor="middle">
            MTsN 1 PADANG PARIAMAN
          </textPath>
        </text>

        <text fill="#065f46" fontSize="9.5" fontWeight="bold" letterSpacing="0.8">
          <textPath href="#textPathBottom" startOffset="50%" textAnchor="middle">
            IKHLAS BERAMAL
          </textPath>
        </text>

        {/* Inner Core Circle */}
        <circle cx="100" cy="100" r="46" fill="#047857" />

        {/* 3 Golden Stars on top */}
        {/* Center Star */}
        <polygon
          points="100,60 102.5,67 110,67 104,71.5 106,78 100,74 94,78 96,71.5 90,67 97.5,67"
          fill="url(#goldGrad)"
        />
        {/* Left Star */}
        <polygon
          points="82,66 84,72 90,72 85,76 87,82 82,78 77,82 79,76 74,72 80,72"
          fill="url(#goldGrad)"
        />
        {/* Right Star */}
        <polygon
          points="118,66 120,72 126,72 121,76 123,82 118,78 113,82 115,76 110,72 116,72"
          fill="url(#goldGrad)"
        />

        {/* Rehal (Book Stand) */}
        <path
          d="M 75,116 L 100,126 L 125,116 L 100,108 Z"
          fill="#78350f"
          stroke="#451a03"
          strokeWidth="1.5"
        />

        {/* Open Quran (Pages) */}
        <path
          d="M 100,105 C 93,96 82,96 74,98 L 74,113 C 82,111 93,111 100,120 C 107,111 118,111 126,113 L 126,98 C 118,96 107,96 100,105 Z"
          fill="#fef08a"
          stroke="#d97706"
          strokeWidth="1.5"
        />
        <line x1="100" y1="105" x2="100" y2="120" stroke="#b45309" strokeWidth="2" />
        {/* Page text lines */}
        <line x1="78" y1="102" x2="95" y2="102" stroke="#b45309" strokeWidth="1" />
        <line x1="78" y1="106" x2="95" y2="106" stroke="#b45309" strokeWidth="1" />
        <line x1="105" y1="102" x2="122" y2="102" stroke="#b45309" strokeWidth="1" />
        <line x1="105" y1="106" x2="122" y2="106" stroke="#b45309" strokeWidth="1" />

        {/* Golden Ribbon Banner below */}
        <path
          d="M 66,134 L 100,130 L 134,134 L 130,142 L 100,138 L 70,142 Z"
          fill="url(#goldGrad)"
          stroke="#b45309"
          strokeWidth="1"
        />
        <text
          x="100"
          y="138"
          fill="#78350f"
          fontSize="6"
          fontWeight="900"
          textAnchor="middle"
        >
          SUMATERA BARAT
        </text>
      </svg>
    </div>
  );
};
