window.App = function App() {
  const { useState } = React;
  const [activeCard, setActiveCard] = useState(null);

  const total = CARDS.length;

  const handTransform = (index) => {
    const mid = (total - 1) / 2;
    const offset = index - mid;
    const angle = offset * 7;
    const arcDip = Math.abs(offset) * 14;
    const xShift = offset * 42;
    return {
      transform: `translateX(${xShift}px) translateY(${arcDip}px) rotate(${angle}deg)`,
      zIndex: total - Math.abs(Math.round(offset)),
    };
  };

  const hoverTransform = (index) => {
    const mid = (total - 1) / 2;
    const offset = index - mid;
    const angle = offset * 7;
    const xShift = offset * 42;
    return {
      transform: `translateX(${xShift}px) translateY(-90px) rotate(${angle * 0.3}deg) scale(1.1)`,
    };
  };

  return (
    <div className="scene">
      <div className="table-felt" />
      <div className="wood-rail" />
      <div className="table-floor" />

      <div className="site-header">
        <div className="header-name">Christopher Tjahjo</div>
        <div className="header-tagline">Software Developer · Builder · Wizard</div>
        <div className="header-rule" />
      </div>

      <div className="player-label">Your Hand</div>

      <div className="hand-zone">
        {CARDS.map((card, i) => {
          const base = handTransform(i);
          const hover = hoverTransform(i);
          return (
            <div
              key={card.id}
              className="hand-slot"
              style={base}
              onMouseEnter={(e) => {
                Object.assign(e.currentTarget.style, hover);
                e.currentTarget.style.zIndex = 50;
              }}
              onMouseLeave={(e) => {
                Object.assign(e.currentTarget.style, base);
              }}
              onClick={() => setActiveCard(card)}
            >
              <MTGCard card={card} />
              <div className="tap-hint">✦ Tap to read ✦</div>
            </div>
          );
        })}
      </div>

      {activeCard && (
        <CardModal card={activeCard} onClose={() => setActiveCard(null)} />
      )}
    </div>
  );
};
