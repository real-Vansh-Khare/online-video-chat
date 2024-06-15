import express from "express";
import user_controls from "../controllers/user.controller";



const user_router = express.Router();

user_router.post('/signup', user_controls.signup_user)
user_router.post('/login', user_controls.login_user)

export default user_router;