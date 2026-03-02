function FloatingElements() {
  const elements = [
    { emoji: '🌸', top: '10%', left: '5%', delay: '0s', duration: '15s' },
    { emoji: '🌸', top: '20%', left: '90%', delay: '2s', duration: '18s' },
    { emoji: '✿', top: '60%', left: '8%', delay: '4s', duration: '20s' },
    { emoji: '🌸', top: '80%', left: '85%', delay: '1s', duration: '16s' },
    { emoji: '✿', top: '40%', left: '95%', delay: '3s', duration: '19s' },
    { emoji: '💗', top: '15%', left: '80%', delay: '5s', duration: '22s' },
    { emoji: '💗', top: '70%', left: '3%', delay: '2.5s', duration: '17s' },
    { emoji: '⭐', top: '5%', left: '50%', delay: '1.5s', duration: '21s' },
    { emoji: '⭐', top: '90%', left: '40%', delay: '4.5s', duration: '14s' },
    { emoji: '🌸', top: '50%', left: '2%', delay: '0.5s', duration: '23s' },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {elements.map((el, index) => (
        <div
          key={index}
          className="absolute text-xl md:text-2xl opacity-40 animate-float-drift"
          style={{
            top: el.top,
            left: el.left,
            animationDelay: el.delay,
            animationDuration: el.duration,
          }}
        >
          {el.emoji}
        </div>
      ))}
    </div>
  );
}

export default FloatingElements;
