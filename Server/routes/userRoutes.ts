import { Router } from "express";
import UserController from "../controllers/userController";

class userRouter{
  public static route: Router = Router();
  public userController: UserController;

  constructor(){
    this.userController = new UserController();
    this.routes();
  }

  private routes(){
    userRouter.route.post("/user/signup", (req, res) => this.userController.createUser(req, res));
    userRouter.route.get("/user/login", (req, res) => this.userController.fetchUser(req, res));
  }
}

new userRouter();
export default userRouter.route;
