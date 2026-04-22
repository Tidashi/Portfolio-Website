window.App = function App() {
  const { useState, useEffect, useRef, useCallback } = React;
  const [activeCard, setActiveCard] = useState(null);
  const [zoomedProject, setZoomedProject] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [packState, setPackState] = useState('sealed');
  const [tearProgress, setTearProgress] = useState(0);
  const [flippedCards, setFlippedCards] = useState([]);
  const packRef = useRef(null);
  const dragStartX = useRef(null);
  const isRipping = useRef(false);
  const tearProgressRef = useRef(0);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    if (!isMobile) return;
    let startX = null;
    let startY = null;

    const onStart = (e) => {
      if (isRipping.current || packState !== 'sealed') return;
      const t = e.touches ? e.touches[0] : e;
      startX = t.clientX;
      startY = t.clientY;
    };

    const onMove = (e) => {
      if (startX === null || isRipping.current || packState !== 'sealed') return;
      const t = e.touches ? e.touches[0] : e;
      const dx = t.clientX - startX;
      const dy = t.clientY - startY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const progress = Math.min(1, dist / 50);
      tearProgressRef.current = progress;
      setTearProgress(progress);
      if (progress >= 1) { startX = null; triggerRip(); }
    };

    const onEnd = () => {
      if (isRipping.current || packState !== 'sealed') return;
      if (tearProgressRef.current >= 0.1) {
        triggerRip();
      } else {
        tearProgressRef.current = 0;
        setTearProgress(0);
      }
      startX = null;
      startY = null;
    };

    window.addEventListener('touchstart', onStart);
    window.addEventListener('touchmove', onMove, { passive: true });
    window.addEventListener('touchend', onEnd);
    window.addEventListener('mousedown', onStart);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onEnd);

    return () => {
      window.removeEventListener('touchstart', onStart);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend', onEnd);
      window.removeEventListener('mousedown', onStart);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onEnd);
    };
  }, [isMobile, packState, triggerRip]);

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
    if (isRipping.current || packState !== 'sealed') return;
    const touch = e.touches ? e.touches[0] : e;
    dragStartX.current = { x: touch.clientX, y: touch.clientY };
    tearProgressRef.current = 0;
  }, [packState]);

  const onPointerMove = useCallback((e) => {
    if (!dragStartX.current || isRipping.current || packState !== 'sealed') return;
    if (e.cancelable) e.preventDefault();
    const touch = e.touches ? e.touches[0] : e;
    const dx = touch.clientX - dragStartX.current.x;
    const dy = touch.clientY - dragStartX.current.y;
    const delta = Math.sqrt(dx * dx + dy * dy);
    const progress = Math.min(1, delta / 50);
    tearProgressRef.current = progress;
    setTearProgress(progress);
    if (progress >= 1) triggerRip();
  }, [packState, triggerRip]);

  const onPointerUp = useCallback(() => {
    if (isRipping.current || packState !== 'sealed') return;
    if (tearProgressRef.current >= 0.1) {
      triggerRip();
    } else {
      tearProgressRef.current = 0;
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

  const INITIAL_SPOTS = [
    { x: 0.06, y: 0.14, rotZ: -9,  rotX: 32, scale: 0.72 },
    { x: 0.26, y: 0.08, rotZ: 5,   rotX: 30, scale: 0.74 },
    { x: 0.52, y: 0.12, rotZ: -4,  rotX: 31, scale: 0.73 },
    { x: 0.72, y: 0.07, rotZ: 8,   rotX: 29, scale: 0.71 },
  ];

  const [tablePositions, setTablePositions] = useState(() =>
    INITIAL_SPOTS.map(s => ({
      x: s.x * window.innerWidth,
      y: s.y * window.innerHeight,
      rotZ: s.rotZ,
      rotX: s.rotX,
      scale: s.scale,
    }))
  );
  const [draggingIndex, setDraggingIndex] = useState(null);
  const tableDrag = useRef(null);

  useEffect(() => {
    const onMove = (e) => {
      if (!tableDrag.current) return;
      const t = e.touches ? e.touches[0] : e;
      const { index, startX, startY, origX, origY } = tableDrag.current;
      setTablePositions(prev => prev.map((p, i) =>
        i === index ? { ...p, x: origX + (t.clientX - startX), y: origY + (t.clientY - startY) } : p
      ));
    };

    const onUp = (e) => {
      if (!tableDrag.current) return;
      const t = e.changedTouches ? e.changedTouches[0] : e;
      const { index, startX, startY } = tableDrag.current;
      const dist = Math.hypot(t.clientX - startX, t.clientY - startY);
      if (dist < 6) setZoomedProject(TABLE_CARDS[index]);
      setDraggingIndex(null);
      tableDrag.current = null;
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchmove', onMove, { passive: true });
    window.addEventListener('touchend', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend', onUp);
    };
  }, []);

  const startTableDrag = (e, index) => {
    e.stopPropagation();
    const t = e.touches ? e.touches[0] : e;
    tableDrag.current = {
      index,
      startX: t.clientX,
      startY: t.clientY,
      origX: tablePositions[index].x,
      origY: tablePositions[index].y,
    };
    setDraggingIndex(index);
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

      <div className="table-cards-layer">
        {TABLE_CARDS.map((card, i) => {
          const pos = tablePositions[i];
          const isDragging = draggingIndex === i;
          return (
            <div
              key={card.id}
              className={`table-card-spot ${isDragging ? 'is-dragging' : ''}`}
              style={{
                left: pos.x + 'px',
                top:  pos.y + 'px',
                transform: isDragging
                  ? `rotateX(8deg) rotateZ(${pos.rotZ * 0.3}deg) scale(${pos.scale + 0.12})`
                  : `rotateX(${pos.rotX}deg) rotateZ(${pos.rotZ}deg) scale(${pos.scale})`,
                zIndex: isDragging ? 20 : 3,
                cursor: isDragging ? 'grabbing' : 'grab',
                transition: isDragging ? 'none' : 'transform 0.3s ease',
              }}
              onMouseDown={(e) => startTableDrag(e, i)}
              onTouchStart={(e) => startTableDrag(e, i)}
            >
              <MTGCard card={card} isPreview={true} />
              <div className="table-card-label">✦ Drag or click to zoom ✦</div>
            </div>
          );
        })}
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

      {zoomedProject && (
        <ProjectZoom card={zoomedProject} onClose={() => setZoomedProject(null)} />
      )}
    </div>
  );
};
