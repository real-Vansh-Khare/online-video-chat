/**
 * Enum for all the socket events that will be communicated between
 * the client and the server
 */
enum SocketEvents {
  CONNECT_ERROR = "connect_error",
  UNAUTHORIZED = "unauthorized",
  DISCONNECT = "disconnect",
  CONNECTION = "connection",
  MATCH_REQUEST = "request-match",
  WAIT = "waiting",
  MATCH_FOUND = "match-found",
}

export default SocketEvents;
