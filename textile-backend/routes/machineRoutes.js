import express from "express";
import {
  createMachine,
  getMachines,
  getMachineById,
  updateMachine,
  deleteMachine
} from "../controllers/machineController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createMachine);
router.get("/", protect, getMachines);
router.get("/:id", protect, getMachineById);
router.put("/:id", protect, updateMachine);
router.delete("/:id", protect, deleteMachine);

export default router;
