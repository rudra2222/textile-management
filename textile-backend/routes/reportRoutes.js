import express from "express";
import protect from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";
import { getProfitLoss } from "../controllers/reportController.js";

const router = express.Router();

router.get("/profit-loss", protect, authorizeRoles("Owner", "Manager", "Accountant"), getProfitLoss);

export default router;
