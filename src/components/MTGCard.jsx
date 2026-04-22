window.MTGCard = function MTGCard({ card, isPreview, onArtClick }) {
  const { useRef, useCallback } = React;
  const cardRef = useRef(null);

  const onMouseMove = useCallback((e) => {
    if (isPreview || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    cardRef.current.style.transform = `rotateY(${dx * 12}deg) rotateX(${-dy * 12}deg)`;
  }, [isPreview]);

  const onMouseLeave = useCallback(() => {
    if (cardRef.current) cardRef.current.style.transform = '';
  }, []);

  const c = card.color;

  return (
    <div
      className="mtg-card"
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <div className="shimmer-layer" />
      <div className={`card-outer-frame color-${c}`}>
        <div className="card-body">

          <div className={`card-title-row band-${c}`}>
            <span className="card-name">{card.name}</span>
            <div className="mana-row">
              {card.manaCost.map((pip, i) => (
                <div key={i} className={`mana-pip pip-${pip.type}`}>
                  {pip.label || pip.type}
                </div>
              ))}
            </div>
          </div>

          <div
            className={`card-art-frame ${onArtClick ? 'art-clickable' : ''}`}
            onClick={onArtClick}
          >
            <div className={`art-background art-bg-${c}`} />
            <div className="art-emoji">{card.emoji}</div>
            {onArtClick && (
              <div className="art-visit-hint">
                <span>{card.url ? '🌐 Visit Project' : '🔍 View Details'}</span>
              </div>
            )}
          </div>

          <div className={`card-type-row band-${c}`}>
            <span>
              {card.supertype}
              {card.subtype ? ` — ${card.subtype}` : ''}
            </span>
            <span className="set-symbol">★</span>
          </div>

          <div className="card-text-box">
            {card.abilities.map((ab, i) => (
              <div key={i} className="ability-line">
                <span className="ability-keyword">{ab.keyword}</span>
                {ab.text}
              </div>
            ))}
            {card.flavor && (
              <div className="flavor-text">{card.flavor}</div>
            )}
          </div>

          <div className="card-bottom-row">
            <span className="collector-info">CJ ★ {card.collectorNum}</span>
            {card.pt && <div className="power-box">{card.pt}</div>}
          </div>

        </div>
      </div>
    </div>
  );
};
