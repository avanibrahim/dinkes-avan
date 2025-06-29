export default function ARViewer() {
    return (
      <div className="w-full h-screen bg-gray-100">
        <h1 className="text-xl font-bold text-center py-4">Augmented Reality Demo</h1>
  
        <iframe
          src="/test-ar.html"
          title="AR Camera"
          width="100%"
          height="100%"
          allow="camera; fullscreen;"
          style={{ border: "none", minHeight: "90vh" }}
        />
      </div>
    );
  }
  