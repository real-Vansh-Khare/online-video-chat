import { Socket } from "socket.io";
import { ExtendedError } from "socket.io/dist/namespace";

import SocketEvents from "../../enums/socket_enum";
import { verify_jwt } from "../../util/jwt";

type SocketNextFunction = (err?: ExtendedError | undefined) => void;

/**
 * If the user is logged in, and has a JWT
 * then only he can connect with the socket.
 *
 * The token has to be sent in the `auth` option of io from the client
 */
export const socket_auth_middleware = (
  socket: Socket,
  next: SocketNextFunction
) => {
  const token = socket.handshake.auth.token;
  try {
    verify_jwt(token);
    next();
  } catch (err) {
    // On error rejects the connection and sends the error object to the
    // client
    next(new Error(SocketEvents.UNAUTHORIZED));
  }
};
