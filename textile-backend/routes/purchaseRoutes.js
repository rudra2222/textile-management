import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  createPurchase,
  getPurchases,
  getStockList
} from "../controllers/purchaseController.js";

const router = express.Router();

router.post("/", protect, createPurchase);
router.get("/", protect, getPurchases);
router.get("/stock", protect, getStockList);

export default router;
