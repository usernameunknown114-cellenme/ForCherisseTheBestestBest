'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PhotoGalleryProps {
  onContinue: () => void;
}

const photos = [
  {
    src: '/assets/pic1.png',
    caption: 'Ganito kita nakikita —
palagi.',
    rotate: '-rotate-2',
    delay: 0,
  },
  {
    src: '/assets/pic2.png',
    caption: 'Isa sa mga sandaling
nais kong alalahanin.',
    rotate: 'rotate-1',
    delay: 0.1,
  },
  {
    src: '/assets/pic3.png',
    caption: 'Ikaw, sa lahat
ng anyo mo.',
    rotate: '-rotate-1',
    delay: 0.2,
  },
];

export default function PhotoGallery({ onContinue }: PhotoGalleryProps) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const go = (dir: number) => {
    setDirection(dir);
    setCurrent((c) => (c + dir + photos.length) % photos.length);
  };

  return (
    <div
      className="page-container font-display relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-10 overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #f0f7f0 0%, #e8f5e9 50%, #f7faf5 100%)' }}
    >
      {/* Grid paper subtle bg */}
      <div className="pointer-events-none absolute inset-0 grid-paper opacity-60" />

      {/* Floating decorations */}
      <div className="absolute top-8 left-6 text-3xl animate-float-slow opacity-40">🌼</div>
      <div className="absolute top-14 right-8 text-2xl animate-float opacity-30">🌿</div>
      <div className="absolute bottom-24 left-8 text-xl animate-float-rev opacity-30">🍃</div>
      <div className="absolute bottom-16 right-6 text-2xl animate-float-slow opacity-40">🌼</div>

      <div className="relative z-10 w-full max-w-sm mx-auto">

        {/* Section header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="handwriting text-[#4a7c59] text-sm tracking-wide">
            — para sa iyo, na aking —
          </p>
          <h2 className="text-[#1a3a14] text-2xl sm:text-3xl font-black mt-1 leading-snug">
            Ikaw, Sa Aking Mga Mata
          </h2>
          <div className="mt-2 flex items-center justify-center gap-2">
            <div className="h-px w-10 bg-green-300" />
            <span className="text-lg">🌼</span>
            <div className="h-px w-10 bg-green-300" />
          </div>
        </motion.div>

        {/* Polaroid Card */}
        <div className="relative flex items-center justify-center min-h-[420px]">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              variants={{
                enter: (d: number) => ({ x: d > 0 ? 80 : -80, opacity: 0, rotate: d > 0 ? 4 : -4 }),
                center: { x: 0, opacity: 1, rotate: 0 },
                exit: (d: number) => ({ x: d > 0 ? -80 : 80, opacity: 0, rotate: d > 0 ? -4 : 4 }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.45, ease: 'easeInOut' }}
              className={`w-full ${photos[current].rotate}`}
            >
              {/* Polaroid frame */}
              <div className="bg-white rounded-sm shadow-2xl p-3 pb-10 border border-green-100 mx-auto max-w-xs relative">
                {/* Tape strip top */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-14 h-5 bg-[#f5e642]/60 rounded-sm border border-yellow-200/50 backdrop-blur-sm" />

                {/* Photo */}
                <div className="w-full aspect-square overflow-hidden bg-green-50">
                  <img
                    src={photos[current].src}
                    alt="Para sa iyo"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Handwritten caption */}
                <div className="mt-3 px-1 text-center">
                  <p className="handwriting text-[#2d5a27] text-base leading-snug whitespace-pre-line">
                    {photos[current].caption}
                  </p>
                </div>

                {/* Small daisy stamp bottom right */}
                <div className="absolute bottom-2 right-3 text-sm opacity-50">🌼</div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-6 mt-6">
          <button
            onClick={() => go(-1)}
            className="w-11 h-11 rounded-full border-2 border-[#2d5a27] text-[#2d5a27] flex items-center justify-center font-bold text-lg hover:bg-[#2d5a27] hover:text-white transition-all hover:scale-110 active:scale-95 cursor-pointer"
          >
            ←
          </button>

          {/* Dots */}
          <div className="flex gap-2 items-center">
            {photos.map((_, i) => (
              <button
                key={i}
                onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                className={`rounded-full transition-all duration-300 cursor-pointer ${
                  i === current
                    ? 'w-4 h-2 bg-[#2d5a27]'
                    : 'w-2 h-2 bg-green-200 hover:bg-green-300'
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => go(1)}
            className="w-11 h-11 rounded-full border-2 border-[#2d5a27] text-[#2d5a27] flex items-center justify-center font-bold text-lg hover:bg-[#2d5a27] hover:text-white transition-all hover:scale-110 active:scale-95 cursor-pointer"
          >
            →
          </button>
        </div>

        {/* Counter */}
        <p className="handwriting text-center text-[#4a7c59]/70 text-xs mt-3">
          {current + 1} sa {photos.length}
        </p>

        {/* Continue */}
        <div className="flex justify-center mt-8">
          <motion.button
            onClick={onContinue}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-[#2d5a27] text-white font-semibold shadow-md hover:bg-[#4a7c59] focus:outline-none focus:ring-4 focus:ring-green-300 transition-all cursor-pointer"
          >
            May isa pa para sa iyo ✨
          </motion.button>
        </div>
      </div>
    </div>
  );
}
