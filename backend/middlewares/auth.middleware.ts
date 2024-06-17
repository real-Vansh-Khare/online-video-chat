import { NextFunction, Request, Response } from "express";
import { JsonWebTokenError, JwtPayload, TokenExpiredError } from "jsonwebtoken";

import { AuthorizedRequest } from "../interfaces/authorized_request";
import { UnauthorizedError } from "../lib/error";
import { ErrorResponse, RedirectResponse } from "../lib/response_message";
import { verify_jwt } from "../util/jwt";

export const authenticate_jwt = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const auth_header = req.headers["authorization"];
  const token = auth_header && auth_header.split(" ")[1];
  console.log("token is", token);
  if (!token) {
    res.status(401).json(new ErrorResponse("unauthorized"));
    return;
  } else {
    try {
      const payload = verify_jwt(token) as JwtPayload;
      console.log("username acc to token=", payload.username);
      console.log("request param=", req.params.username);
      
      (req as AuthorizedRequest).user = {
        username: payload.username.toString(),
      };
      next();
    } catch (err) {
      console.log(err);
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
