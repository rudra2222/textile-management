import express from "express";
import {
  createMachine,
  getMachines,
  getMachineById,
  updateMachine,
  deleteMachine
} from "../controllers/machineController.js";

import protect from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/", protect, authorizeRoles("Owner", "Manager"), createMachine);
router.get("/", protect, authorizeRoles("Owner", "Manager"), getMachines);
router.get("/:id", protect, authorizeRoles("Owner", "Manager"), getMachineById);
router.put("/:id", protect, authorizeRoles("Owner", "Manager"), updateMachine);
router.delete("/:id", protect, authorizeRoles("Owner"), deleteMachine);

export default router;
