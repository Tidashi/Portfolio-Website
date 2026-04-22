window.ProjectZoom = function ProjectZoom({ card, onClose }) {
  const { useEffect } = React;

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  const handleArtClick = () => {
    if (card.url) window.open(card.url, '_blank');
  };

  return (
    <div className="zoom-backdrop" onClick={onClose}>
      <div className="zoom-panel" onClick={(e) => e.stopPropagation()}>

        <div className="zoom-card-col">
          <div className="zoom-card-wrapper">
            <MTGCard
              card={card}
              isPreview={true}
              onArtClick={card.url ? handleArtClick : null}
            />
          </div>
          {card.url && (
            <a
              className="zoom-visit-btn"
              href={card.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
            >
              🌐 Visit Project →
            </a>
          )}
        </div>

        <div className="zoom-details-col">
          <div className="zoom-card-name">{card.name}</div>
          <div className="zoom-period">{card.period}</div>
          <div className="zoom-divider" />
          <div className="zoom-description">{card.description}</div>
          <div className="zoom-tech-heading">Tech Stack</div>
          <div className="tag-cluster">
            {card.tech.map((t) => (
              <span key={t} className="skill-tag">{t}</span>
            ))}
          </div>
          <button className="modal-close-button zoom-close" onClick={onClose}>
            ✦ BACK TO TABLE ✦
          </button>
        </div>

      </div>
    </div>
  );
};
