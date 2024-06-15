import { UserLoginData, UserSignupData } from "./user.interface";

export interface UserSignupRequest {
    body: UserSignupData
}

export interface UserLoginRequest {
    body: UserLoginData
}