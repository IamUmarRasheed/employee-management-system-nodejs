

import { Router } from "express";
import { authenticateJWT } from "../middlewares/auth.middleware.js";
import { authorizeRole } from "../middlewares/role.middleware.js";
import { addReview } from "../controllers/review.controller.js";
import { getReviewsByEmployee } from "../controllers/review.controller.js";

const router= Router()
// Review Routes
router.route('/reviews')
  .post(authenticateJWT, authorizeRole(["ADMIN"]), addReview) 
  .get(authenticateJWT, getReviewsByEmployee); 
  export default router