import express from "express";
import {
  createEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee
} from "../controllers/employeeController.js";

import protect from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/", protect, authorizeRoles("Owner", "Manager"), createEmployee);
router.get("/", protect, authorizeRoles("Owner", "Manager", "Accountant"), getEmployees);
router.get("/:id", protect, authorizeRoles("Owner", "Manager", "Accountant"), getEmployeeById);
router.put("/:id", protect, authorizeRoles("Owner", "Manager"), updateEmployee);
router.delete("/:id", protect, authorizeRoles("Owner"), deleteEmployee);

export default router;
