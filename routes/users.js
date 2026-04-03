import express from 'express';
const router = express.Router();
import { wrapAsync } from "../utils/wrapAsync.js";
import passport from "passport";
import * as userController from "../controllers/users.js";
import { isLoggedIn } from '../middlewares.js';

router.route("/signup")
.post(wrapAsync(userController.signup));

router.route("/login")
.post(passport.authenticate("local"), wrapAsync(userController.login));

router.route("/logout")
.get(wrapAsync(userController.logout));

router.route("/:id")
.put(isLoggedIn, wrapAsync(userController.makeUserActiveorInactive))
.delete(isLoggedIn, wrapAsync(userController.destroyUser));

export default router;