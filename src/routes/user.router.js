import { Router } from "express";
import { registerEmployee } from "../controllers/auth.controller.js";
import { loginEmployee } from "../controllers/auth.controller.js";

const router= Router()


router.route('/employeesregister').post(registerEmployee)

router.route('/employeeslogin').post(loginEmployee)




export default router