import express from "express";
import protect from "../middleware/authMiddleware.js";
import { getProfitLoss } from "../controllers/reportController.js";

const router = express.Router();

router.get("/profit-loss", protect, getProfitLoss);

export default router;
