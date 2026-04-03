import mongoose from "mongoose";
import { sampleTransactions } from "./data.js";
import { Transaction } from "../models/transaction.js";

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

const initDB = async () => {
    await Transaction.deleteMany({});
    await Transaction.insertMany(sampleTransactions);
    console.log("data is initialized");
}

initDB();