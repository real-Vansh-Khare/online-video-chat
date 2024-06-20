import xlog from "@/utils/logger";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  xlog("request recieved at /api/signup")
  const data = await req.json();
  
  // todo validate data
  try {
    const resp = await axios.post(process.env.BACKEND_URL + "/user/signup", data);
    xlog(resp);
    if(resp.data.data.signup_success) {
      return NextResponse.json({ signup_success: true, error: null, redirect_url: "/login" });
    }

  } catch (err) {
    xlog("error occurred while signup user in db");
  }
  return NextResponse.json({ signup_success: false, error: "", redirect_url: "" });

};