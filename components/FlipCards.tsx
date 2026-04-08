'use client';

import { useState, useEffect } from 'react';
import FinalLetter from './FinalLetter';

interface FlipCardsProps {
  onRestart?: () => void;
}

interface Card {
  id: number;
  emoji: string;
  front: string;
  message: string;
  color: string;
  delay: number;
}

const cards: Card[] = [
  {
    id: 1,
    emoji: '📷',
    front: 'Photography',
    message:
      'Nakikita ko ang mundong nasa lente ng camera mo — at gusto kong kasama ka sa bawat retrato. Someday, Intramuros, ikaw at ako. 🌿',
    color: 'from-green-200 to-emerald-200',
    delay: 0,
  },
  {
    id: 2,
    emoji: '🌼',
    front: 'Daisies',
    message:
      "Pag nakita ko ang daisy, naiisip kita agad. First time ko sa bahay mo, may bouquet ito — para sa iyo. That's a promise. 💚",
    color: 'from-yellow-100 to-green-100',
    delay: 0.15,
  },
  {
    id: 3,
    emoji: '🐱',
    front: 'Meng & the kiddos',
    message:
      'Mahal mo sila nang buong puso — at yan ang nagpapakita kung gaano kagandang tao ka. Sana makilala ko si Meng someday. 🍃',
    color: 'from-teal-100 to-green-200',
    delay: 0.3,
  },
  {
    id: 4,
    emoji: '🎵',
    front: 'Old Songs',
    message:
      "Frank Sinatra, Etta James, Skeet Davis, The Platters — sineserenade ka na nila noon pa. Serenade kita someday, live. 🎶",
    color: 'from-amber-100 to-yellow-100',
    delay: 0.45,
  },
  {
    id: 5,
    emoji: '🎨',
    front: 'Your Art',
    message:
      'You are a gifted and passionate artist. The way you create things — it speaks of someone who feels deeply. Keep going. 🌿',
    color: 'from-lime-100 to-emerald-100',
    delay: 0.6,
  },
  {
    id: 6,
    emoji: '🏛️',
    front: 'History',
    message:
      'Isang araw, lalakad tayo sa Intramuros — mo ang camera, ako ang kasama mo. Stories ng nakaraan, kasama ang hinaharap natin. 💚',
    color: 'from-stone-100 to-green-100',
    delay: 0.75,
  },
];

export default function FlipCards({ onRestart }: FlipCardsProps) {
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());
  const [showModal, setShowModal] = useState(false);
  const [showFinalLetter, setShowFinalLetter] = useState(false);

  const handleCardClick = (cardId: number) => {
    setFlippedCards((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(cardId)) newSet.delete(cardId);
      else newSet.add(cardId);
      return newSet;
    });
  };

  useEffect(() => {
    if (flippedCards.size === cards.length) {
      const timer = setTimeout(() => setShowModal(true), 3500);
      return () => clearTimeout(timer);
    }
  }, [flippedCards.size]);

  const progress = (flippedCards.size / cards.length) * 100;

  if (showFinalLetter) return <FinalLetter onRestart={onRestart} />;

  return (
    <div className="page-container font-display relative min-h-screen flex flex-col items-center justify-center px-3 sm:px-4 md:px-6 py-4">
      {/* Floating decorations */}
      <div className="absolute top-8 left-4 text-3xl animate-float-slow opacity-50">🌼</div>
      <div className="absolute right-4 top-10 text-2xl animate-float opacity-40">🌿</div>
      <div className="absolute left-6 bottom-16 text-2xl animate-float-slow opacity-40">🍃</div>

      <div className="w-full max-w-5xl">
        {/* Header */}
        <div className="flex items-center justify-center gap-2 mb-4 sm:mb-6 animate-slideDown">
          <div className="text-center">
            <h2 className="text-[#2d5a27] text-base sm:text-xl font-bold leading-tight">
              Mga Bagay na Nagpapalaki ng Ngiti Ko
            </h2>
            <div className="text-xs text-[#4a7c59] mt-0.5">
              I-tap ang bawat card — para sa iyo ito ✨
            </div>
          </div>
        </div>

        {/* Cards Container */}
        <div className="bg-[#f7faf5] rounded-2xl sm:rounded-3xl p-3 sm:p-5 md:p-6 border border-green-200 shadow-xl animate-fadeIn">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
            {cards.map((card) => {
              const isFlipped = flippedCards.has(card.id);
              return (
                <div
                  key={card.id}
                  className="relative h-44 sm:h-48 md:h-52 cursor-pointer perspective-1000 group animate-slideUp"
                  style={{ animationDelay: `${card.delay}s` }}
                  onClick={() => handleCardClick(card.id)}
                >
                  <div
                    className="relative w-full h-full transition-transform duration-700 preserve-3d"
                    style={{ transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
                  >
                    {/* Front of card */}
                    <div className={`absolute w-full h-full rounded-lg border-2 border-green-100 shadow-lg backface-hidden overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300 bg-gradient-to-br ${card.color} flex flex-col items-center justify-center`}>
                      <div className="text-5xl mb-2">{card.emoji}</div>
                      <div className="text-sm font-bold text-[#2d5a27] text-center px-2">{card.front}</div>
                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="px-2 py-1 bg-white/95 rounded-full text-xs font-medium text-[#4a7c59] border border-green-100 shadow-lg animate-pulse">
                          ✨ Tap!
                        </div>
                      </div>
                      <div className="absolute top-1.5 right-1.5 text-xs animate-sparkle">🌿</div>
                    </div>

                    {/* Back of card */}
                    <div className="absolute w-full h-full bg-white rounded-lg border-2 border-green-200 shadow-lg rotate-y-180 backface-hidden p-3 sm:p-4 flex flex-col justify-center">
                      <div className="text-center space-y-2 h-full flex flex-col justify-center">
                        <div className="text-lg mb-1">{card.emoji}</div>
                        <div className="flex-1 flex items-center justify-center">
                          <div className="text-xs sm:text-sm leading-relaxed text-[#1a3a14] px-1 overflow-y-auto max-h-full handwriting">
                            {card.message}
                          </div>
                        </div>
                        <div className="pt-1">
                          <div className="px-2 py-1 bg-green-50 rounded-full text-xs font-medium text-[#4a7c59] border border-green-100 inline-block hover:bg-green-100 transition-colors cursor-pointer">
                            I-tap ulit para ibalik
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Progress */}
          <div className="text-center py-2 sm:py-3">
            <div className="text-xs sm:text-sm text-[#4a7c59] font-medium">
              {flippedCards.size === 0
                ? 'Simulan mo na — i-tap ang anumang card ✨'
                : flippedCards.size === cards.length
                ? 'Nabuksan mo na lahat! 💚'
                : `${flippedCards.size} / ${cards.length} — tuloy lang! 🌿`}
            </div>
            <div className="mt-2 w-full max-w-xs mx-auto bg-green-100 rounded-full h-1.5 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#2d5a27] to-[#7bbf8a] rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl p-5 sm:p-6 max-w-sm w-full mx-4 shadow-2xl animate-popUp border-2 border-green-200">
            <div className="text-center space-y-3 sm:space-y-4">
              <div className="text-4xl animate-bounce">🌼</div>
              <h3 className="text-lg sm:text-xl font-bold text-[#2d5a27]">
                Nabuksan mo na lahat!
              </h3>
              <p className="text-sm text-[#4a7c59] leading-relaxed">
                Bawat card — isang bagay na nagpapasaya sa akin tungkol sa iyo. ✨
              </p>
              <div className="space-y-2.5 pt-1">
                <button
                  onClick={() => { setShowModal(false); setShowFinalLetter(true); }}
                  className="w-full inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-[#2d5a27] text-white font-semibold shadow-lg transition-all transform hover:scale-105 active:scale-95 hover:bg-[#4a7c59] text-sm cursor-pointer"
                >
                  Buksan ang huling liham 💌
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="w-full text-xs text-[#4a7c59] hover:text-[#2d5a27] transition-colors cursor-pointer"
                >
                  Nandito pa muna ako sandali
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
