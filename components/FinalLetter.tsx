'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SealedLetter from './SealedLetter';

interface FinalLetterProps {
  onRestart?: () => void;
}

interface KissParticle {
  id: number;
  x: number;
  driftX: number;
  rotation: number;
}

export default function FinalLetter({ onRestart }: FinalLetterProps) {
  const [isSealed, setIsSealed] = useState(false);
  const [showSealedPage, setShowSealedPage] = useState(false);
  const [kissParticles, setKissParticles] = useState<KissParticle[]>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleSeal = () => {
    if (isSealed) return;
    const particles: KissParticle[] = [];
    for (let i = 0; i < 12; i++) {
      particles.push({
        id: Date.now() + i,
        x: 50 + (Math.random() - 0.5) * 20,
        driftX: (Math.random() - 0.5) * 40,
        rotation: Math.random() * 360,
      });
    }
    setKissParticles(particles);
    setIsSealed(true);
    setTimeout(() => {
      setKissParticles([]);
      setShowSealedPage(true);
    }, 1600);
  };

  if (showSealedPage) return <SealedLetter onExperienceAgain={onRestart} />;

  return (
    <div className="page-container">
      <div className="font-display min-h-screen flex items-center justify-center py-10 px-4 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #f0f7f0 0%, #e8f5e9 50%, #f7faf5 100%)' }}>
        <div className="pointer-events-none absolute inset-0 z-0">
          <div className="absolute inset-0 grid-paper"></div>
          {/* Floating decoratives */}
          <div className="absolute left-8 top-14 text-2xl animate-float-slow opacity-50">🌼</div>
          <div className="absolute right-8 top-28 text-xl animate-float-rev opacity-40">🌿</div>
          <div className="absolute left-6 bottom-28 text-2xl animate-pulse-tiny opacity-30">🍃</div>
          <div className="absolute right-6 bottom-20 text-2xl animate-float-slow opacity-30">🌼</div>
        </div>

        <div className="pointer-events-none fixed inset-0 z-40"></div>

        <div className="relative z-10 w-full max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-[#f7faf5] rounded-3xl p-6 sm:p-8 shadow-xl border border-green-200"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#2d5a27] flex items-center justify-center text-white text-lg shadow-md">
                  🌼
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#1a3a14]">
                  Huling Liham
                </h3>
              </div>
            </div>

            <article className="handwriting text-sm sm:text-base text-[#1a3a14] leading-relaxed space-y-4">
              <p className="text-[#2d5a27] font-semibold">
                Mahal kong Cherrise,
              </p>
              <p>
                Gusto ko maging ang taong pumipili sayo — lagi,
                kahit mahirap, kahit malayo, kahit busy.
              </p>
              <p className="text-[#4a7c59]">
                Gusto kitang makita na masaya — kahit yung simpleng turon,
                o macaroni spaghetti, o Frooties, o Milo mo sa gabi —
                nasa tabi mo ako.
              </p>
              <p>
                Gusto kong maging yung taong pinapanatag ka.
                Yung hawak mo ang kamay ko nang hindi mo iniisip kung bakit.
              </p>
              <p className="text-[#2d5a27] font-serif italic">
                Dade, Dora, Axel — aalagaan ko rin sila sa puso ko,
                dahil mahal mo sila.
              </p>
              <p>
                Ikaw — ang artist, ang photographer, ang manunubok ng kasaysayan,
                ang mahilig sa old songs at dark chocolate at daisies —
                ika&apos;y kamangha-mangha.
              </p>
              <p className="text-[#4a7c59] font-serif italic text-center pt-2">
                "palagi mong piliin kung saan payapa ang puso mo"
              </p>
              <p className="pt-2">
                Sana, someday, yun ang sagot mo — kasama ka.
              </p>
            </article>

            <div className="mt-6 flex flex-col sm:flex-row justify-between gap-3 items-center">
              <div className="text-xs text-[#4a7c59]">
                Sealing will close this little world. 🌿
              </div>
              <div className="flex gap-3 relative">
                <AnimatePresence>
                  {kissParticles.map((particle) => (
                    <motion.div
                      key={particle.id}
                      className="kiss-particle"
                      style={
                        {
                          left: `${particle.x}%`,
                          '--driftX': `${particle.driftX}px`,
                          '--rot': `${particle.rotation}deg`,
                        } as React.CSSProperties
                      }
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <span className="text-2xl">🌼</span>
                      <div className="sparkle"></div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                <button
                  ref={buttonRef}
                  onClick={handleSeal}
                  disabled={isSealed}
                  className="rounded-full bg-gradient-to-r from-[#4a7c59] to-[#7bbf8a] px-5 py-2.5 text-sm sm:text-base font-bold text-white shadow-md hover:scale-105 transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {isSealed ? 'Sealed 🌼' : 'I-seal ang liham 🌼'}
                </button>
                {onRestart && (
                  <button
                    onClick={onRestart}
                    className="rounded-full bg-green-100 text-[#2d5a27] px-4 py-2.5 text-sm sm:text-base font-medium shadow-md hover:brightness-95 transition cursor-pointer"
                  >
                    Ulit
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
