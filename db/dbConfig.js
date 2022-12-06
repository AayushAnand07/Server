import mongoose from "mongoose";

import dotenv from "dotenv";
dotenv.config();

const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, './.env') });
const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;
    await mongoose
      .connect(uri, {
        useNewUrlParser: true,
       
        useUnifiedTopology: true,
        dbName: "Blog",
      }).then(()=>{
        console.log("MONGODB CONNECTED SUCCESSFULLY!");
      })
      .catch((error) => console.log(error));
    const connection = mongoose.connection;
   
  } catch (error) {
    console.log(error);
    return error;
  }
};

export default connectDB;
