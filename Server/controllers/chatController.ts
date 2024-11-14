import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import Chat from "../database/chats";

export default class ChatController{
  public createChat = async(req: Request, res: Response): Promise<void> => {
    try{
      const { _id, title, user_id } = req.body;
      // console.log("chat..",req);

      const chat = await Chat.create({
        _id: _id,
        user_id: user_id,
        title: title,
        date: new Date(),
      });

      if(!chat){
        res.status(501).send({ message: "Unable to create a new Chat!" });
      }

      res.status(201).json(chat);
    }
    catch(e){
      console.log(e);
      res.status(500).send({ message: "Server Error!" });
    }
  }

  public fetchChat = async(req: Request, res: Response): Promise<void> => {
    try{
      const { user_id } = req.params;
      // console.log(req)

      const chat = await Chat.find({ user_id: user_id });

      if(!chat){
        res.status(404).send({ message: "Unable to Fetch the Chat!" });
      }

      console.log("Chat:", chat);
      res.status(200).json(chat);
    }
    catch(e){
      console.log(e);
      res.status(500).send({ message: "Server Error!" });
    }
  }

  public updateChat = async(req: Request, res: Response): Promise<void> => {
    try{
      const { chat_id, newChatTitle } = req.body;
      console.log(req)

      const updatedChat = await Chat.updateOne({ _id: chat_id }, { title: newChatTitle });
      console.log("updated", updatedChat);

      if(!updatedChat.acknowledged){
        res.status(501).send({ message: "Failed to update the chat" });
      }

      res.status(200).send({ message: "Successfully updated the chat" });
    }
    catch(e){
      console.log(e);
      res.status(500).send({ message: "Server Error!!" });
    }
  }
}
