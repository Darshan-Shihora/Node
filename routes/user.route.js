import express from "express";
import { getUsers, postLogin, postSignUp } from "../controllers/user.controller.js";
export const userRouter = express.Router();

userRouter.post("/signup", postSignUp);

userRouter.post("/login", postLogin);

userRouter.get("/user", getUsers);


