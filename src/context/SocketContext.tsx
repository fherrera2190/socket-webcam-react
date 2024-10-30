import Peer from "peerjs";
import { createContext, useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router";
import { v4 as uuidV4 } from "uuid";
import { peerReducer } from "./peerReducer";
import { addPeerAction } from "./peerActions";
import { SocketContextType } from "../interfaces/socket-context-type.interface";
import { ws } from "../constants";

export const SocketContext = createContext<SocketContextType>({
  ws,
});

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();

  const [me, setMe] = useState<Peer>();
  const [stream, setStream] = useState<MediaStream>();
  const [peers, dispatch] = useReducer(peerReducer, {});
  const enterRoom = (roomId: string) => {
    navigate(`/meeting-room/${roomId}`);
  };

  const getUsers = ({ users }: { users: string[] }) => {
    //console.log(users);
  };

  useEffect(() => {
    const meId = uuidV4();
    const peer = new Peer(meId, {
      host: "127.0.0.1",
      port: 14000,
      path: "/peerjs",
    });
    setMe(peer);

    try {
      navigator.mediaDevices
        .getUserMedia({ video: false, audio: true })
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

    ws.on("user-disconnected", (peerId) => {
      console.log("user-disconnected", peerId);
    });

    ws.on("room-created", enterRoom);
    ws.on("get-users", getUsers);
  }, []);

  useEffect(() => {
    if (!me) return;
    console.log("hay meeeee")
    if (!stream) return;
    console.log("hay stream")
    ws.on("user-connected-room", (peerId) => {
      console.log("viene el peerId del server ", peerId);
      const call = me.call(peerId, stream);
      console.log(me);
      call.on("stream", (peerStream) => {

        console.log("addPeerAction");
        dispatch(addPeerAction(peerId, peerStream));
      });
    });

    me.on("call", (call) => {
      console.log("Te respondo la llamada");
      call.answer(stream);
      call.on("stream", (peerStream) => {
        dispatch(addPeerAction(call.peer, peerStream));
      });
    });
  }, [me, stream]);

  return (
    <SocketContext.Provider value={{ ws, me, stream, peers }}>
      {children}
    </SocketContext.Provider>
  );
};
