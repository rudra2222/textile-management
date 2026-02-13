import express from "express";
import {
  createProduction,
  getProductions,
  getProductionById,
  deleteProduction,
  updateProduction,
  getMonthlySalarySummary
} from "../controllers/productionController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createProduction);
router.get("/salary/summary", protect, getMonthlySalarySummary);
router.get("/", protect, getProductions);
router.get("/:id", protect, getProductionById);
router.put("/:id", protect, updateProduction);
router.delete("/:id", protect, deleteProduction);


export default router;
