import mongoose from "mongoose";
require("dotenv").config;

export default mongoose.connect(process.env.DB_URI || "mongodb://127.0.0.1:27017/shorturl");
