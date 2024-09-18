import React, { useRef, useEffect, useState } from "react";

const Camera: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // Start the camera stream
  const startCamera = async () => {
    setError("");
    try {
      // Use specific constraints to handle mobile devices (defaulting to the rear camera)
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: "environment" }, // Use "user" for front camera
        },
      });

      // Assign the stream to the video element's srcObject
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setIsCameraActive(true);
      }
    } catch (err) {
      setError("Error accessing camera: " + (err as Error).message);
    }
  };

  // Stop the camera stream
  const stopCamera = () => {
    const stream = videoRef.current?.srcObject as MediaStream | null;
    if (stream) {
      stream.getTracks().forEach((track) => track.stop()); // Stop all tracks
    }
    setIsCameraActive(false);
  };

  // Clean up the stream on component unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <div className="camera-container">
      <h1 className="text-2xl font-bold mb-4">Camera Access</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Video element to display the camera stream */}
      <video
        ref={videoRef}
        className="w-full h-auto border-2 rounded-lg"
        autoPlay
        playsInline
        muted // Ensure mobile compatibility
      />

      {/* Buttons to control the camera */}
      <div className="mt-4">
        {!isCameraActive ? (
          <button
            onClick={startCamera}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Start Camera
          </button>
        ) : (
          <button
            onClick={stopCamera}
            className="px-4 py-2 bg-red-600 text-white rounded"
          >
            Stop Camera
          </button>
        )}
      </div>
    </div>
  );
};

export default Camera;
