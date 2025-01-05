import { Router } from "express";
import { authenticateJWT } from "../middlewares/auth.middleware.js";
import { authorizeRole } from "../middlewares/role.middleware.js";
import { generatePayroll, getPayrollByEmployee } from "../controllers/payroll.controller.js";

const router = Router();

// Admin generates payroll
router.route('/employeepayroll').post(authenticateJWT, authorizeRole(["ADMIN"]), generatePayroll);

// Employee fetches their payroll
router.route('/employeepayroll/:employeeId').get(authenticateJWT, getPayrollByEmployee);

export default router;
