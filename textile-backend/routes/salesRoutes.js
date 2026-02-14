import express from "express";
import protect from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";
import {
  createSale,
  getSales,
  updateSale,
  deleteSale
} from "../controllers/salesController.js";

const router = express.Router();

router.post("/", protect, authorizeRoles("Owner", "Manager", "Accountant"), createSale);
router.get("/", protect, authorizeRoles("Owner", "Manager", "Accountant"), getSales);
router.put("/:id", protect, authorizeRoles("Owner", "Manager", "Accountant"), updateSale);
router.delete("/:id", protect, authorizeRoles("Owner"), deleteSale);

export default router;
