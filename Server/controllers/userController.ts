import { Request, Response } from "express";
import User from "../database/users";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";

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
      const { email } = req.query;
      console.log(req);
      console.log(email);
      const user = await User.findOne({ email: email })
      console.log(user);

      if(!user){
        res.status(404).send({ message: "No user found!" });
      }

      // create a jwt token
      const token: string = jwt.sign(
        {
          userId: user?._id,
          userEmail: user?.email
        },
        "secretkeyappearhere",
        {
          expiresIn: "2h"
        }
      );

      res.status(200).json({
        userId: user?._id,
        email: user?.email,
        password: user?.password,
        token: token
      });
    }
    catch(e){
      console.log(e);
      res.status(500).send({ message: "Server Error" });
    }
  }
}

