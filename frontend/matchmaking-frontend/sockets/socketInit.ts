import { MatchDetails } from "@/components/matchmaker";
import SocketEvents from "@/enums/socket_enum";
import { BACKEND_URL } from "@/lib/ENV";
import xlog from "@/utils/logger";
import { Socket, io } from "socket.io-client";

export const socketInit = (id: string, matchDetails:MatchDetails, setMatchDetails: React.Dispatch<React.SetStateAction<MatchDetails>>) => {
  const token = localStorage.getItem("stu_mingle_access_token");

  if (!token) {
    // todo: improvise this later
    alert("kindly login");
    return;
  }

  const socket = io(BACKEND_URL, {
    path: "/websockets/",
    auth: {
      token: token,
    },
    extraHeaders: {
      client_id: id,
    }
  });

  attachSocketEventListeners(socket, matchDetails, setMatchDetails);

  return socket;
};

const attachSocketEventListeners = (socket: Socket, matchDetails: MatchDetails, setMatchDetails: React.Dispatch<React.SetStateAction<MatchDetails>>) => {

  socket.on(SocketEvents.CONNECT_ERROR, (err) => {
    xlog(SocketEvents.CONNECT_ERROR);
    xlog(err);
  });

  socket.on(SocketEvents.CONNECTION, (conn) => {
    xlog(conn, "connected with backend socket server");
  });

  socket.on(SocketEvents.MATCH_FOUND, (match) => {
    xlog("match found");
    xlog(match.id);
    if (match.call_permit) {
      xlog("Call to be made from here.");
      setMatchDetails({ ...matchDetails, matchId: match.id, matchFound: true, isCaller: true });
    } else {
      xlog("Call to be recieved from here.");
      setMatchDetails({ ...matchDetails, matchId: match.id, matchFound: true, isCaller: false });
    }
  });

  socket.on("help", () => {
    console.log("message from hello room");
  });
};