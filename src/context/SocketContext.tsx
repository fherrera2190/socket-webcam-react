import Peer from "peerjs";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Manager, Socket } from "socket.io-client";
import { v4 as uuidV4 } from "uuid";

const manager = new Manager("http://localhost:3000");
const ws: Socket = manager.socket("/webcam-ws");
// export type SocketContextType = Socket | null;

export interface SocketContextType {
  ws?: Socket;
  me?: Peer;
  stream?: MediaStream;
}

export const SocketContext = createContext<SocketContextType>({
  ws,
});

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();

  const [me, setMe] = useState<Peer>();
  const [stream, setStream] = useState<MediaStream>();

  const enterRoom = (roomId: string) => {
    navigate(`/meeting-room/${roomId}`);
  };

  const getUsers = ({ users }: { users: string[] }) => {
    console.log(users);
  };

  useEffect(() => {
    const meId = uuidV4();
    const peer = new Peer(meId);
    setMe(peer);

    try {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          setStream(stream);
        });
    } catch (error) {
      console.log(error);
    }

    ws.on("connect", () => {
      console.log("connectado");
    });

    ws.on("disconnect", () => {
      console.log("desconectado");
    });

    //    ws.on("broadcastVideo", () => {});

    ws.on("user-disconnected", (peerId) => {
      console.log("user-disconnected", peerId);
    });

    ws.on("room-created", enterRoom);
    ws.on("get-users", getUsers);
  }, []);

  useEffect(() => {
    if (!me) return;
    if (!stream) return;
    ws.on("user-joined", (peerId) => {
      const call = me.call(peerId, stream);
    });

    me.on("call", (call) => {
      call.answer(stream);
    });
  }, [me, stream]);
  return (
    <SocketContext.Provider value={{ ws, me, stream }}>
      {children}
    </SocketContext.Provider>
  );
};
