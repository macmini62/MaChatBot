import { Schema, model } from "mongoose";

interface prompt {
  _id: string;
  user_id: string;
  chat_id: string;
  request: string;
  response: string;
  date: Date
};

const promptSchema: Schema = new Schema<prompt>({
  _id: String,
  user_id: String,
  chat_id: String,
  request: String,
  response: String,
  date: Date
});

const Prompt = model<prompt>("Prompt", promptSchema);
export default Prompt;
