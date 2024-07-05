import { Request, Response } from "express";
import matchList from "../lib/match_wait_list";

export const dev_controller = async (req: Request, res: Response) => {
  const option = req.param('option');

  if(option === "clear_match_list") {
    await matchList.dev_clearList();
    return res.json({ done: true });
  }
};