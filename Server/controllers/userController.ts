import { Request, Response } from "express";
import User from "../database/users";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
import AuthMiddleware from "../middlewares/authMiddleware";

export default class UserController{

  public async createUser(req: Request, res: Response): Promise<void> {
    try{
      const data = req.body;
  
      const { fullName, email, password } = data;
      await User.create({
        _id: uuidv4(),
        fullName: fullName,
        email: email,
        password: password
      });
      res.status(201).send({ message: "User created successfully!" });
    }
    catch(e){
      console.log(e);
      res.status(500).send({ message: "Server Error!" });
    }
  }

  public async fetchUser(req: Request, res: Response): Promise<void> {
    try{
      const email: any = req.query.email;
      const user = await User.findOne({ email: email });
      console.log(user);

      if(!user){
        res.status(404).send({ message: "No user found!" });
      }

      // Generate a JWT token
      const auth: AuthMiddleware = new AuthMiddleware();
      const token = await auth.encodeAuth(user);

      if(token){
        res.status(200).json({
          _id: user?._id,
          email: user?.email,
          password: user?.password,
          token: token
        });
      }
      else{
        throw new Error();
      }
    }
    catch(e){
      console.log(e);
      res.status(500).send({ message: "Server Error" });
    }
  }
}

