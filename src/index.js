import dotenv from "dotenv";
import connectDB from "./db/index.js";
dotenv.config();

connectDB();














/*
import express from "express";

const app = express();


;(async ()=>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
        app.on("error", (err) => {
            console.log(err);
            throw err;})
        app.listen(process.env.PORT, () => {
            console.log(`Server started on port ${process.env.PORT}`);
        })


    }catch(err){
        console.log(err);
        throw err;
    }
})()*/