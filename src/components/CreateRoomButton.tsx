import { useContext } from "react";
import { SocketContext } from "../context/SocketContext";

export const CreateRoomButton = () => {
  const { ws } = useContext(SocketContext);

  const createRoom = () => {
    ws?.emit("create-room");
  };
  return (
    <button onClick={createRoom} className="btn btn-primary ">
      Create Room
    </button>
  );
};
