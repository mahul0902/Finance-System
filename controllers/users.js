import { User } from "../models/user.js";
import { ExpressError } from "../utils/ExpressError.js";

//Sign Up Route
export const signup = async (req, res, next) => {
    try{
        let {email, username, password} = req.body;
        const newUser = new User({email, username});
        if(req.body.role){
            newUser.role = req.body.role;
        }
        const registeredUser = await User.register(newUser, password);
        req.login(registeredUser, (err) => {
            if(err){
                return next(err);
            }
            res.status(201).json({
                message: "Welcome",
                user: registeredUser
            })
        })
    } catch (e) {
        res.status(400).json({
            error: e.message
        })
    }
}

//Login Route
export const login = async (req, res) => {
    res.status(200).json({
        message: "Welcome Back!",
        user: req.user
    })
}

//Logout route
export const logout = async (req, res, next) => {
    req.logout((err) => {
    if (err) {
      return next(err); 
    }
    res.status(200).json({ message: "You logged out successfully!" });
  });
}

//Destroy User Route
export const destroyUser = async (req, res, next) => {
    let {id} = req.params;
    let user = await User.findById(id);
    if(!user){
        return next(new ExpressError(404, "User not found"));
    }

    await User.deleteOne(user);
    res.status(200).json("User deleted successfully");
}

//Make User Active or Inactive Route
export const makeUserActiveorInactive = async (req, res, next) => {
    let {id} = req.params;
    let user = await User.findById(id);
    if(!user){
        return next(new ExpressError(404, "User not found"));
    }
    user.status = user.status === "Active" ? "Inactive" : "Active";
    await user.save();
    res.status(200).json(`User is now ${user.status}`);
}