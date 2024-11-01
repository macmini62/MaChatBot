import { Router } from "express";
import createUser from "../controllers/userController";

const userRoute = Router();

userRoute.post("/signup", createUser);

export default userRoute;