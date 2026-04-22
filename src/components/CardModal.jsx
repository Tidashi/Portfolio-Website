window.CardModal = function CardModal({ card, onClose }) {
  const { useEffect } = React;

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-panel" onClick={(e) => e.stopPropagation()}>

        <div className="modal-card-large">
          <div className="hand-slot">
            <MTGCard card={card} isPreview={true} />
          </div>
        </div>

        <div className="modal-details">
          <div className="modal-card-name">{card.name}</div>
          <div className="modal-card-type">{card.modal.type}</div>

          {card.modal.sections.map((section, i) => (
            <div key={i} className="modal-section">
              <div className="modal-section-heading">{section.heading}</div>
              {section.text && (
                <div className="modal-section-text">{section.text}</div>
              )}
              {section.tags && (
                <div className="tag-cluster">
                  {section.tags.map((tag) => (
                    <span key={tag} className="skill-tag">{tag}</span>
                  ))}
                </div>
              )}
            </div>
          ))}

          <button className="modal-close-button" onClick={onClose}>
            ✦ RETURN TO HAND ✦
          </button>
        </div>

      </div>
    </div>
  );
};
