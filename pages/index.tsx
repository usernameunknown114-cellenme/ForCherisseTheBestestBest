'use client';

import { useState } from 'react';
import Head from 'next/head';
import Hero from '@/components/Hero';
import MessageCard from '@/components/MessageCard';
import Confetti from '@/components/Confetti';
import { Toaster } from '@/lib/toast';

export default function Home() {
  const [isGiftOpened, setIsGiftOpened] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleOpenGift = () => {
    setIsGiftOpened(true);
    setShowConfetti(true);
  };

  const handleConfettiComplete = () => {
    setShowConfetti(false);
  };

  const handleRestart = () => {
    setIsGiftOpened(false);
    setShowConfetti(false);
  };

  const toastOptions = {
    duration: 3000,
    style: {
      background: 'var(--primary)',
      color: 'var(--text)',
      borderRadius: '12px',
      padding: '12px 20px',
      fontSize: '14px',
    },
  };

  return (
    <>
      <Head>
        <title>Para sa iyo, Cherrise 🌼</title>
        <meta
          name="description"
          content="A little world made just for you, Cherrise — with all my heart."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="Made with 💚" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="theme-color" content="#2d5a27" />
      </Head>

      <main className="min-h-screen">
        {!isGiftOpened && (
          <Hero onOpenGift={handleOpenGift} isGiftOpened={isGiftOpened} />
        )}
        {isGiftOpened && (
          <MessageCard isRevealed={isGiftOpened} onRestart={handleRestart} />
        )}
        <Confetti trigger={showConfetti} onComplete={handleConfettiComplete} />

        <footer className="px-4 py-8 text-center text-green-800/60 relative z-50">
          <p className="text-sm font-serif italic">
            "palagi mong piliin kung saan payapa ang puso mo"
          </p>
          <p className="text-xs mt-2">Made with 💚 para sa iyo</p>
        </footer>
      </main>

      <Toaster position="bottom-center" toastOptions={toastOptions} />
    </>
  );
}
