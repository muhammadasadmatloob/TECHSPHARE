import React from 'react';

export const BackgroundStage = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden transform-gpu will-change-transform">
      <div className="absolute inset-0 w-full h-full">
        {/* Seamless Hardware-Accelerated Boomerang MP4 */}
        <video
          className="w-full h-full object-cover object-center filter brightness-[0.65] contrast-[1.1]"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
          preload="auto"
        >
          <source src="/hero_boomerang.mp4" type="video/mp4" />
          <source
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260808_112712_da9d53df-6d27-4b12-bdf6-aa9dc2622bdf.mp4"
            type="video/mp4"
          />
        </video>
        
        {/* Dark Vignette Overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(circle at 50% 50%, rgba(5,5,5,0.2) 0%, rgba(5,5,5,0.92) 80%),
              linear-gradient(to bottom, rgba(5,5,5,0.5) 0%, transparent 25%, transparent 75%, #050505 100%)
            `
          }}
        />
      </div>
    </div>
  );
};