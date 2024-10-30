import socketIOClient from "socket.io-client";

export const ADD_PEER = "ADD_PEER" as const;
export const REMOVE_PEER = "REMOVE_PEER" as const;

export const ws = socketIOClient("http://localhost:3000/");
