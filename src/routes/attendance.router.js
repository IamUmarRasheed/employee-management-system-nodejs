import { Router } from "express";
import {
  markAttendance,
  getAttendanceByEmployee,
  getAllAttendance,
} from "../controllers/attendence.controller.js";
import { authenticateJWT } from "../middlewares/auth.middleware.js";
import { authorizeRole } from "../middlewares/role.middleware.js";

const router = Router();

router
  .route("/attendance")
  .post(authenticateJWT, authorizeRole(["ADMIN"]), markAttendance) 
  .get(authenticateJWT, async (req, res, next) => {
    if (req.user.role === "ADMIN") {
      // Admin can fetch all attendance records
      await getAllAttendance(req, res, next);
    } else {
      // Employee can only fetch their own attendance
      await getAttendanceByEmployee(req, res, next);
    }
  });

export default router;
