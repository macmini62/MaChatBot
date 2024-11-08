import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import Session from "../database/sessions";
import AuthMiddleware from "../middlewares/authMiddleware";
import User from "../database/users";

export default class SessionController {
  public createSession = async(req: Request, res: Response): Promise<void> => {
    try{
      const auth_token: any = req.query.auth_token;

      const auth: AuthMiddleware = new AuthMiddleware();
      const user_data: any = await auth.decodeAuth(auth_token);

      const id: string = uuidv4();
      const user_session = await Session.create({
        _id: id,
        user_id: user_data.user_id,
        date: new Date(),
        start_time: user_data.iat,
        end_time: user_data.exp
      });

      if(!user_session){
        res.status(501).send({ message: "Failed to create a session for the user!" });
      }

      const session = await this.fetchSession(id);

      res.status(201).json(session);
    }
    catch(e){
      console.log(e);
      res.status(500).send({ message: "Server error!" });
    }
  }

  // private sessionDuration = async(duration: string): Promise<any> => {
    
  // }

  public fetchSession = async(id: string): Promise<any> => {
    try{
      const session = await Session.findById({ _id: id });
      console.log("Session:", session);

      return session;
    }
    catch(e){
      console.log(e);
    }
  }

  public fetchSessionUser = async(req: Request, res: Response): Promise<void> => {
    try{
      const { session_id } = req.params;

      const session = await Session.findById({ _id: session_id });
      if(!session){
        res.status(404).send({ message: "Session has not been found!" });
      }

      const user_id = session?.user_id;
      if(!user_id){
        res.status(404).send({ message: "User for the session not found!" });
      }

      const user = await User.findById({ _id: user_id });
      if(!user){
        res.status(404).send({ message: "User cannot be found!" });
      }

      res.status(200).json({
        _id: user?._id,
        fullName: user?.fullName
      });

    }
    catch(e){
      console.log(e);
      res.status(500).send({ message: "Server Error!" });
    }
  }
}
