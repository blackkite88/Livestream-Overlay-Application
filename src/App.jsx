import { useState, useEffect } from 'react';
import VideoPlayer from './components/VideoPlayer';
import OverlayForm from './components/OverlayForm';
import OverlayList from './components/OverlayList';
import { overlayAPI } from './services/api';
import './App.css';

function App() {
  const [inputUrl, setInputUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [overlays, setOverlays] = useState([]);
  const [editingOverlay, setEditingOverlay] = useState(null);
  const [loading, setLoading] = useState(false);
  const [videoContainer, setVideoContainer] = useState(null);

  useEffect(() => {
    loadOverlays();
  }, []);

  const loadOverlays = async () => {
    try {
      setLoading(true);
      const data = await overlayAPI.getAllOverlays();
      setOverlays(data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveOverlay = async (overlayData) => {
    try {
      setLoading(true);
      if (editingOverlay) {
        await overlayAPI.updateOverlay(editingOverlay.id, overlayData);
      } else {
        await overlayAPI.createOverlay(overlayData);
      }
      await loadOverlays();
      setEditingOverlay(null);
    } finally {
      setLoading(false);
    }
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    if (!videoContainer) return;

    const overlayId = e.dataTransfer.getData('overlayId');
    const overlay = overlays.find(o => o.id === overlayId);
    if (!overlay) return;

    const rect = videoContainer.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    await overlayAPI.updateOverlay(overlayId, {
      position_x: x,
      position_y: y
    });

    loadOverlays();
  };

  const handleDeleteOverlay = async (id) => {
  if (!window.confirm("Delete this overlay?")) return;

  try {
    setLoading(true);
    await overlayAPI.deleteOverlay(id);
    await loadOverlays();
  } catch (e) {
    console.error(e);
    alert("Failed to delete overlay");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="app-container">
      <div className="app-content">

        <header className="app-header">
          <h1>Livestream Overlay Application</h1>
          <p>Play HLS / MP4 streams and add custom overlays</p>
        </header>

        <div className="url-input-section">
          <label>Stream URL (MP4 / M3U8)</label>
          <div className="url-input-group">
            <input
              className="url-input"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              placeholder="https://example.com/video.mp4"
            />
            <button onClick={() => setVideoUrl(inputUrl)}>Load</button>
          </div>
        </div>

        <div
          className="video-section"
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          <VideoPlayer
            videoUrl={videoUrl}
            overlays={overlays}
            onVideoReady={setVideoContainer}
          />
        </div>

        <div className="controls-section">
          <div className="controls-grid">
            <OverlayForm
              overlay={editingOverlay}
              onSave={handleSaveOverlay}
              onCancel={() => setEditingOverlay(null)}
            />
            <OverlayList
              overlays={overlays}
              onEdit={setEditingOverlay}
              onDelete={handleDeleteOverlay}
            />

          </div>
        </div>

        {loading && (
          <div className="loading-overlay">
            <div className="loading-spinner">Loading…</div>
          </div>
        )}

      </div>
    </div>
  );
}

export default App;
