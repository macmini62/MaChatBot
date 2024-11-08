import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export default class AuthMiddleware{
  // create a jwt token
  private SECRET_KEY: any;

  constructor(){
    this.SECRET_KEY = process.env.SECRET_KEY;
  }

  public encodeAuth = async(user: any): Promise<string> => {
    const token: string = jwt.sign(
      { user_id: user?._id, user_email: user?.email },
      this.SECRET_KEY,
      { expiresIn: "2h" }
    );

    console.log("Token:", token);
    return token;
  };

  // decodes the token and return the payload
  public decodeAuth = async(token: string): Promise<any> => {
    try{
      const token_load: any = jwt.decode(token);

      console.log("Token Load:", token_load);
      return token_load;
    }
    catch(e){
      console.log(e);
    }
  };

  // verifies the token
  public verifyAuth = async(token: string): Promise<any> => {
    console.log(this.SECRET_KEY);
    const token_load: any = jwt.verify(token, this.SECRET_KEY);
    return token_load;
  };
};