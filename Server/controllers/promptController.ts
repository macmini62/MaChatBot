import { Request, Response } from "express";
import Prompt from "../database/prompts";
import { v4 as uuidv4 } from "uuid";
import Gemini from "../middlewares/geminiMiddleware";

export default class PromptController{
  public async requestResponse(req: Request, res: Response): Promise<void> {
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
          const prompt_id = uuidv4();
          await Prompt.create({
            _id: prompt_id,
            user_id: user_id,
            chat_id: chat_id,
            prompt: promptRequest,
            response: promptResponse
          });

          res.status(201).json({
            _id: prompt_id,
            user_id: user_id,
            chat_id: chat_id,
            response: promptResponse
          });
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
}