import { useRef, useEffect } from "react";
import "../styles/VideoPlayer.css";

const VideoPlayer = ({ videoUrl, overlays = [], onVideoReady }) => {
  const containerRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    if (containerRef.current && onVideoReady) {
      onVideoReady(containerRef.current);
    }
  }, [onVideoReady]);

  return (
    <div className="vp-root">
      <div className="vp-video-box" ref={containerRef}>
        <video
          ref={videoRef}
          className="vp-video"
          controls
          muted
          playsInline
        >
          {videoUrl && <source src={videoUrl} />}
        </video>

        {overlays.map((overlay) => (
          <div
            key={overlay.id}
            className="video-overlay"
            style={{
              left: overlay.position_x,
              top: overlay.position_y
            }}
          >
            {overlay.type === "text" ? (
              <div
                className="overlay-text"
                style={{
                  fontSize: overlay.font_size,
                  color: overlay.color
                }}
              >
                {overlay.content}
              </div>
            ) : (
              <img
                src={overlay.content}
                className="overlay-image"
                alt=""
                style={{
                  width: overlay.width,
                  height: overlay.height
                }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoPlayer;
