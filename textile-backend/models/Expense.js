import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true
    },
    type: {
      type: String,
      enum: ["Electricity", "Maintenance", "Transport", "Other"],
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    notes: {
      type: String
    }
  },
  { timestamps: true }
);

const Expense = mongoose.model("Expense", expenseSchema);

export default Expense;
