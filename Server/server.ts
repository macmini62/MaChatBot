import express, { Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import userRoute from "./routes/userRoutes";
import promptRoute from "./routes/promptRoutes";
import sessionRoute from "./routes/sessionRoutes";
dotenv.config();

if(!process.env.MONGODB_URL){
  throw new Error("MongoDB url is not provided!");
}
const connectionString: string = process.env.MONGODB_URL;

if (!process.env.PORT){
  throw new Error("No port assigned to the server!!");
}
const port: string = process.env.PORT;

const app: Application = express();

// call middleware
app.use(cors());
app.use(express.json());

// call routes
app.use("/app", userRoute, promptRoute, sessionRoute);

// Starts the application.
(async () => {
  try {
    const conn = await mongoose.connect(connectionString);
    console.log(`MongoDB Connected: ${conn.connection.host}`);

    app.listen(port, () => {
      console.log(`Application listening on port ${port}`);
    });
  } catch (e) {
    console.error('Connection error:', e);
    process.exit(1); // Exit the application on failure
  }
})();


