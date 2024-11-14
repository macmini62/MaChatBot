import { Router } from "express";
import ChatController from "../controllers/chatController";

class ChatRoutes{
  public static route: Router = Router();
  public chatController: ChatController;

  constructor(){
    this.chatController = new ChatController();
    this.routes();
  }

  private routes(){
    ChatRoutes.route.post("/user/chat", (req, res) => this.chatController.createChat(req, res));
    ChatRoutes.route.get("/user/chats/:user_id", (req, res) => this.chatController.fetchChat(req, res));
    ChatRoutes.route.put("/user/chat", (req, res) => this.chatController.updateChat(req, res));
  }
}

new ChatRoutes;
export default ChatRoutes.route;