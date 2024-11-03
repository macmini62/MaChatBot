import { Router } from "express";
import BotController from "../controllers/botController";

class BotRouter{
  public static route: Router = Router();
  private botController: BotController;

  constructor(){
    this.botController = new BotController();
    this.routes();
  }

  private routes(){
    BotRouter.route.get("/user/prompt", (req, res) => this.botController.requestResponse(req, res));
  }
}

new BotRouter();
export default BotRouter.route;