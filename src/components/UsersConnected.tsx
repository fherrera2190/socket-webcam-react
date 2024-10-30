import { useContext, useEffect } from "react";
import { PeerState } from "../interfaces";
import { UserRemoteVideo } from "./UserRemoteVideo";
import { SocketContext } from "../context/SocketContext";

export const UsersConnected = () => {
  const { peers } = useContext(SocketContext);

  console.log("Agregando usuarios", Object.keys(peers as PeerState));

  useEffect(() => {
    
  }, [peers]);
  return (
    <div className="container d-flex justify-content-center flex-wrap gap-4">
      {Object.values(peers as PeerState).map((peer) => (
        <UserRemoteVideo stream={peer.stream} />
      ))}
    </div>
  );
};
