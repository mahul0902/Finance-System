import { Transaction } from "../models/transaction.js";

export const getSummary = async (req, res) => {
    // 1. Calculate Total Income and Total Expenses
    const stats = await Transaction.aggregate([
      {
        $group: {
          _id: null,
          totalIncome: {
            $sum: { $cond: [{ $eq: ["$type", "income"] }, "$amount", 0] }
          },
          totalExpenses: {
            $sum: { $cond: [{ $eq: ["$type", "expense"] }, "$amount", 0] }
          }
        }
      }
    ]);
    const summary = stats[0] || { totalIncome: 0, totalExpenses: 0 };
    const netBalance = summary.totalIncome - summary.totalExpenses;

    // 2. Category-wise Totals
    const categoryTotals = await Transaction.aggregate([
      {
        $group: {
          _id: "$category",
          total: { $sum: "$amount" },
          type: { $first: "$type" }
        }
      },
      // Format the output to be frontend-friendly (changing _id to category)
      {
        $project: {
          _id: 0,
          category: "$_id",
          total: 1,
          type: 1
        }
      },
      { $sort: { total: -1 } } // Sort by highest total first
    ]);

    // 3. Recent Activity (Last 5 transactions)
    const recentActivity = await Transaction.find()
      .sort({ date: -1 })
      .limit(5)
      .select('-__v');

    res.status(200).json({
      totalIncome: summary.totalIncome,
      totalExpenses: summary.totalExpenses,
      netBalance: netBalance,
      categoryWiseTotals: categoryTotals,
      recentActivity: recentActivity
    });
}   