'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface HeroProps {
  onOpenGift: () => void;
  isGiftOpened: boolean;
}

export default function Hero({ onOpenGift, isGiftOpened }: HeroProps) {
  const [particles, setParticles] = useState<
    Array<{ left: number; top: number; delay: number; duration: number }>
  >([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 18 }, () => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 20,
      duration: 15 + Math.random() * 10,
    }));
    setParticles(newParticles);
  }, []);

  if (isGiftOpened) return null;

  return (
    <div className="app relative w-full min-h-screen overflow-hidden font-display">
      {/* Earthy green dreamy background */}
      <div className="dreamy-bg" />

      {/* Floating leaf particles */}
      <div className="floating-particles" aria-hidden="true">
        {particles.map((particle, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`,
            }}
          />
        ))}
      </div>

      {/* Grid overlay */}
      <div className="grid-overlay" aria-hidden="true" />

      {/* Background icons — daisies, cats, cameras */}
      <div className="bg-icons" aria-hidden="true">
        {/* Daisy SVG */}
        <svg className="icon icon-daisy icon-1" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="32" cy="32" r="8" fill="#f5e642"/>
          {[0,45,90,135,180,225,270,315].map((angle, i) => (
            <ellipse key={i} cx="32" cy="14" rx="5" ry="10" fill="white" opacity="0.9"
              transform={`rotate(${angle} 32 32)`}/>
          ))}
        </svg>

        {/* Camera SVG */}
        <svg className="icon icon-camera icon-2" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="8" y="18" width="48" height="34" rx="6" fill="#4a7c59" opacity="0.85"/>
          <circle cx="32" cy="35" r="10" fill="#2d5a27" opacity="0.9"/>
          <circle cx="32" cy="35" r="6" fill="#a8d5b5" opacity="0.7"/>
          <rect x="20" y="12" width="14" height="8" rx="3" fill="#4a7c59" opacity="0.85"/>
          <circle cx="48" cy="24" r="3" fill="#f5e642" opacity="0.8"/>
        </svg>

        {/* Cat SVG */}
        <svg className="icon icon-cat icon-3" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="32" cy="40" rx="20" ry="16" fill="#7bbf8a" opacity="0.85"/>
          <ellipse cx="32" cy="26" rx="14" ry="12" fill="#7bbf8a" opacity="0.85"/>
          <polygon points="18,16 12,4 22,14" fill="#7bbf8a" opacity="0.9"/>
          <polygon points="46,16 52,4 42,14" fill="#7bbf8a" opacity="0.9"/>
          <circle cx="26" cy="26" r="2.5" fill="#2d5a27"/>
          <circle cx="38" cy="26" r="2.5" fill="#2d5a27"/>
          <path d="M28 32 Q32 35 36 32" stroke="#2d5a27" strokeWidth="1.5" fill="none"/>
        </svg>

        {/* Smaller daisy */}
        <svg className="icon icon-4" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="32" cy="32" r="7" fill="#f5e642" opacity="0.9"/>
          {[0,45,90,135,180,225,270,315].map((angle, i) => (
            <ellipse key={i} cx="32" cy="15" rx="4" ry="9" fill="white" opacity="0.85"
              transform={`rotate(${angle} 32 32)`}/>
          ))}
        </svg>

        <div className="heart-1">🌿</div>
        <div className="heart-2">🌼</div>
        <div className="sparkle-text-1">✨</div>
        <div className="sparkle-text-2">🍃</div>
      </div>

      {/* Main content */}
      <div className="page-container relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 sm:px-6 md:px-10">

        {/* Decorative daisies in corners */}
        <div className="absolute top-8 left-8 text-4xl animate-float-slow opacity-70">🌼</div>
        <div className="absolute top-12 right-10 text-3xl animate-float opacity-60">🌿</div>
        <div className="absolute bottom-20 left-10 text-2xl animate-float-slow opacity-50">🍃</div>
        <div className="absolute bottom-24 right-8 text-3xl animate-float opacity-60">🌼</div>

        {/* Main card */}
        <motion.div
          className="relative w-full max-w-2xl bg-[#f7faf5] rounded-2xl shadow-lg border border-green-200 p-6 sm:p-8 md:p-10 z-10 mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Daisy decorative top right */}
          <div className="absolute -top-8 right-6 text-5xl animate-bounce-slow">🌼</div>

          {/* Window controls — green tones */}
          <div className="flex items-center justify-between border-b border-green-200 pb-3 mb-6">
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded-full bg-[#7bbf8a] border border-[#4a7c59]"></span>
              <span className="w-3.5 h-3.5 rounded-full bg-[#f5e642] border border-[#c9b800]"></span>
              <span className="w-3.5 h-3.5 rounded-full bg-[#e8a87c] border border-[#c47d4a]"></span>
            </div>
            <p className="text-sm font-bold text-[#2d5a27] flex items-center gap-1">
              Para sa iyo
              <span>🌼</span>
            </p>
            <div className="w-16"></div>
          </div>

          {/* Content */}
          <div className="text-center space-y-6 relative">
            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1a3a14] leading-snug"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Hey, Cherrise 🌿
            </motion.h1>

            <motion.div
              className="text-[#2d5a27]/80 text-base md:text-lg leading-relaxed relative mx-auto max-w-lg"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <p className="font-serif italic text-[#4a7c59] text-lg">
                "palagi mong piliin kung saan payapa ang puso mo"
              </p>
              <p className="mt-3 text-sm text-[#2d5a27]/70">
                Gumawa ako ng isang maliit na mundo — para sa iyo lang.
              </p>
              <p className="pt-3">
                <span className="font-semibold text-[#4a7c59]">
                  Pindutin mo ito para makita mo ✨
                </span>
                <span className="inline-block w-1.5 h-4 bg-[#7bbf8a]/70 ml-1 animate-cursor"></span>
              </p>
            </motion.div>

            <motion.button
              onClick={onOpenGift}
              className="mt-4 inline-flex items-center justify-center px-8 py-3 rounded-full bg-[#2d5a27] text-white font-semibold shadow-md transition-all transform hover:scale-105 active:scale-95 hover:bg-[#4a7c59] focus:outline-none focus:ring-4 focus:ring-green-300 cursor-pointer"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Open this little world"
            >
              Buksan mo na 🌼
            </motion.button>

            {/* Dates reminder */}
            <motion.div
              className="flex justify-center gap-6 text-xs text-[#4a7c59]/70 pt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <span>🎂 May 16</span>
              <span>💚 Jan 31</span>
              <span>🌸 Aug 31</span>
            </motion.div>
          </div>
        </motion.div>

        <div className="mt-8 text-xs text-[#4a7c59] text-center">
          Ginawa nang may pagmamahal, para sa iyo 💚
        </div>
      </div>
    </div>
  );
}
