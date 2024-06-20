import { Response } from "express";
import { UserLoginRequest, UserSignupRequest } from "../interfaces/request";
import bcrypt from "bcrypt";
import { HttpStatusCodes } from "../enums/http_status_codes";
import { ErrorResponse, SuccessResponse } from "../lib/response_message";
import { LoginEnum } from "../enums/login";
import db from "../lib/db";
import { generate_jwt } from "../util/jwt";
import xlog from "../util/logger";

const signup_user = async (req: UserSignupRequest, res: Response) => {
    const user_signup_data = req.body;

    xlog(user_signup_data, "user data is ");

    const encrypted_password = await bcrypt.hash(
        user_signup_data.password,
        (Number(process.env.SALT_ROUNDS))
    )

    user_signup_data.password = encrypted_password;

    try {
        await db.user__create_user(user_signup_data);
        res.status(HttpStatusCodes.OK).json(new SuccessResponse("User created successfully", { signup_success: true, error: null }));
    } catch(err) {
      xlog(err, "Error creating user");
        res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
            .json((new ErrorResponse((err as Error).message, "Error while saving user")))
    }
}

const login_user = async (req: UserLoginRequest, res: Response) => {
    const { username, password } = req.body;
    const result = await verify_login_credentials(username, password);
    
    if( result == LoginEnum.VERIFIED) {
        const access_token = generate_jwt(username)

        // TODO : Send the access token as JSON.
        // Set token cookie to be kept in the browser
        res.cookie("token", access_token, {
        // ! important secure headers to be put in production
        // httpOnly: true,
        // secure: true,
            maxAge: 4 * 60 * 60,
        });
        res.status(HttpStatusCodes.OK).json(new SuccessResponse("User Logged in", { login_success: true, token: access_token }));
    } else {
        res
            .status(HttpStatusCodes.FORBIDDEN)
            .json(new ErrorResponse("Unable to login", result));
    }
};

const verify_login_credentials = async (username: string, password: string) => {

    // Fetch credentials (username and the hashed password) from database
    const credentials = await db.user__get_user_credentials(username);
  
    // if there are no credentials => no such user.
    if (!credentials) {
      return LoginEnum.INCORRECT_USERNAME;
    }
  
    // Check the password
    const password_verified = await bcrypt.compare(
      password,
      credentials?.password!
    );
  
    // Return the respective status from LoginEnum.
    if (password_verified) {
      return LoginEnum.VERIFIED;
    } else {
      return LoginEnum.INCORRECT_PASSWORD;
    }
  };

const user_controls = {
    signup_user,
    login_user
}

export default user_controls;