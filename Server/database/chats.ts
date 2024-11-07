import { model, Schema } from "mongoose";

interface chat {
  _id: string;
  user_id: string;
  title: string;
  date: Date;
};

const chatSchema: Schema = new Schema<chat>({
  _id: String,
  user_id: String,
  title: String,
  date: Date
});

const Chat = model<chat>("Chat", chatSchema);
export default Chat;
