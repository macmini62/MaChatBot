import { Schema, model } from "mongoose";

const promptSchema: Schema = new Schema({
  _id: String,
  user_id: String,
  prompt: String,
  response: String,
  date: Date
});

const Prompt = model("Prompt", promptSchema);
export default Prompt;
