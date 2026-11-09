const CONFETTI = Array.from({ length: 42 }, (_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  width: `${6 + Math.random() * 7}px`,
  height: `${7 + Math.random() * 9}px`,
  color: ["#e8375a", "#c8973a", "#ff6b8a", "#fff5f0", "#f48fb1", "#f0c878"][
    Math.floor(Math.random() * 6)
  ],
  delay: `${Math.random() * 6}s`,
  duration: `${5 + Math.random() * 5}s`,
  round: Math.random() > 0.55,
}));

const BALLOONS = Array.from({ length: 9 }, (_, i) => ({
  id: i,
  emoji: ["🎈", "🎀", "💕", "🌹", "✨", "🎊", "💝", "🎉", "🥂"][i],
  left: `${4 + i * 11}%`,
  delay: `${Math.random() * 5}s`,
  duration: `${8 + Math.random() * 5}s`,
  size: `${1.7 + Math.random() * 1.4}rem`,
}));

export default function Celebration() {
  return (
    <div className="celebration" aria-hidden="true">
      {CONFETTI.map((piece) => (
        <span
          key={piece.id}
          className="confetti-piece"
          style={{
            left: piece.left,
            width: piece.width,
            height: piece.height,
            background: piece.color,
            borderRadius: piece.round ? "50%" : "2px",
            animationDelay: piece.delay,
            animationDuration: piece.duration,
          }}
        />
      ))}
      {BALLOONS.map((balloon) => (
        <span
          key={`balloon-${balloon.id}`}
          className="balloon"
          style={{
            left: balloon.left,
            fontSize: balloon.size,
            animationDelay: balloon.delay,
            animationDuration: balloon.duration,
          }}
        >
          {balloon.emoji}
        </span>
      ))}
    </div>
  );
}
