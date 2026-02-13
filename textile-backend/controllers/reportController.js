import Sales from "../models/Sales.js";
import Production from "../models/Production.js";
import Purchase from "../models/Purchase.js";
import Expense from "../models/Expense.js";


// PROFIT & LOSS REPORT
export const getProfitLoss = async (req, res) => {
  try {
    const { month, year } = req.query;

    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0, 23, 59, 59);

    const revenue = await Sales.aggregate([
      {
        $match: { date: { $gte: startDate, $lte: endDate } }
      },
      {
        $group: { _id: null, totalRevenue: { $sum: "$totalAmount" } }
      }
    ]);

    const salary = await Production.aggregate([
      {
        $match: { date: { $gte: startDate, $lte: endDate } }
      },
      {
        $group: { _id: null, totalSalary: { $sum: "$calculatedSalary" } }
      }
    ]);

    const purchase = await Purchase.aggregate([
      {
        $match: { date: { $gte: startDate, $lte: endDate } }
      },
      {
        $group: { _id: null, totalPurchase: { $sum: "$totalAmount" } }
      }
    ]);

    const expense = await Expense.aggregate([
      {
        $match: { date: { $gte: startDate, $lte: endDate } }
      },
      {
        $group: { _id: null, totalExpense: { $sum: "$amount" } }
      }
    ]);

    const totalRevenue = revenue[0]?.totalRevenue || 0;
    const totalSalary = salary[0]?.totalSalary || 0;
    const totalPurchase = purchase[0]?.totalPurchase || 0;
    const totalExpense = expense[0]?.totalExpense || 0;

    const netProfit =
      totalRevenue - (totalSalary + totalPurchase + totalExpense);

    res.json({
      totalRevenue,
      totalSalary,
      totalPurchase,
      totalExpense,
      netProfit
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
