import { Request, Response } from "express";
import User from "../database/users";
import { v4 as uuidv4 } from "uuid";

const createUser = async(req: Request, res: Response): Promise<void> => {
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

export default createUser;