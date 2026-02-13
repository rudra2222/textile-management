import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  createExpense,
  getExpenses,
  deleteExpense,
  updateExpense
} from "../controllers/expenseController.js";


const router = express.Router();

router.post("/", protect, createExpense);
router.get("/", protect, getExpenses);
router.put("/:id", protect, updateExpense);
router.delete("/:id", protect, deleteExpense);

export default router;
