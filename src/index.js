import dotenv from "dotenv";
import connectDB from "./db/index.js";
import app from "./app.js";
dotenv.config();


connectDB()
    .then(() => {
            app.on("error", (err) => {
                console.log(err);
            });

            app.listen(process.env.PORT || 3000, () => {
                console.log("Server is running on port", process.env.PORT || 3000);
            });
        })
            .catch((err) => {
                console.log("Error connecting to the database", err);
            });
// the problem in this code is that it will only start after the database connects

// what it does connectDB() {returns a promise }
//.then fires only when the database is connected not when we want the server to start
//app.on listens to the express failure after the server starts


//effect the server never starts in the broken state but in prefect state

// so the solution is that instead of connecting the server file to the database we
// can make a middle ware that will run all async functions














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