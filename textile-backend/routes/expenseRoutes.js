import express from "express";
import protect from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";

import {
  createExpense,
  getExpenses,
  deleteExpense,
  updateExpense
} from "../controllers/expenseController.js";


const router = express.Router();

router.post("/", protect, authorizeRoles("Owner", "Accountant"), createExpense);
router.get("/", protect, authorizeRoles("Owner", "Manager", "Accountant"), getExpenses);
router.put("/:id", protect, authorizeRoles("Owner", "Accountant"), updateExpense);
router.delete("/:id", protect, authorizeRoles("Owner"), deleteExpense);

export default router;
