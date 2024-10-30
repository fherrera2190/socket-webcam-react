import { useEffect, useRef, useState } from "react";

export const UserLocalVideo = ({ stream }: any) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [micState, setMicState] = useState(false);
  useEffect(() => {
    if (videoRef.current) videoRef.current.srcObject = stream;
  }, [stream]);

  const playVideo = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const pauseVideo = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      stream.getTracks().forEach((track) => track.stop());
    }
  };
  const muteAudio = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
    }
  };
  return (
    <div className="w-100 d-flex flex-column my-4">
      <div className="w-100 d-flex justify-content-center">
        <video
          ref={videoRef}
          className="border border-2"
          width="640"
          height="480"
        ></video>
      </div>
      <div className="d-flex align-items-center justify-content-evenly">
        <div className="video-options my-3">
          <select name="" id="select-devices" className="custom-select">
            <option value="">Select camera</option>
          </select>
        </div>
        <div className="controls d-flex justify-content-end gap-3">
          <button
            className="btn btn-primary play"
            title="Play"
            onClick={playVideo}
          >
            <i className="bi bi-play-circle"></i>
          </button>
          <button
            className="btn btn-warning pause"
            title="Pause"
            onClick={pauseVideo}
          >
            <i className="bi bi-pause-circle"></i>
          </button>
          <button
            className="btn btn-warning pause"
            title="Mute"
            onClick={muteAudio}
          >
            <i className="bi bi-mic-mute"></i>
          </button>
        </div>
      </div>
    </div>
  );
};
