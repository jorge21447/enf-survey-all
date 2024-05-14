import React from "react";

const CustomGradientWaveSVG = () => {
  const theme1 = localStorage.getItem('theme');

  return (
    <div className="absolute inset-0 z-10 pointer-events-none">
      {/* SVG */}
      <svg 
        viewBox="0 0 1440 600" // Define el viewBox para escalabilidad
        preserveAspectRatio="none" // Mantiene la proporción al escalar
        xmlns="http://www.w3.org/2000/svg" 
        className="pointer-events-none w-full h-full" // Ocupa todo el espacio disponible
      >
        <defs>
          <linearGradient id="gradient" x1="3%" y1="32%" x2="97%" y2="68%">
            <stop offset="5%" stopColor={theme1 === 'dark' ? "#627ba7 " : "#1242bf"}></stop>
            <stop offset="95%" stopColor={theme1 === 'dark' ? "#232f44 " : "#0693e3"}></stop>
          </linearGradient>
        </defs>
        <path 
          d="M 0,0 L 0,225 C 117.5,193.21428571428572 235,161.42857142857142 363,172 C 491,182.57142857142858 629.4999999999999,235.50000000000006 765,269 C 900.5000000000001,302.49999999999994 1033,316.57142857142856 1145,306 C 1257,295.42857142857144 1348.5,260.2142857142857 1440,225 L 1440,600 L 0,600 Z" 
          stroke="none" strokeWidth="0" 
          fill="url(#gradient)" 
          fillOpacity="1" 
          transform="rotate(-180 720 300)"
        />
      </svg>
    </div>
  );
};

export default CustomGradientWaveSVG;
