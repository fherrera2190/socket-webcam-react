import Peer from "peerjs";
import { Socket } from "socket.io-client";
import { PeerState } from "./peer-state.interface";

export interface SocketContextType {
  ws?: Socket;
  me?: Peer;
  stream?: MediaStream;
  peers?: PeerState;
}
