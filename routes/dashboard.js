import express from 'express';
import { getSummary } from '../controllers/dashboard.js';
import { isLoggedIn, isActive } from '../middlewares.js';
import { wrapAsync } from '../utils/wrapAsync.js';
const router = express.Router();

router.route("/")
.get(isLoggedIn, isActive, wrapAsync(getSummary));

export default router;