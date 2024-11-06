import { Schema, model } from "mongoose";

interface session {
  _id: string;
  user_id: string;
  date: Date;
  start_time: string;
  end_time: string;
};

const sessionSchema: Schema = new Schema<session>(
  {
    _id: String,
    user_id: String,
    date: Date,
    start_time: String,
    end_time: String
  }
);

const Session = model("Session", sessionSchema);
export default Session;