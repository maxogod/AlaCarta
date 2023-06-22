import express from "express";
import session from "express-session";
import dotenv from "dotenv";
// database
import mongoose from "mongoose";
import MongoStore from "connect-mongo";
// routes
import authRoute from "./routes/auth";
// middlewares
import cookieParser from "cookie-parser";
import { logRequests } from "./middlewares/logs";

dotenv.config();
const app = express();
const PORT = process.env.DEV_PORT || 8000;

app.use(express.json()); // for parsing json (and create req.body etc)
app.use(express.urlencoded()); // for parsing URL-encoded request bodies

app.use(cookieParser()); // middleware to parse cookies

// middleware to set up session
app.use(
    session({
        secret: process.env.SESSION_SECRET as string,
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
            mongoUrl: process.env.MONGO_URI!,
        }),
    })
);

// log out all requests
app.use(logRequests);

// TODO middleware to check if user is logged in before accessing routes

// Routes
app.use("/api/auth", authRoute);

const start = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI!, {});

        app.listen(PORT, () => {
            console.log(
                `[server]: Server is running at http://localhost:${PORT}`
            );
        });
    } catch (error) {
        console.log(error);
    }
};

start();
