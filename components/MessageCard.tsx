'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { messageData } from '@/data/message';
import { showToast } from '@/lib/toast';
import Playlist from '@/components/Playlist';
import FlipCards from '@/components/FlipCards';
import TypewriterText from '@/components/TypewriterText';

interface MessageCardProps {
  isRevealed: boolean;
  onRestart?: () => void;
}

export default function MessageCard({ isRevealed, onRestart }: MessageCardProps) {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [showLetter, setShowLetter] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [showFlipCards, setShowFlipCards] = useState(false);
  const [typewriterComplete, setTypewriterComplete] = useState({
    signature: false,
    love: false,
    stamped: false,
  });
  const [stampText, setStampText] = useState({ love: '', stamped: '' });

  const handleEnvelopeClick = () => {
    setIsEnvelopeOpen(true);
    setTimeout(() => {
      setShowLetter(true);
      setTimeout(() => {
        typeText('LAGI', 'love', () =>
          setTypewriterComplete((prev) => ({ ...prev, love: true }))
        );
        setTimeout(() => {
          typeText('IKAW', 'stamped', () =>
            setTypewriterComplete((prev) => ({ ...prev, stamped: true }))
          );
        }, 800);
      }, 1000);
    }, 400);
  };

  const typeText = (
    fullText: string,
    key: 'love' | 'stamped',
    onComplete: () => void
  ) => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setStampText((prev) => ({
          ...prev,
          [key]: fullText.slice(0, currentIndex),
        }));
        currentIndex++;
      } else {
        clearInterval(interval);
        onComplete();
      }
    }, 100);
  };

  if (!isRevealed) return null;
  if (showFlipCards) return <FlipCards onRestart={onRestart} />;
  if (showPlaylist) return <Playlist onContinue={() => setShowFlipCards(true)} />;

  return (
    <div className="page-container font-display relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 py-6">
      {/* Decorative floating elements */}
      <div className="absolute top-10 left-10 text-3xl animate-float-slow opacity-60">🌼</div>
      <div className="absolute right-10 top-16 text-2xl animate-float opacity-50">🌿</div>
      <div className="absolute left-12 bottom-20 text-2xl animate-float-slow opacity-40">🍃</div>

      <div className="w-full max-w-3xl">
        {/* Header */}
        <div className="flex items-center justify-center gap-2 mb-6 animate-slideDown">
          <div className="text-center">
            <h2 className="text-[#2d5a27] text-lg sm:text-xl font-bold leading-tight">
              Isang Liham Para sa Iyo 💌
            </h2>
            <div className="text-xs text-[#4a7c59] mt-1">
              Mula sa puso ko, para sa iyo
            </div>
          </div>
        </div>

        {/* Envelope and Letter Container */}
        <div className="bg-[#f7faf5] rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-green-200 shadow-xl animate-fadeIn overflow-hidden">
          <AnimatePresence mode="wait">
            {!isEnvelopeOpen ? (
              // Closed Envelope — green themed
              <motion.div
                key="envelope-closed"
                className="flex flex-col items-center justify-center min-h-[400px] relative"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                <div
                  className="relative cursor-pointer transition-all duration-800 transform hover:scale-105 hover:-rotate-1"
                  onClick={handleEnvelopeClick}
                >
                  <div className="relative w-80 h-56 mx-auto">
                    {/* Envelope base */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#d4edda] to-[#e8f5e9] rounded-lg shadow-lg border-2 border-green-200"></div>

                    {/* Envelope flap */}
                    <div
                      className="absolute -top-1 left-0 right-0 h-28 bg-gradient-to-br from-[#7bbf8a] to-[#4a7c59]"
                      style={{
                        clipPath: 'polygon(0px 0px, 100% 0px, 50% 100%)',
                        borderRadius: '8px 8px 0px 0px',
                      }}
                    />

                    {/* Daisy seal */}
                    <div className="absolute top-12 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-[#2d5a27] rounded-full flex items-center justify-center text-white text-xl shadow-md animate-pulse">
                      🌼
                    </div>

                    <div className="absolute -top-2 -right-2 text-green-400 text-sm animate-bounce-slow">
                      🌿
                    </div>
                    <div
                      className="absolute -bottom-2 -left-2 text-yellow-400 text-xs animate-bounce-slow"
                      style={{ animationDelay: '0.5s' }}
                    >
                      🌼
                    </div>
                  </div>

                  <div className="text-center mt-6">
                    <p className="text-sm text-[#4a7c59] mb-2">
                      Pindutin mo para buksan
                    </p>
                    <div className="inline-block px-4 py-2 bg-green-50 rounded-full text-xs font-medium text-[#2d5a27] border border-green-200 animate-pulse">
                      Special Delivery para sa iyo 🌼
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              // Opened Envelope with Letter
              <motion.div
                key="envelope-opened"
                className="w-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {!showLetter && (
                  <motion.div
                    className="relative w-80 h-56 mx-auto mb-6"
                    style={{ perspective: '1000px' }}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#d4edda] to-[#e8f5e9] rounded-lg shadow-lg border-2 border-green-200"></div>
                    <motion.div
                      className="absolute -top-1 left-0 right-0 h-28 bg-gradient-to-br from-[#7bbf8a] to-[#4a7c59]"
                      style={{
                        clipPath: 'polygon(0px 0px, 100% 0px, 50% 0px)',
                        borderRadius: '8px 8px 0px 0px',
                        transformOrigin: 'top center',
                        transformStyle: 'preserve-3d',
                      }}
                      initial={{ rotateX: 0, y: 0 }}
                      animate={{ rotateX: -160, y: -20 }}
                      transition={{ duration: 0.6, ease: 'easeInOut' }}
                    />
                  </motion.div>
                )}

                {/* Letter emerging */}
                <AnimatePresence>
                  {showLetter && (
                    <motion.div
                      className="relative w-full"
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
                    >
                      <div className="bg-white rounded-xl p-6 sm:p-8 shadow-inner border border-green-100 relative">
                        {/* Gradient overlay */}
                        <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-green-50 to-transparent rounded-xl"></div>

                        {/* Daisy top right */}
                        <div className="absolute -top-6 -right-4 text-5xl animate-float-slow opacity-80 pointer-events-none z-30">
                          🌼
                        </div>

                        {/* Letter content */}
                        <div className="relative z-10">
                          <div className="flex items-center justify-between mb-4 pb-3 border-b border-green-100">
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded-full bg-[#2d5a27] flex items-center justify-center text-white text-sm">
                                🌼
                              </div>
                              <span className="text-sm font-semibold text-[#4a7c59]">
                                Para sa Pinakamagandang Cherrise
                              </span>
                            </div>
                          </div>

                          {/* Letter body */}
                          <div className="handwriting text-sm sm:text-base leading-relaxed text-[#1a3a14] pb-20 pt-6">
                            <div className="mb-4 text-[#2d5a27] font-medium">
                              Mahal kong Cherrise,
                            </div>
                            <div className="mb-4 text-justify" style={{ textIndent: '2rem' }}>
                              Alam ko na hindi pa kita kilala nang ganun kalalim —
                              pero yung bawat bagay na natutunan ko tungkol sa iyo,
                              bawat retrato mong nakita ko, bawat kwento —
                              lahat sila nag-uusap sa akin.
                            </div>
                            <div className="mb-4 text-justify" style={{ textIndent: '2rem' }}>
                              Gusto kitang dalhin sa Intramuros someday —
                              ikaw, ang camera mo, ang kasaysayan ng lugar,
                              at ako sa tabi mo.
                              Gusto kong makita kang mag-picture ng mga bagay na nagpapasaya sa iyo.
                            </div>
                            <div className="mb-4 text-justify" style={{ textIndent: '2rem' }}>
                              Handa akong matuto ng gitara para lang mapaabot sa iyo
                              ang isang kanta — na may bouquet ng daisies sa kamay ko.
                            </div>
                            <div className="mt-6 text-[#4a7c59] font-serif italic text-center">
                              "palagi mong piliin kung saan payapa ang puso mo"
                            </div>
                            <div className="mt-8 ml-auto w-fit">
                              <div className="font-medium text-[#2d5a27]">
                                <TypewriterText
                                  text="Palagi, para sa iyo. 💚"
                                  duration={2}
                                  delay={0}
                                  onComplete={() =>
                                    setTypewriterComplete((prev) => ({
                                      ...prev,
                                      signature: true,
                                    }))
                                  }
                                  showCursor={false}
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Green daisy stamp */}
                        <div className="absolute bottom-4 left-4 transform -rotate-12 animate-float-slow opacity-35">
                          <svg
                            width="120"
                            height="120"
                            viewBox="0 0 200 200"
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-24 h-24"
                          >
                            <defs>
                              <filter id="grain2" x="-20%" y="-20%" width="140%" height="140%">
                                <feTurbulence type="fractalNoise" baseFrequency="1" numOctaves="2" stitchTiles="stitch" result="noise"/>
                                <feColorMatrix type="saturate" values="0" in="noise" result="mono"/>
                                <feComponentTransfer in="mono" result="grain">
                                  <feFuncA type="table" tableValues="0 0 0.15 0.45"/>
                                </feComponentTransfer>
                                <feBlend in="SourceGraphic" in2="grain" mode="multiply"/>
                              </filter>
                            </defs>
                            <g fill="#2d5a27" opacity="0.9" filter="url(#grain2)">
                              {Array.from({ length: 24 }, (_, i) => {
                                const angle = (i / 24) * 2 * Math.PI;
                                const x = 100 + 88 * Math.cos(angle);
                                const y = 100 + 88 * Math.sin(angle);
                                return <circle key={i} cx={x} cy={y} r="3"/>;
                              })}
                            </g>
                            <circle cx="100" cy="100" r="72" stroke="#2d5a27" strokeWidth="5" fill="none" opacity="0.95"/>
                            <circle cx="100" cy="100" r="55" stroke="#4a7c59" strokeWidth="2.5" fill="none" opacity="0.8"/>
                            {/* Daisy center */}
                            <circle cx="100" cy="100" r="12" fill="#f5e642" opacity="0.95" filter="url(#grain2)"/>
                            {[0,45,90,135,180,225,270,315].map((angle, i) => (
                              <ellipse key={i} cx="100" cy="72" rx="6" ry="14" fill="white" opacity="0.9"
                                transform={`rotate(${angle} 100 100)`}/>
                            ))}
                            <path id="topArc2" d="M50 90 A45 45 0 0 1 150 95" fill="none"/>
                            <text fontSize="14" textAnchor="middle" fill="#2d5a27" style={{ fontFamily: 'serif', letterSpacing: '0.2em', fontWeight: 600 }}>
                              <textPath href="#topArc2" startOffset="50%">{stampText.love || ''}</textPath>
                            </text>
                            <path id="bottomArc2" d="M155 110 A55 50 0 0 1 45 110" fill="none"/>
                            <text fontSize="12" textAnchor="middle" fill="#4a7c59" style={{ fontFamily: 'serif', letterSpacing: '0.15em', fontWeight: 500 }}>
                              <textPath href="#bottomArc2" startOffset="50%">{stampText.stamped || ''}</textPath>
                            </text>
                          </svg>
                        </div>

                        {/* Decorative */}
                        {typewriterComplete.signature && (
                          <div className="absolute top-4 left-4 text-green-300 opacity-30 text-xs animate-float-slow">
                            🌿
                          </div>
                        )}
                        <div
                          className="absolute bottom-24 right-4 text-green-300 opacity-30 text-xs animate-float-slow"
                          style={{ animationDelay: '1s' }}
                        >
                          🌼
                        </div>
                      </div>

                      {/* Continue button */}
                      {typewriterComplete.signature &&
                        typewriterComplete.love &&
                        typewriterComplete.stamped && (
                          <div className="flex justify-center mt-6 animate-slideUp">
                            <button
                              onClick={() => setShowPlaylist(true)}
                              className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-[#2d5a27] text-white font-semibold shadow-md transition-all transform hover:scale-105 active:scale-95 hover:bg-[#4a7c59] focus:outline-none focus:ring-4 focus:ring-green-300 cursor-pointer"
                              aria-label="Continue to see more"
                            >
                              May higit pa para sa iyo ✨
                            </button>
                          </div>
                        )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
