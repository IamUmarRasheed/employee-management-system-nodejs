import { Router } from "express";
import { registerEmployee } from "../controllers/auth.controller.js";
import { loginEmployee } from "../controllers/auth.controller.js";
import { authenticateJWT } from "../middlewares/auth.middleware.js";
import { authorizeRole } from "../middlewares/role.middleware.js";

const router= Router()


router.route('/employeesregister').post( authenticateJWT, authorizeRole(["ADMIN"]), registerEmployee)

router.route('/employeeslogin').post(loginEmployee)




export default router