import { useEffect, useRef } from "react";

export const UserRemoteVideo = ({ stream }: any) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) videoRef.current.srcObject = stream;
  }, [stream]);
  return (
    <video
      ref={videoRef}
      className="border border-2"
      autoPlay
      width="320"
      height="240"
    ></video>
  );
};
