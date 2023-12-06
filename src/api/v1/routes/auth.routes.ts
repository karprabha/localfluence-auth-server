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

router.post(
    "/auth/login",
    authValidator.loginValidator,
    queryValidationMiddleware,
    authController.login,
);

router.post(
    "/auth/logout",
    authValidator.logoutValidator,
    queryValidationMiddleware,
    authController.logout,
);

router.post(
    "/auth/refresh",
    authValidator.refreshAccessTokenValidator,
    queryValidationMiddleware,
    authController.refreshAccessToken,
);

export default router;
