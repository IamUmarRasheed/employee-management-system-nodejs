import { Router } from "express";
import { authenticateJWT } from "../middlewares/auth.middleware.js";
import { authorizeRole } from "../middlewares/role.middleware.js";
import { createTask } from "../controllers/task.controller.js";
import { getTasksByEmployee } from "../controllers/task.controller.js";
import { updateTaskStatus } from "../controllers/task.controller.js";
import { deleteTask } from "../controllers/task.controller.js";
const router= Router()
router.route('/tasks')
  .post(authenticateJWT, authorizeRole(["ADMIN"]), createTask) 
  .get(authenticateJWT, getTasksByEmployee); 
router.route('/tasks/:taskId')
  .patch(authenticateJWT, authorizeRole(["ADMIN"]), updateTaskStatus) 
  .delete(authenticateJWT, authorizeRole(["ADMIN"]), deleteTask); 
  export default router