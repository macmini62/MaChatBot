import { Router } from "express";
import BotController from "../controllers/promptController";

class PromptRouter{
  public static route: Router = Router();
  private botController: BotController;

  constructor(){
    this.botController = new BotController();
    this.routes();
  }

  private routes(){
    PromptRouter.route.get("/prompt", (req, res) => this.botController.requestResponse(req, res));
    PromptRouter.route.get("/prompts/:chat_id", (req, res) => this.botController.fetchPrompts(req, res))
  }
}

new PromptRouter();
export default PromptRouter.route;