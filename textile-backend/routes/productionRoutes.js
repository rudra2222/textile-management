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
import authorizeRoles from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/", protect, authorizeRoles("Owner", "Manager"), createProduction);
router.get("/salary/summary", protect, authorizeRoles("Owner", "Manager"), getMonthlySalarySummary);
router.get("/", protect, authorizeRoles("Owner", "Manager"), getProductions);
router.get("/:id", protect, authorizeRoles("Owner", "Manager"), getProductionById);
router.put("/:id", protect, authorizeRoles("Owner", "Manager"), updateProduction);
router.delete("/:id", protect, authorizeRoles("Owner"), deleteProduction);


export default router;
