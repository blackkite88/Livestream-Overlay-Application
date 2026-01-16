import '../styles/OverlayList.css';

const OverlayList = ({ overlays, onEdit, onDelete, onDragStart }) => {
  return (
    <div className="overlay-list-container">
      <h3>Active Overlays</h3>
      {overlays.length === 0 ? (
        <p className="no-overlays">No overlays created yet. Create one above!</p>
      ) : (
        <div className="overlay-list">
          {overlays.map((overlay) => (
            <div
              key={overlay.id}
              className="overlay-item"
              draggable
              onDragStart={(e) => onDragStart && onDragStart(e, overlay)}
            >
              <div className="overlay-info">
                <div className="overlay-type-badge">{overlay.type}</div>
                <div className="overlay-content">
                  {overlay.type === 'text' ? (
                    <span className="text-preview" style={{ color: overlay.color }}>
                      {overlay.content}
                    </span>
                  ) : (
                    <span className="image-preview">
                      <img src={overlay.content} alt="Overlay" />
                    </span>
                  )}
                </div>
                <div className="overlay-position">
                  Position: ({overlay.position_x}, {overlay.position_y})
                </div>
              </div>
              <div className="overlay-actions">
                <button
                  onClick={() => onEdit(overlay)}
                  className="btn-edit"
                  title="Edit overlay"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => onDelete(overlay.id)}
                  className="btn-delete"
                  title="Delete overlay"
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OverlayList;
