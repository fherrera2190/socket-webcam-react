import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ErrorPage } from "./pages/ErrorPage";
import { MeetingRoom } from "./pages/MeetingRoom";
import { Root } from "./routes/Root";
import { SocketProvider } from "./context/SocketContext";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <SocketProvider>
        <Root />
      </SocketProvider>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/contact/:contactId",
        element: <h1>HOLAAAAAAAAAAA</h1>,
      },
    ],
  },
  {
    path: "/meeting-room/:roomId",
    element: (
      <SocketProvider>
        <MeetingRoom />
      </SocketProvider>
    ),
  },
  {
    path: "/*",
    element: <Root />,
  },
]);
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
