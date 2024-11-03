import { Schema, model } from "mongoose";

const userSchema: Schema = new Schema({
  _id: String,
  fullName: String,
  email: String,
  password: String
});

const User = model("User", userSchema);
export default User;
