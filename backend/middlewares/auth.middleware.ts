import { NextFunction, Request, Response } from "express";
import { JsonWebTokenError, JwtPayload, TokenExpiredError } from "jsonwebtoken";

import { AuthorizedRequest } from "../interfaces/authorized_request";
import { UnauthorizedError } from "../lib/error";
import { ErrorResponse, RedirectResponse } from "../lib/response_message";
import { verify_jwt } from "../util/jwt";
import jwt from "jsonwebtoken";
import xlog from "../util/logger";

export const authenticate_jwt = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const auth_header = req.headers["authorization"];
  const token = auth_header && auth_header.split(" ")[1];
  xlog(token, "JWT TOKEN IN AUTH MIDDLEWARE");
  if (!token) {
    res.status(401).json(new ErrorResponse("unauthorized"));
    return;
  } else {
    try {

      if(process.env.NODE_ENV === "DEVELOPMENT") {
        const decoded_token = jwt.decode(token) as JwtPayload;
        xlog(decoded_token, "DECODED TOKEN");

        (req as AuthorizedRequest).user = {
          username: decoded_token.username.toString(),
        };
        next();
      }

      const payload = verify_jwt(token) as JwtPayload;
      xlog("username acc to token=", payload.username);
      
      (req as AuthorizedRequest).user = {
        username: payload.username.toString(),
      };
      next();
    } catch (err) {
      xlog(err);
      switch ((err as Error).constructor) {
      case JsonWebTokenError:
        res
          .status(401)
          .json(new ErrorResponse("unauthorized (JsonWebTokenError)"));
        return;
      case TokenExpiredError:
        res.status(303).json(new RedirectResponse("login again", "/login"));
        return;
      case UnauthorizedError:
        res.status(401).json(new ErrorResponse("unauthorized"));
        return;
      }

      return;
    }
  }
};
