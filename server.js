import 'dotenv/config';

import express from 'express';
import session from 'express-session';
import passport from 'passport';
import mongoose from 'mongoose';
import { Strategy as LocalStrategy } from 'passport-local';
import { ExpressError } from './utils/ExpressError.js';
import {User} from './models/user.js';
import userRouter from './routes/users.js';
import dashboardRouter from './routes/dashboard.js';
import transactionRouter from './routes/transactions.js';
const app = express();

main()
.then(() => {
    console.log("connected to DB");
})
.catch((err) => {
    console.log(err);
})

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/Zorvyn");
}

app.use(express.json());
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7, // Cookie expires in 1 week
    maxAge: 1000 * 60 * 60 * 24 * 7
  }
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/", (req, res) => {
    res.json("Hi, I am root");
})

//Dashboard Router
app.use("/dashboard", dashboardRouter);

//Transactions Router
app.use("/transactions", transactionRouter)

//Users Router
app.use("/users", userRouter);

//Error Handling Middlewares
app.use((req, res, next) => {
    next(new ExpressError(404, "Page Not Found!"));
})

app.use((err, req, res, next) => {
    let{statusCode=500, message = "Something Went Wrong!"} = err;
    res.status(statusCode).json(message);
})

app.listen(8080, (req, res) => {
    console.log(`app is listening on port 8080`);
})