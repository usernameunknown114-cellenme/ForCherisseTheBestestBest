'use client';

import { useState } from 'react';

interface PlaylistProps {
  onContinue: () => void;
}

const songs = [
  {
    id: 1,
    title: 'The Way You Look Tonight',
    artist: 'Frank Sinatra',
    emoji: '🎩',
    note: 'Every time I hear this, I think of you.',
    src: '/assets/music1-Bpgt1BZ5.mp3',
  },
  {
    id: 2,
    title: "I End Up With You",
    artist: 'Skeet Davis',
    emoji: '🌼',
    note: "Because isn't this how every good story ends?",
    src: '/assets/music2-mdcMq3L1.mp3',
  },
  {
    id: 3,
    title: 'At Last',
    artist: 'Etta James',
    emoji: '🌹',
    note: 'At last — the one worth waiting for.',
    src: '/assets/music3-ClPh4k2q.mp3',
  },
];

export default function Playlist({ onContinue }: PlaylistProps) {
  const [playing, setPlaying] = useState<number | null>(null);
  const [audioElements, setAudioElements] = useState<{ [key: number]: HTMLAudioElement }>({});

  const handlePlay = (songId: number, src: string) => {
    // Pause all
    Object.values(audioElements).forEach((a) => { a.pause(); a.currentTime = 0; });

    if (playing === songId) {
      setPlaying(null);
      return;
    }

    let audio = audioElements[songId];
    if (!audio) {
      audio = new Audio(src);
      setAudioElements((prev) => ({ ...prev, [songId]: audio }));
    }
    audio.play().catch(() => {});
    audio.onended = () => setPlaying(null);
    setPlaying(songId);
  };

  return (
    <div className="page-container font-display relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-8">
      {/* Floating elements */}
      <div className="absolute top-8 left-8 text-3xl animate-float-slow opacity-50">🎵</div>
      <div className="absolute right-8 top-12 text-2xl animate-float opacity-40">🌼</div>
      <div className="absolute left-10 bottom-20 text-2xl animate-float-slow opacity-40">🌿</div>

      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-6 animate-slideDown">
          <h2 className="text-[#2d5a27] text-xl sm:text-2xl font-bold">
            Para sa iyong Pandinig 🎵
          </h2>
          <p className="text-xs text-[#4a7c59] mt-1">
            Mga kanta para sa iyo — sa iyong mga paboritong artists
          </p>
        </div>

        {/* Songs */}
        <div className="bg-[#f7faf5] rounded-2xl border border-green-200 shadow-xl p-5 sm:p-6 space-y-4 animate-fadeIn">
          {songs.map((song, i) => (
            <div
              key={song.id}
              className="flex items-center gap-4 p-4 rounded-xl bg-white border border-green-100 hover:border-green-300 transition-all animate-slideUp cursor-pointer group"
              style={{ animationDelay: `${i * 0.15}s` }}
              onClick={() => handlePlay(song.id, song.src)}
            >
              {/* Icon / play button */}
              <div className="w-12 h-12 rounded-full bg-[#2d5a27] flex items-center justify-center text-white text-xl flex-shrink-0 shadow-md group-hover:scale-110 transition-transform">
                {playing === song.id ? '⏸' : song.emoji}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="font-bold text-[#1a3a14] text-sm sm:text-base truncate">
                  {song.title}
                </div>
                <div className="text-xs text-[#4a7c59] font-medium">{song.artist}</div>
                <div className="text-xs text-[#2d5a27]/60 italic mt-0.5">{song.note}</div>
              </div>

              {/* Playing bars */}
              {playing === song.id && (
                <div className="flex items-end gap-0.5 h-5 flex-shrink-0">
                  <div className="w-1 bg-[#2d5a27] rounded animate-music-bar-1"></div>
                  <div className="w-1 bg-[#4a7c59] rounded animate-music-bar-2"></div>
                  <div className="w-1 bg-[#7bbf8a] rounded animate-music-bar-3"></div>
                </div>
              )}
            </div>
          ))}

          {/* Note about music */}
          <div className="text-center text-xs text-[#4a7c59]/70 pt-2 italic">
            Someday serenadahan kita ng live — promise ito. 🎸
          </div>
        </div>

        {/* Continue */}
        <div className="flex justify-center mt-6">
          <button
            onClick={onContinue}
            className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-[#2d5a27] text-white font-semibold shadow-md transition-all transform hover:scale-105 active:scale-95 hover:bg-[#4a7c59] focus:outline-none focus:ring-4 focus:ring-green-300 cursor-pointer"
          >
            May surpresa pa ✨
          </button>
        </div>
      </div>
    </div>
  );
}
