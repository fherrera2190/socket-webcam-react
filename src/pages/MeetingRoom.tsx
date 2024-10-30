import { useParams } from "react-router";
import { UserLocalVideo } from "../components/UserLocalVideo";
import { useContext, useEffect } from "react";
import { SocketContext } from "../context/SocketContext";
import { UsersConnected } from "../components/UsersConnected";

export const MeetingRoom: React.FC = () => {
  const { ws, me, stream } = useContext(SocketContext);
  const { roomId } = useParams();
  useEffect(() => {
    if (me) ws?.emit("join-room", { roomId, peerId: me.id });
  }, [roomId, me, ws]);
  return (
    <div>
      <h1 className="text-white">Meeting Room {roomId}</h1>
      <h3 className="text-white">peerId: {me?.id}</h3>

      <UserLocalVideo stream={stream} />

      <UsersConnected />
    </div>
  );
};
