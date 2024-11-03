import { Request, Response } from "express";
import Prompt from "../database/prompts";
import { v4 as uuidv4 } from "uuid";
import Gemini from "../middlewares/aiMiddleware";

export default class BotController{
  public async requestResponse(req: Request, res: Response): Promise<void> {
    try{
      const { promptRequest, user_id } = req.body;
      console.log(promptRequest);
      console.log(user_id);

      // get prompt results
      const requestResponse = async () => {
        const chatBot: Gemini = new Gemini();
        const results: string = await chatBot.generate(promptRequest);
        
        return results;
      }
      const promptResponse = await requestResponse();
      
      if(promptResponse){
        try{  
          const prompt_id = uuidv4();
          await Prompt.create({
            _id: prompt_id,
            user_id: user_id,
            prompt: promptRequest,
            response: promptResponse
          });

          res.status(201).json({
            res_id: prompt_id,
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