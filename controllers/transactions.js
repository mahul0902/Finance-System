import { Transaction } from "../models/transaction.js"
import { ExpressError } from "../utils/ExpressError.js";

// Get All transactions
export const getAllTransactions = async (req, res) => {
    let allTransactions = await Transaction.find({});
    res.status(200).json(allTransactions);
}

//Create Transaction
export const createTransaction = async (req, res) => {
    let newTransaction = new Transaction({
        amount: req.body.amount,
        type: req.body.type,
        category: req.body.category,
        description: req.body.description,
        createdBy: req.user._id
    })

    await newTransaction.save();
    res.status(200).json("Transaction created successfully");
}

//Update Transaction
export const updateTransaction = async (req, res, next) => {
    let {id} = req.params;
    let updatedTransaction = await Transaction.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if(!updatedTransaction){
        return next(new ExpressError(404, "Transaction not found"));
    }
    
    res.status(200).json("Transaction updated successfully");
}

//Destroy Transaction
export const destroyTransaction = async (req, res, next) => {
    let {id} = req.params;
    let deletedTransaction = await Transaction.findByIdAndDelete(id);
    if(!deletedTransaction){
        return next(new ExpressError(404, "Transaction not found"));
    }
    res.status(200).json("Transaction deleted successfully");
}

//Filter data based on type or category
export const getTransactionsCatorType = async (req, res, next) => {
    let {catOrType} = req.params;
    if(['income','expense'].includes(catOrType)){
        let transactions = await Transaction.find({type: catOrType});
        res.status(200).json(transactions);
    } else if(['Revenue', 'Payroll', 'Operations', 'Marketing', 'Others'].includes(catOrType)){
        let transactions = await Transaction.find({category: catOrType});
        res.status(200).json(transactions);
    } else {
        return next(new ExpressError(400,"Enter a valid type or category"));
    }
}

//Filter data based on date and type or category
//Parse Date Function to convert dates of the route into date object
const parseDate = (dateStr, isEndOfDay = false) => {
    const [day, month, year] = dateStr.split('-');
    
    const isoString = `${year}-${month}-${day}`;
    const dateObj = new Date(isoString);

    if (isEndOfDay) {
        dateObj.setUTCHours(23, 59, 59, 999);
    }
    return dateObj;
};
export const getTransactionsDateAndCatorType = async (req, res, next) => {
    const { catOrType, startDate, endDate } = req.params; 
    let query = {};
    if(['income','expense'].includes(catOrType)){
        query.type = catOrType;
    } else if(['Revenue', 'Payroll', 'Operations', 'Marketing', 'Others'].includes(catOrType)){
        query.category = catOrType;
    } else {
        return next(new ExpressError(400,"Enter a valid type or category"));
    }
    
    query.date = {};
    query.date.$gte = parseDate(startDate);
    query.date.$lte = parseDate(endDate,true);

    const transactions = await Transaction.find(query)
      .sort({ date: -1 });

    res.status(200).json(transactions);
}