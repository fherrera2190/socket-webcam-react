import { useParams } from "react-router";
import { UserLocalVideo } from "../components/UserLocalVideo";
import { useContext, useEffect } from "react";
import { SocketContext } from "../context/SocketContext";

export const MeetingRoom: React.FC = () => {
  const { ws, me, stream } = useContext(SocketContext);
  const { roomId } = useParams();

  useEffect(() => {
    if (me) ws?.emit("join-room", { roomId, peerId: me.id });
  }, [roomId, me, ws]);
  return (
    <div>
      <h1 className="text-white">Meeting Room {roomId}</h1>
      <UserLocalVideo stream={stream} />
    </div>
  );
};
