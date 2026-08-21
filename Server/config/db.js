import mongoose from "mongoose";
import express from "express";

const connectDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("mongo connected successfully");
        console.log("User collection created sucessfully");
    } catch (err) {
        console.log("Connection failed" , err.message);
        process.exit(1);
    }
};

export default connectDB;