export interface SocketContextType {
  socket: WebSocket | null;
  connect: () => void;
  disconnect: () => void;
}
