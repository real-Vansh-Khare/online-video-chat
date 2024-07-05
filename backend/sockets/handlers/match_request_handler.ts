import { Socket } from "socket.io";
import matchList from "../../lib/match_wait_list";
import xlog from "../../util/logger";
import socket_id_map from "../../lib/data_structures/sid_cid_map";
import SocketEvents from "../../enums/socket_enum";

/**
 * Puts the client ID into the match waiting list. The matchmaking engine
 * will find a match for this ID when it encounters it.
 * @param socket Client socket which is connected to server.
 * @param id Unique ID of the client.
 * @param callback Callback for the message to be sent to the client
 */
export const match_request_handler = async (
  socket: Socket,
  id: string,
  callback: (message: string) => void
) => {

  xlog("Match request has arrived with id: " + id);
  // Create a private room between the server and client
  socket.join(id);

  // map the socket ID to the client ID
  socket_id_map.add(socket.id, id);

  // Add client to waiting list
  // then the matchmaking engine will find its match
  await matchList.add_waiter(id);

  // Return message.
  callback(SocketEvents.WAIT);
};
