import express from 'express'
import { hasAccess, isActive, isLoggedIn } from '../middlewares.js';
import {wrapAsync} from "../utils/wrapAsync.js";
import * as transactionController from '../controllers/transactions.js'
const router = express.Router();

//All transaction and create transaction route
router.route("/")
.get(isLoggedIn, isActive, hasAccess(['Analyst','Admin']), wrapAsync(transactionController.getAllTransactions))
.post(isLoggedIn, isActive, hasAccess(['Admin']), wrapAsync(transactionController.createTransaction))

//Update and delete transaction route
router.route("/:id")
.put(isLoggedIn, isActive, hasAccess(['Admin']), wrapAsync(transactionController.updateTransaction))
.delete(isLoggedIn, isActive, hasAccess(['Admin']), wrapAsync(transactionController.destroyTransaction))

//Filter transactions based on category or type
router.route("/:catOrType")
.get(isLoggedIn, isActive, hasAccess(['Analyst','Admin']), wrapAsync(transactionController.getTransactionsCatorType))

//Filter transactions based on date and category or type
router.route("/:catOrType/:startDate/:endDate")
.get(isLoggedIn, isActive, hasAccess(['Analyst','Admin']), wrapAsync(transactionController.getTransactionsDateAndCatorType))

export default router;