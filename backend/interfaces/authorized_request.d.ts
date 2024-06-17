import { Request } from "express";

export interface AuthorizedRequest extends Request {
  user?: { username?: string; user_id?: string };
}
