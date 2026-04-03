import mongoose from "mongoose";
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
    amount: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        enum: ['income', 'expense'],
        required: true
    },
    category: {
        type: String, 
        required: true,
        enum: ['Revenue', 'Payroll', 'Operations', 'Marketing', 'Others'],
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    },
    description: {
        type: String,
        required: true
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

export const Transaction = mongoose.model("Transaction", transactionSchema);