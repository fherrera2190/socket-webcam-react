import { Outlet } from "react-router";
import { CreateRoomButton } from "../components/CreateRoomButton";
import { SocketProvider } from "../context/SocketContext";

export const Root = () => {
  return (
    <SocketProvider>
      <div className="d-flex justify-content-center">
        <CreateRoomButton />
        <Outlet />
      </div>
    </SocketProvider>
  );
};
