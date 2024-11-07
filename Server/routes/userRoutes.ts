import { Router } from "express";
import UserController from "../controllers/userController";

class UserRouter{
  public static route: Router = Router();
  public userController: UserController;

  constructor(){
    this.userController = new UserController();
    this.routes();
  }

  private routes(){
    UserRouter.route.post("/user/signup", (req, res) => this.userController.createUser(req, res));
    UserRouter.route.get("/user/login", (req, res) => this.userController.fetchUser(req, res));
  }
}

new UserRouter();
export default UserRouter.route;
