export default function ScanQR() {
  return (
    <>
      <h1 className="text-center text-xl font-bold my-4">Scan Marker AR</h1>

      <a-scene
        embedded
        arjs="sourceType: webcam;"
        vr-mode-ui="enabled: false"
        renderer="logarithmicDepthBuffer: true;"
      >
        <a-marker preset="hiro">
          <a-box position="0 0.5 0" material="color: red;"></a-box>
        </a-marker>
        <a-entity camera></a-entity>
      </a-scene>
    </>
  );
}
