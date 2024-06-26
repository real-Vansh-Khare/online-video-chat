import { Server as SocketIOServer } from "socket.io";
import start_matchmaker from "./matchmaker";


/**
 * Starts the matchmaker which infinitely,
 * finds matches and processes them.
 * @param io Socket IO server instance
*/
export const start_matchmaking_engine = (io: SocketIOServer) => {
  start_matchmaker(io);
};
