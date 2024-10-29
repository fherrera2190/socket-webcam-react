import { useEffect, useRef } from "react";

export const UserLocalVideo = ({ stream }: any) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) videoRef.current.srcObject = stream;
  }, [stream]);

  return (
    <div className="w-100 d-flex flex-column my-4">
      <div className="w-100 d-flex justify-content-center">
        <video
          ref={videoRef}
          className="border border-2"
          autoPlay
          muted={true}
          width="640"
          height="480"
        ></video>
        <canvas
          id="canvas-local"
          className="d-none"
          width="640"
          height="480"
        ></canvas>
      </div>
      <div className="d-flex align-items-center justify-content-evenly">
        <div className="video-options my-3">
          <select name="" id="select-devices" className="custom-select">
            <option value="">Select camera</option>
          </select>
        </div>
        <div className="controls d-flex justify-content-end gap-3">
          <button
            id="btn-play-local"
            className="btn btn-primary play"
            title="Play"
          >
            <i className="bi bi-play-circle"></i>
          </button>
          <button
            id="btn-pause-local"
            className="btn btn-warning pause"
            title="Pause"
          >
            <i className="bi bi-pause-circle"></i>
          </button>
        </div>
      </div>
    </div>
  );
};
