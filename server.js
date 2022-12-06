require('dotenv').config()

import express from "express";

import postRoutes from "./routes/postRoutes";
import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes";
import commentRoutes from "./routes/commentRoutes";
import cors from "cors";
import path from "path";
import bodyParser from "body-parser";
import connectDB from "./db/dbConfig";
import passport from "passport";
import { passport as passportMiddleware } from "./middlewares/passport";

const app = express();
require('dotenv').config({path: path.join(__dirname, '.env')});

const port = process.env.PORT;

function setupServer() {
  connectDB();
  middlewares();
  app.use("/api/posts", postRoutes);
  app.use("/api/users", userRoutes);
  app.use("/api/comments", commentRoutes);
  app.use("/api/auth", authRoutes);
  app.use(express.static(path.join(__dirname, "./../client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./../client/build", "index.html"));
  });
}

function middlewares() {
  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  // Passport middleware
  app.use(passport.initialize());
  passportMiddleware;
}

app.listen(port, () => {
  console.log("Server listening on port " + port);
  console.log(process.env.MONGO_URI)
  console.log(process.env.SECRET_KEY)
});

setupServer();
