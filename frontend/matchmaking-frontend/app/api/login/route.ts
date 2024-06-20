import xlog from "@/utils/logger";
import axios from "axios";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

/**
 * API ENDPOINT: /api/login
 * POST with LoginData
 * @param req NextRequest
 * @param res NextResponse
 */
export async function POST(req: NextRequest, res: Response) {
  const data = await req.json();

  xlog(data, "DATA received at Next server endpoint /api/login");
  
  try {
    const validationResult = await axios.post(process.env.BACKEND_URL + "/user/login", data);
    if(validationResult.data.data.login_success) {
      // send the token as cookie
      const token = validationResult.data.data.token;
      xlog(token, "JWT Token from main server");
      return NextResponse.json({ login_success: true, redirect_url: "/connect", error: null });

    }
  } catch (err) {
    console.error(err);
  }
  
  return NextResponse.json({ test: "hi" });

};