import helmet from "helmet";
import { Server } from "http";
import { Server as SocketIOServer } from "socket.io";

import SocketEvents from "../enums/socket_enum";
import { socket_auth_middleware } from "./middlewares/auth.middleware";
import xlog from "../util/logger";

/**
 * Socket io configuration
 */
const socket_io_config = {
  cors: {
    origin: "*",
  },
};

/**
 * Initializes the socket IO server on the currect http node / express server
 * @param path Route URL to initialize the socket connection on.
 * @param server Instance of the http server to mount the socket server on.
 */
export const init_socket_connection = (path: string, server: Server) => {
  // Create the instance for socket IO server.
  const io = new SocketIOServer(server, {
    path: path,
    ...socket_io_config,
  });

  // SOCKET MIDDLEWARES
  io.engine.use(helmet());
  io.use(socket_auth_middleware);

  // Listen for events by the clients.
  io.on(SocketEvents.CONNECTION, (socket) => {
    xlog("user connected");
  });
};
