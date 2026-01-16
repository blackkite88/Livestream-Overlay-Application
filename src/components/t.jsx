export default function TestVideo() {
  return (
    <div style={{ padding: 20 }}>
      <video
        src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
        controls
        autoPlay
        muted
        style={{
          width: 640,
          height: 360,
          background: "black",
          display: "block"
        }}
      />
    </div>
  );
}
