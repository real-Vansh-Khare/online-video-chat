import SocketEvents from "../../enums/socket_enum";
import socket_id_map from "../../lib/data_structures/sid_cid_map";
import matchList from "../../lib/match_wait_list";
import {Server as SocketIOServer} from "socket.io";

// Works like a synchornizer variable.
let last_completed = true;

// Infinitely process matches.
const start_matchmaker = (io: SocketIOServer) => {
  setInterval(async () => await process_match(io), 0);
};

const process_match = async (io: SocketIOServer) => {

  // let the last process_match() function complete first.
  if(!last_completed) return;

  // Lock the variable
  last_completed = false;

  const match = await matchList.find_pair();
  if(match) {

    console.log(match);

    // Send to respective client
    io.to(match.first).emit(SocketEvents.MATCH_FOUND, {
      id: match.second,
      call_permit: true,
    });

    io.to(match.second).emit(SocketEvents.MATCH_FOUND, {
      id: match.first,
      call_permit: false,
    });

    // Remove the mappings
    socket_id_map.remove(match.first);
    socket_id_map.remove(match.second);
  }

  // Unlock
  last_completed = true;
};

export default start_matchmaker;