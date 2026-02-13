import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  createSale,
  getSales,
  updateSale,
  deleteSale
} from "../controllers/salesController.js";

const router = express.Router();

router.post("/", protect, createSale);
router.get("/", protect, getSales);
router.put("/:id", protect, updateSale);
router.delete("/:id", protect, deleteSale);

export default router;
