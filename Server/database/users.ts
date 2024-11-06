import { Schema, model } from "mongoose";

interface user {
  _id: string;
  fullName: string;
  email: string;
  password: string;
};

const userSchema: Schema = new Schema<user>({
  _id: String,
  fullName: String,
  email: String,
  password: String
});

const User = model("User", userSchema);
export default User;
