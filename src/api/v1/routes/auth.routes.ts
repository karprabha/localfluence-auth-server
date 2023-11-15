import { Router } from "express";

import { authController } from "../controllers";

const router = Router();

router.get("/auth/github", authController.githubOAuth);

export default router;
