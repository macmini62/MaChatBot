import { Router } from "express";
import userController from "../controllers/userController";

class userRouter{
  public static route: Router = Router();
  public userController: userController;

  constructor(){
    this.userController = new userController();
    this.routes();
  }

  private routes(){
    userRouter.route.post("/user/signup", (req, res) => this.userController.createUser(req, res));
    userRouter.route.get("/user/login", (req, res) => this.userController.fetchUser(req, res));
  }
}

new userRouter();
export default userRouter.route;
