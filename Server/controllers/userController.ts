import { Request, Response } from "express";
import User from "../database/users";
import { v4 as uuidv4 } from "uuid";

export default class userController{

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
      const { id } = req.params;
      const user = await User.findById(id).exec();
      console.log(user);

      if(!user){
        res.status(404).send({ message: "No user found!" });
      }
      res.status(200).json(user)
    }
    catch(e){
      console.log(e);
      res.status(500).send({ message: "Server Error" });
    }
  }
}

