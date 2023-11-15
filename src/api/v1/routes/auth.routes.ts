import { Router } from "express";

import { authController } from "../controllers";

const router = Router();

router.get("/auth/github", authController.githubOAuth);

router.get("/auth/google", authController.googleOAuth);

export default router;
