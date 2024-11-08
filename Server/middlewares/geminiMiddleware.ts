import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config()

export default class Gemini{
  private API: string | any;
  
  constructor(){
    this.API = process.env.GEMINI_API_KEY;
    this.generate;
  };

  public generate = async (prompt: string) => {
    const genAI = new GoogleGenerativeAI(this.API);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const results: any = await model.generateContent(prompt);

    return results.response.text();
  }
}

