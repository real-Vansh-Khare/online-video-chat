import helmet from "helmet";
import { Server } from "http";
import { Server as SocketIOServer } from "socket.io";

import SocketEvents from "../enums/socket_enum";
import { socket_auth_middleware } from "./middlewares/auth.middleware";
import { match_request_handler } from "./handlers/match_request_handler";
import { start_matchmaking_engine } from "./matchmaking/engine";
import socket_id_map from "../lib/data_structures/sid_cid_map";
import matchList from "../lib/match_wait_list";

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

  // Start the matchmaking engine (spawns worker on separate thread)
  start_matchmaking_engine(io);  

  // SOCKET MIDDLEWARES
  io.engine.use(helmet());
  io.use(socket_auth_middleware);

  // Listen for events by the clients.
  io.on(SocketEvents.CONNECTION, (socket) => {
    socket.on(SocketEvents.MATCH_REQUEST, (id: string, callback: (message: string) => void) => {
      match_request_handler(socket, id, callback)
    });

    // On client disconnect
    socket.on(SocketEvents.DISCONNECT, () => {
      let client_id = socket_id_map.get_c(socket.id);

      // Delete from matchList
      client_id && matchList.delete_one(client_id);

      // Delete from the map
      socket_id_map.remove(socket.id);
    });
  });
};
