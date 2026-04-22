window.App = function App() {
  const { useState, useEffect, useRef, useCallback } = React;
  const [activeCard, setActiveCard] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [packState, setPackState] = useState('sealed');
  const [tearProgress, setTearProgress] = useState(0);
  const [flippedCards, setFlippedCards] = useState([]);
  const packRef = useRef(null);
  const dragStartX = useRef(null);
  const isRipping = useRef(false);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const triggerRip = useCallback(() => {
    if (isRipping.current) return;
    isRipping.current = true;
    setTearProgress(1);
    setTimeout(() => setPackState('torn'), 400);
    setTimeout(() => setPackState('flash'), 800);
    setTimeout(() => {
      setPackState('open');
      CARDS.forEach((_, i) => {
        setTimeout(() => setFlippedCards(prev => [...prev, i]), i * 360 + 200);
      });
    }, 1050);
  }, []);

  const onPointerDown = useCallback((e) => {
    if (packState !== 'sealed') return;
    dragStartX.current = e.touches ? e.touches[0].clientX : e.clientX;
  }, [packState]);

  const onPointerMove = useCallback((e) => {
    if (dragStartX.current === null || packState !== 'sealed') return;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const rect = packRef.current?.getBoundingClientRect();
    if (!rect) return;
    const delta = Math.abs(clientX - dragStartX.current);
    const progress = Math.min(1, delta / (rect.width * 0.65));
    setTearProgress(progress);
    if (progress >= 1) triggerRip();
  }, [packState, triggerRip]);

  const onPointerUp = useCallback(() => {
    if (packState !== 'sealed') return;
    if (tearProgress >= 0.35) {
      triggerRip();
    } else {
      setTearProgress(0);
      dragStartX.current = null;
    }
  }, [packState, tearProgress, triggerRip]);

  const total = CARDS.length;

  const handTransform = (index) => {
    const mid = (total - 1) / 2;
    const offset = index - mid;
    return {
      transform: `translateX(${offset * 42}px) translateY(${Math.abs(offset) * 14}px) rotate(${offset * 7}deg)`,
      zIndex: total - Math.abs(Math.round(offset)),
    };
  };

  const hoverTransform = (index) => {
    const mid = (total - 1) / 2;
    const offset = index - mid;
    return {
      transform: `translateX(${offset * 42}px) translateY(-90px) rotate(${offset * 2}deg) scale(1.1)`,
    };
  };

  const PackContent = () => (
    <>
      <div className="pack-foil" />
      <div className="pack-top-strip">PORTFOLIO PACK</div>
      <div className="pack-art-window">
        <div className="pack-art-glow" />
        <div className="pack-symbol">✦</div>
      </div>
      <div className="pack-name-area">
        <div className="pack-player-name">Christopher Tjahjo</div>
        <div className="pack-edition">Class of 2025 · Full Stack Developer</div>
      </div>
      <div className="pack-bottom-strip">6 CARDS · RARE SET</div>
    </>
  );

  if (isMobile) {
    return (
      <div className="mobile-scene">
        <div className="mobile-header">
          <div className="header-name">Christopher Tjahjo</div>
          <div className="header-tagline">Software Developer · Builder · Wizard</div>
          <div className="header-rule" />
        </div>

        {(packState === 'sealed' || packState === 'torn') && (
          <div className="pack-stage">

            {packState === 'torn' && (
              <>
                <div className="pack-half pack-half-top pack-fly-up">
                  <PackContent />
                </div>
                <div className="pack-half pack-half-bottom pack-fly-down">
                  <PackContent />
                </div>
              </>
            )}

            {packState === 'sealed' && (
              <div
                className="booster-pack"
                ref={packRef}
                onMouseDown={onPointerDown}
                onMouseMove={onPointerMove}
                onMouseUp={onPointerUp}
                onMouseLeave={onPointerUp}
                onTouchStart={onPointerDown}
                onTouchMove={onPointerMove}
                onTouchEnd={onPointerUp}
              >
                <PackContent />

                <svg
                  className="tear-svg"
                  viewBox="0 0 200 320"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="3" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>
                  {tearProgress > 0 && (
                    <polyline
                      filter="url(#glow)"
                      stroke="white"
                      strokeWidth="2.5"
                      fill="none"
                      strokeLinecap="round"
                      style={{ opacity: Math.min(1, tearProgress * 2) }}
                      points={[
                        [0, 156],
                        [18, 150], [36, 162], [54, 154], [72, 160],
                        [90, 152], [108, 158], [126, 150], [144, 162],
                        [162, 154], [180, 158], [200, 155],
                      ]
                        .filter((_, i) => {
                          const pct = i / 11;
                          return pct <= tearProgress;
                        })
                        .map(p => p.join(',')).join(' ')}
                    />
                  )}
                </svg>
              </div>
            )}

            {packState === 'sealed' && (
              <div className="pack-tap-hint" style={{ opacity: tearProgress > 0 ? 0 : 1 }}>
                Swipe across to rip open
              </div>
            )}
          </div>
        )}

        {packState === 'flash' && (
          <div className="pack-flash" />
        )}

        {packState === 'open' && (
          <div className="reveal-stage">
            <div className="reveal-label">Swipe to browse · Tap a card to read</div>
            <div className="reveal-scroll">
              {CARDS.map((card, i) => {
                const isFlipped = flippedCards.includes(i);
                return (
                  <div
                    key={card.id}
                    className={`flip-wrapper ${isFlipped ? 'flipped' : ''}`}
                    style={{ animationDelay: `${i * 0.1}s` }}
                    onClick={() => isFlipped && setActiveCard(card)}
                  >
                    <div className="flip-inner">
                      <div className="card-back-face">
                        <div className="card-back-border">
                          <div className="card-back-oval">
                            <div className="card-back-diamond" />
                          </div>
                        </div>
                      </div>
                      <div className="card-front-face">
                        <MTGCard card={card} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeCard && (
          <CardModal card={activeCard} onClose={() => setActiveCard(null)} />
        )}
      </div>
    );
  }

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
