

import { Router } from "express";
import { applyLeave,getAllLeaveRequests,approveLeave } from "../controllers/leave.controller.js";
import { authenticateJWT } from "../middlewares/auth.middleware.js";
import { authorizeRole } from "../middlewares/role.middleware.js";

const router= Router()

// Leave Management Routes
router.route('/leaves')
  .post(authenticateJWT, applyLeave) 
  .get(authenticateJWT, authorizeRole(["ADMIN"]), getAllLeaveRequests); 
router.route('/leaves/:leaveId')
  .patch(authenticateJWT, authorizeRole(["ADMIN"]), approveLeave); 

  export default router