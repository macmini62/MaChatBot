import { Request, Response } from "express";
import Prompt from "../database/prompts";
import { v4 as uuidv4 } from "uuid";
import Gemini from "../middlewares/geminiMiddleware";

export default class PromptController{
  public requestResponse = async(req: Request, res: Response): Promise<void> => {
    try{
      const user_id: any = req.query.user_id;
      const chat_id: any = req.query.chat_id;
      const promptRequest: any = req.query.promptRequest;
      console.log(req);

      // get prompt results
      const requestResponse = async () => {
        const chatBot: Gemini = new Gemini();
        const results: string = await chatBot.generate(promptRequest);
        
        return results;
      }
      const promptResponse = await requestResponse();
      console.log(promptResponse);
      
      if(promptResponse){
        try{
          const prompt = await Prompt.create({
            _id: uuidv4(),
            user_id: user_id,
            chat_id: chat_id,
            request: promptRequest,
            response: promptResponse,
            date: new Date()
          });

          if(!prompt){
            res.status(401).send({ message: "Failed to generate a response!" });
          }

          res.status(201).send({ message: "Response generated successfully" });
        }
        catch(e){
          console.log(e);
          res.status(500).send({ message: "Failed to upload prompt to the database" });
        }
      }
    }
    catch(e){
      console.log(e);
      res.status(500).send({ message: "Failed to generate a prompt" });
    }
  }

  public fetchPrompts = async(req: Request, res: Response): Promise<void> => {
    try{
      const { chat_id }: any = req.params;
      console.log(req);

      const prompts = await Prompt.find({ chat_id: chat_id });
      if(!prompts){
        res.status(404).send({ message: "Prompts for the chat not found!" });
      }

      console.log(prompts);

      res.status(200).json(prompts);
    }
    catch(e){
      console.log(e);
      res.status(500).send({ message: "Server Error!" });
    }
  }
}