import express from "express";
import protect from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";
import {
  createPurchase,
  getPurchases,
  getStockList
} from "../controllers/purchaseController.js";

const router = express.Router();

router.post("/", protect, authorizeRoles("Owner", "Accountant"), createPurchase);
router.get("/", protect, authorizeRoles("Owner", "Manager", "Accountant"), getPurchases);
router.get("/stock", protect, authorizeRoles("Owner", "Manager", "Accountant"), getStockList);

export default router;
