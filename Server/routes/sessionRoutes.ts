import { Router } from "express";
import SessionController from "../controllers/sessionController";

class SessionRouter {
  public static route: Router = Router();
  public sessionController: SessionController;

  constructor(){
    this.sessionController = new SessionController();
    this.routes();
  }

  private routes(){
    SessionRouter.route.post("/user/session", (req, res) => this.sessionController.createSession(req, res));
    SessionRouter.route.get("/user/session/:session_id", (req, res) => this.sessionController.fetchSessionUser(req, res));
  }
};

new SessionRouter();
export default SessionRouter.route;