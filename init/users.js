import mongoose from "mongoose";
import { sampleUsers } from "./data.js";
import {User} from "../models/user.js";

const seedDB = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/Zorvyn");
        console.log("Connected to MongoDB!");
        
        await User.deleteMany({});
        for (let u of sampleUsers) {
            const newUser = new User({ 
                email: u.email, 
                username: u.username, 
                role: u.role
            });
            
            await User.register(newUser, u.password);
            console.log(`Registered user: ${u.username}`);
        }
    } catch (error) {
        console.error("Error seeding database:", error);
    } finally {
        mongoose.connection.close();
    }
};

seedDB();