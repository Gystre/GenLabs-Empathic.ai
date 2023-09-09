import { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import "./App.css";

function App() {
  const [videoSources, setVideoSources] = useState<Array<MediaDeviceInfo>>([]);
  const [selectedSource, setSelectedSource] = useState<string>();
  const webcamRef = useRef<any>(null);

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      const videoSources = devices.filter(
        (device) => device.kind === "videoinput"
      );

      setVideoSources(videoSources);

      // Select the default video source (you can change this logic)
      if (videoSources.length > 0) {
        setSelectedSource(videoSources[0].deviceId);
      }
    });
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          marginBottom: 20,
        }}
      >
        <select
          onChange={(e) => setSelectedSource(e.target.value)}
          value={selectedSource}
        >
          {videoSources.map((source) => (
            <option key={source.deviceId} value={source.deviceId}>
              {source.label}
            </option>
          ))}
        </select>
      </div>
      <Webcam
        audio={false}
        ref={webcamRef}
        videoConstraints={{
          deviceId: selectedSource,
        }}
        mirrored={true}
      />
      <div
        style={{
          marginTop: 20,
        }}
      >
        Current emotion:
      </div>
    </div>
  );
}

export default App;
