import { Router } from "express";

import { authValidator } from "../validators";
import { authController } from "../controllers";
import { queryValidationMiddleware } from "../middlewares";

const router = Router();

router.post(
    "/auth/signup",
    authValidator.signupValidator,
    queryValidationMiddleware,
    authController.signUp,
);

router.get("/auth/github", authController.githubOAuth);

router.get("/auth/google", authController.googleOAuth);

export default router;
