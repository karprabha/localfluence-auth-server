import { Router } from "express";

import authRouter from "./auth.routes.ts";

const router = Router();

router.use("/", authRouter);

export default router;
