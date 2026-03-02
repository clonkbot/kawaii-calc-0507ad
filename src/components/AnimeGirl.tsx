import { useMemo } from 'react';

type Mood = 'idle' | 'thinking' | 'happy' | 'surprised' | 'love' | 'confused';

interface AnimeGirlProps {
  mood: Mood;
  lastResult: number | null;
}

function AnimeGirl({ mood, lastResult }: AnimeGirlProps) {
  const expressions = useMemo(() => ({
    idle: {
      eyes: '◠ ◠',
      mouth: 'ᴗ',
      blush: true,
      message: 'Ready to help~!',
    },
    thinking: {
      eyes: '◉ ◉',
      mouth: '•',
      blush: true,
      message: 'Calculating...',
    },
    happy: {
      eyes: '◠ ◠',
      mouth: '∀',
      blush: true,
      message: lastResult !== null ? `${lastResult}! Yay~!` : 'Perfect!',
    },
    surprised: {
      eyes: '◎ ◎',
      mouth: 'O',
      blush: true,
      message: 'Wow! Big number!',
    },
    love: {
      eyes: '♥ ♥',
      mouth: '∀',
      blush: true,
      message: 'Tehe~ Nice one!',
    },
    confused: {
      eyes: 'x x',
      mouth: '﹏',
      blush: false,
      message: 'Eh? Error...',
    },
  }), [lastResult]);

  const current = expressions[mood];

  return (
    <div className="flex flex-col items-center gap-2 md:gap-3">
      {/* Speech Bubble */}
      <div className="relative animate-bounce-gentle">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-3 py-2 md:px-4 md:py-2 shadow-lg border-2 border-pink-100">
          <p className="text-xs md:text-sm text-pink-500 font-medium whitespace-nowrap">
            {current.message}
          </p>
        </div>
        {/* Speech bubble tail */}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white/90" />
      </div>

      {/* Anime Girl Character */}
      <div className="relative">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-pink-200 rounded-full blur-2xl opacity-30 animate-pulse" />

        {/* Main character container */}
        <div className="relative w-28 h-36 md:w-36 md:h-44">
          {/* Hair (back layer) */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 md:w-36">
            <svg viewBox="0 0 120 140" className="w-full">
              {/* Back hair */}
              <ellipse cx="60" cy="70" rx="50" ry="60" fill="url(#hairGradient)" />
              {/* Hair strands flowing down */}
              <path d="M15 60 Q10 100 20 130" stroke="url(#hairGradient)" strokeWidth="8" fill="none" strokeLinecap="round" />
              <path d="M105 60 Q110 100 100 130" stroke="url(#hairGradient)" strokeWidth="8" fill="none" strokeLinecap="round" />

              <defs>
                <linearGradient id="hairGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FF9ECD" />
                  <stop offset="50%" stopColor="#FFB7D5" />
                  <stop offset="100%" stopColor="#FFCCE5" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Face */}
          <div className="absolute top-6 md:top-8 left-1/2 -translate-x-1/2 w-20 h-20 md:w-24 md:h-24 bg-gradient-to-b from-[#FFF5EE] to-[#FFE4D6] rounded-full shadow-inner border-2 border-pink-100/30">
            {/* Eyes */}
            <div className="absolute top-6 md:top-7 left-0 right-0 flex justify-center gap-4 md:gap-5">
              <span className={`text-lg md:text-xl transition-all duration-300 ${mood === 'love' ? 'text-pink-500' : 'text-gray-800'}`}>
                {current.eyes.split(' ')[0]}
              </span>
              <span className={`text-lg md:text-xl transition-all duration-300 ${mood === 'love' ? 'text-pink-500' : 'text-gray-800'}`}>
                {current.eyes.split(' ')[1]}
              </span>
            </div>

            {/* Blush */}
            {current.blush && (
              <>
                <div className="absolute top-10 md:top-12 left-2 md:left-2 w-4 h-2 md:w-5 md:h-2 bg-pink-300 rounded-full opacity-50" />
                <div className="absolute top-10 md:top-12 right-2 md:right-2 w-4 h-2 md:w-5 md:h-2 bg-pink-300 rounded-full opacity-50" />
              </>
            )}

            {/* Mouth */}
            <div className="absolute top-14 md:top-16 left-0 right-0 flex justify-center">
              <span className={`text-base md:text-lg text-pink-400 transition-all duration-300 ${mood === 'happy' || mood === 'love' ? 'scale-110' : ''}`}>
                {current.mouth}
              </span>
            </div>
          </div>

          {/* Hair (front bangs) */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 md:w-36 pointer-events-none">
            <svg viewBox="0 0 120 50" className="w-full">
              {/* Bangs */}
              <path d="M20 25 Q30 5 40 20 Q50 0 60 20 Q70 0 80 20 Q90 5 100 25" fill="url(#bangsGradient)" />
              {/* Side hair tufts */}
              <ellipse cx="15" cy="35" rx="12" ry="15" fill="url(#bangsGradient)" />
              <ellipse cx="105" cy="35" rx="12" ry="15" fill="url(#bangsGradient)" />

              <defs>
                <linearGradient id="bangsGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#FFB7D5" />
                  <stop offset="100%" stopColor="#FF9ECD" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Hair accessories (bows) */}
          <div className="absolute top-2 md:top-3 left-0 text-lg md:text-xl animate-wiggle">🎀</div>
          <div className="absolute top-2 md:top-3 right-0 text-lg md:text-xl animate-wiggle" style={{ animationDelay: '0.5s' }}>🎀</div>

          {/* Body/Outfit hint */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-10 md:w-20 md:h-12">
            <svg viewBox="0 0 80 50" className="w-full">
              {/* Neck */}
              <rect x="30" y="0" width="20" height="15" fill="#FFF5EE" />
              {/* Collar/outfit */}
              <path d="M10 50 Q40 20 70 50" fill="url(#outfitGradient)" />
              <circle cx="40" cy="35" r="4" fill="#FFD700" /> {/* Brooch */}

              <defs>
                <linearGradient id="outfitGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#E8D4F0" />
                  <stop offset="100%" stopColor="#D4B8E0" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* Sparkle effects */}
        {(mood === 'happy' || mood === 'love') && (
          <>
            <div className="absolute -top-2 -right-2 text-lg animate-sparkle">✨</div>
            <div className="absolute top-4 -left-4 text-sm animate-sparkle" style={{ animationDelay: '0.3s' }}>✨</div>
            <div className="absolute -bottom-2 right-4 text-xs animate-sparkle" style={{ animationDelay: '0.6s' }}>✨</div>
          </>
        )}

        {/* Confusion marks */}
        {mood === 'confused' && (
          <div className="absolute -top-2 right-2 text-lg animate-spin-slow">❓</div>
        )}

        {/* Thinking bubbles */}
        {mood === 'thinking' && (
          <>
            <div className="absolute -top-1 -right-3 w-2 h-2 bg-pink-200 rounded-full animate-float" />
            <div className="absolute -top-4 right-0 w-3 h-3 bg-pink-200 rounded-full animate-float" style={{ animationDelay: '0.2s' }} />
          </>
        )}
      </div>

      {/* Name tag */}
      <div className="bg-gradient-to-r from-pink-200 to-purple-200 px-3 py-1 md:px-4 md:py-1 rounded-full shadow-md">
        <span className="text-xs md:text-sm font-bold text-pink-600">Calc-chan</span>
      </div>
    </div>
  );
}

export default AnimeGirl;
