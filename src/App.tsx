import { useState, useCallback } from 'react';
import Calculator from './components/Calculator';
import AnimeGirl from './components/AnimeGirl';
import FloatingElements from './components/FloatingElements';

type Mood = 'idle' | 'thinking' | 'happy' | 'surprised' | 'love' | 'confused';

function App() {
  const [mood, setMood] = useState<Mood>('idle');
  const [lastResult, setLastResult] = useState<number | null>(null);

  const handleCalculation = useCallback((result: number, operation: string) => {
    setLastResult(result);

    if (isNaN(result) || !isFinite(result)) {
      setMood('confused');
    } else if (operation === '=') {
      if (result === 0) {
        setMood('thinking');
      } else if (Math.abs(result) > 1000000) {
        setMood('surprised');
      } else if (result === 69 || result === 420 || result === 42) {
        setMood('love');
      } else if (result < 0) {
        setMood('thinking');
      } else {
        setMood('happy');
      }
    } else {
      setMood('thinking');
    }

    setTimeout(() => setMood('idle'), 2000);
  }, []);

  const handleButtonPress = useCallback(() => {
    if (mood === 'idle') {
      setMood('thinking');
      setTimeout(() => setMood('idle'), 500);
    }
  }, [mood]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50 relative overflow-hidden flex flex-col">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-pink-200 rounded-full opacity-30 blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-200 rounded-full opacity-30 blur-3xl" />
        <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-rose-200 rounded-full opacity-20 blur-2xl" />
      </div>

      <FloatingElements />

      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-6 md:py-8 gap-4 md:gap-6">
        {/* Title */}
        <div className="text-center mb-2 md:mb-4 animate-fade-in">
          <h1 className="text-2xl md:text-4xl font-bold text-pink-400 tracking-wide drop-shadow-sm">
            Kawaii Calc
          </h1>
          <p className="text-xs md:text-sm text-pink-300 mt-1">~ Your cute calculation companion ~</p>
        </div>

        {/* Main content area */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-4 md:gap-8 w-full max-w-4xl">
          {/* Anime Girl */}
          <div className="order-1 lg:order-1 flex-shrink-0 animate-slide-in-left">
            <AnimeGirl mood={mood} lastResult={lastResult} />
          </div>

          {/* Calculator */}
          <div className="order-2 lg:order-2 animate-slide-in-right">
            <Calculator
              onCalculation={handleCalculation}
              onButtonPress={handleButtonPress}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-3 md:py-4 text-center">
        <p className="text-xs text-pink-300/60 tracking-wide">
          Requested by <span className="font-medium">@flambons</span> · Built by <span className="font-medium">@clonkbot</span>
        </p>
      </footer>
    </div>
  );
}

export default App;
